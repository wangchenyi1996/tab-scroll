<template>
  <div class="my-progress" v-show="playlist.length > 0">
    <transition name="normal">
      <div class="normal-player" v-show="fullScreen">
        <!-- 头部 -->
        <div class="header u-f u-f-ajc">
          <img
            alt=""
            src="./icons/select.png"
            style="margin-right:auto"
            @click="back"
            width="32"
          />
          <p>{{ currentSong.name }}</p>
          <p>{{ currentSong.singer }}</p>
        </div>
        <!-- 封面背景 -->
        <!-- <div class="background">
          <img width="100%" height="100%" :src="currentSong.pic" />
        </div> -->

        <!-- 中间部分 -->
        <div
          class="middles"
          @touchstart.prevent="middleTouchStart"
          @touchmove.prevent="middleTouchMove"
          @touchend="middleTouchEnd"
        >
          <!-- CD 图片 -->
          <div class="cd-bg" ref="middleL">
            <div class="cd-wrapper">
              <!-- <img
                src="http://p1.music.126.net/QHw-RuMwfQkmgtiyRpGs0Q==/102254581395219.jpg"
              /> -->
              <img :src="currentSong.pic" />
              <div class="cd-title">{{  currentLyric && currentLyric.lines[currentLineNum].txt }}</div>
            </div>
          </div>

          <!-- 歌词部分 -->
          <div class="middle-r" ref="list">
            <Bscroll
              ref="lyricList"
              :top="30"
              :datas="currentLyric && currentLyric.lines"
              :probe-type="3"
            >
              <div class="content">
                <div v-if="currentLyric">
                  <p
                    ref="lyricLine"
                    class="pitem"
                    v-for="(item, index) in currentLyric.lines"
                    :key="index"
                    :class="{ current: currentLineNum === index }"
                  >
                    {{ item.txt }}
                  </p>
                </div>
              </div>
            </Bscroll>
          </div>
        </div>

        <!-- 底部 -->
        <div class="bottom">
          <!-- 小点 -->
          <div class="dot-wrapper">
            <span class="dot" :class="{ active: currentShow === 'cd' }"></span>
            <span
              class="dot"
              :class="{ active: currentShow === 'lyric' }"
            ></span>
          </div>
          <!-- 进度条 -->
          <div class="progress-wrapper">
            <span class="time time-l">{{ format(currentTime) }}</span>
            <div class="progress-bar-wrapper">
              <ProcessBar
                :percent="percent"
                @percentChangeEnd="percentChangeEnd"
                @percentChange="percentChange"
              />
            </div>
            <span class="time time-r">{{ format(duration) }}</span>
          </div>
          <!-- 播放控制 -->
          <ul class="btm-play2  u-f u-f-sbc">
            <li class="u-f u-f-ajc" @click.stop="prevClick">
              <img src="./icons/prev.png" alt="" class="icon" />
            </li>
            <li class="u-f u-f-ajc" @click.stop="togglePlay">
              <img :src="playIcon" alt="" class="icon" />
            </li>
            <li class="u-f u-f-ajc" @click.stop="nextClick">
              <img src="./icons/next.png" alt="" class="icon" />
            </li>
          </ul>
        </div>
      </div>
    </transition>

    <!-- 底部播放器 -->
    <transition name="mini">
      <ul class="btm-play u-f u-f-sbc" v-show="!fullScreen">
        <li class="u-f u-f-ajc" @click.stop="openFull">
          <img src="./icons/full.png" alt="" class="icon" />
        </li>
        <li class="u-f u-f-ajc" @click.stop="prevClick">
          <img src="./icons/prev.png" alt="" class="icon" />
        </li>
        <li class="u-f u-f-ajc li2" @click.stop="togglePlay">
          <ProcessCircle radius="50" :percent="percent">
            <img :src="playIcon" alt="" class="icon2" />
          </ProcessCircle>
        </li>
        <li class="u-f u-f-ajc" @click.stop="nextClick">
          <img src="./icons/next.png" alt="" class="icon" />
        </li>
      </ul>
    </transition>

    <!-- 音频 -->
    <audio
      :src="currentSong.url"
      ref="myVideo"
      controls="controls"
      class="audios"
      @ended="end"
      @canplay="ready"
      @error="error"
      @timeupdate="updateTime"
    >
      您的浏览器不支持播放音频文件
    </audio>
  </div>
</template>

<script>
import ProcessBar from "@/components/process/process-bar.vue";
import ProcessCircle from "@/components/process/progress-circle.vue";
import { mapGetters, mapMutations } from "vuex";
import { getSongAndLyricList } from "@/assets/song/songList";
import Lyric from "lyric-parser";
import Bscroll from "@/views/better-scroll/Bscroll.vue";
import { prefixStyle } from "@/common/dom";
const transform = prefixStyle("transform");
const transitionDuration = prefixStyle("transitionDuration");

export default {
  data() {
    return {
      url: "",
      currentTime: 0,
      duration: 0,
      percent: 0,
      move: false,
      currentLyric: null,
      noLyric: false,
      currentLineNum: 0,
      songReady: false,
      currentShow: "cd"
    };
  },
  components: {
    ProcessBar,
    ProcessCircle,
    Bscroll
  },
  watch: {
    currentSong(newVal, oldVal) {
      if (!newVal.id) {
        return;
      }
      if (newVal.id === oldVal.id) {
        return;
      }
      this.$refs.myVideo.pause();
      this.$refs.myVideo.currentTime = 0;
      this._getSong(newVal.index);
    },
    url(newUrl) {
      this._getLyric(this.currentSong.index);
      this.$refs.myVideo.src = newUrl;
      // let stop = setInterval(() => {
      //   this.duration = this.$refs.myVideo.duration;
      //   if (this.duration) {
      //     clearInterval(stop);
      //   }
      // }, 150);
      this.setPlayingState(true);
    },
    currentTime() {
      this.percent = this.currentTime / this.duration;
    }
  },
  computed: {
    ...mapGetters("music", [
      "playlist",
      "fullScreen",
      "currentSong",
      "playing",
      "currentIndex"
    ]),
    // ...mapGetters({
    //   playlist: "music/playlist",
    //   fullScreen: "music/fullScreen",
    //   currentSong: "music/currentSong",
    //   playing: "music/playing",
    //   currentIndex: "music/currentIndex"
    // }),
    playIcon() {
      return this.playing
        ? require("./icons/play.png")
        : require("./icons/pause.png");
    }
  },
  created() {
    this.touch = {};
  },
  mounted() {
    console.log(this.currentSong);
  },
  methods: {
    /** 滑动滑块相关  **/
    middleTouchStart(e) {
      this.touch.initiated = true;
      // 用来判断是否是一次移动
      this.touch.moved = false;
      const touch = e.touches[0];
      this.touch.startX = touch.pageX;
      this.touch.startY = touch.pageY;
    },
    middleTouchMove(e) {
      if (!this.touch.initiated) {
        return;
      }
      const touch = e.touches[0];
      const deltaX = touch.pageX - this.touch.startX;
      const deltaY = touch.pageY - this.touch.startY;
      // 防止在scroll 滑动
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return;
      }
      if (!this.touch.moved) {
        this.touch.moved = true;
      }
      const left = this.currentShow === "cd" ? 0 : -window.innerWidth;
      const offsetWidth = Math.min(
        0,
        Math.max(-window.innerWidth, left + deltaX)
      );
      this.touch.percent = Math.abs(offsetWidth / window.innerWidth);
      this.$refs.list.style[transform] = `translate3d(${offsetWidth}px,0,0)`;
      this.$refs.list.style[transitionDuration] = 0;
      this.$refs.middleL.style.opacity = 1 - this.touch.percent;
      this.$refs.middleL.style[transitionDuration] = 0;
    },
    middleTouchEnd() {
      if (!this.touch.moved) {
        return;
      }
      let offsetWidth;
      let opacity;
      if (this.currentShow === "cd") {
        if (this.touch.percent > 0.1) {
          offsetWidth = -window.innerWidth;
          opacity = 0.1;
          this.currentShow = "lyric";
        } else {
          offsetWidth = 0;
          opacity = 1;
        }
      } else {
        if (this.touch.percent < 0.9) {
          offsetWidth = 0;
          this.currentShow = "cd";
          opacity = 1;
        } else {
          offsetWidth = -window.innerWidth;
          opacity = 0.1;
        }
      }
      const time = 300;
      this.$refs.list.style[transform] = `translate3d(${offsetWidth}px,0,0)`;
      this.$refs.list.style[transitionDuration] = `${time}ms`;
      this.$refs.middleL.style.opacity = opacity;
      this.$refs.middleL.style[transitionDuration] = `${time}ms`;
      this.touch.initiated = false;
    },
    /** 滑动滑块相关  **/

    // 关闭全屏
    back() {
      this.setFullScreen(false);
    },
    // 获取歌曲歌词
    _getLyric(index) {
      if (this.currentLyric) {
        this.currentLyric.stop();
        this.currentLyric = null;
      }
      this.noLyric = false;
      getSongAndLyricList(index)
        .then(res => {
          this.currentLyric = new Lyric(
            this.currentSong.lyric,
            this.handleLyric
          );
          if (this.playing) {
            this.currentLyric.play();
            // 歌词重载以后 高亮行设置为 0
            this.currentLineNum = 0;
            this.$refs.lyricList.scrollTo(0, 0, 1000);
          }
        })
        .catch(() => {
          this.currentLyric = null;
          this.noLyric = true;
          this.currentLineNum = 0;
        });
    },
    // 处理歌词
    handleLyric({ lineNum, txt }) {
      this.currentLineNum = lineNum;
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5];
        this.$refs.lyricList.scrollToElement(lineEl, 1000);
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000);
      }
    },
    _getSong(id) {
      getSongAndLyricList(id).then(res => {
        this.url = res.url;
      });
    },
    // 格式化时间
    format(interval) {
      interval = interval | 0;
      let minute = (interval / 60) | 0;
      let second = interval % 60;
      if (second < 10) {
        second = "0" + second;
      }
      return minute + ":" + second;
    },
    // 点击进度条/ 进度条滑动结束时
    percentChangeEnd(percent) {
      this.move = false;
      // 可以获取当前播放时间
      const currentTime = this.duration * percent;
      this.currentTime = currentTime;
      // 进行播放
      let audio = this.$refs.myVideo;
      audio.currentTime = this.currentTime;
      // let playPromise = audio.play();
      // if (playPromise !== undefined) {
      //   playPromise
      //     .then(() => {
      //       audio.play();
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
      // }
      if (!this.playing) {
        audio.play();
        this.setPlayingState(true);
      }
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000);
      }
    },
    // 滑动进度条
    percentChange(percent) {
      this.move = true;
      // 可以获取当前播放时间
      const currentTime = this.duration * percent;
      this.currentTime = currentTime;
      // 进行播放
      let audio = this.$refs.myVideo;
      audio.currentTime = this.currentTime;
      // let playPromise = audio.play();
      // if (playPromise !== undefined) {
      //   playPromise
      //     .then(() => {
      //       audio.play();
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
      // }
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000);
      }
    },
    // 音频
    end(e) {
      console.log("播放结束：", e);
      this.loop();
    },
    // 循环播放
    loop() {
      this.$refs.myVideo.currentTime = 0;
      this.$refs.myVideo.play();
      if (this.currentLyric) {
        console.log("循环播放-loop");
        // 歌词重载以后 高亮行设置为 0
        this.currentLineNum = 0;
        this.$refs.lyricList.scrollTo(0, 0, 1000);
        this.currentLyric.seek();
      }
    },
    ready(e) {
      this.songReady = true;
      this.duration = e.target.duration;
      this.$refs.myVideo.play();
    },
    updateTime(e) {
      if (this.move) {
        return;
      }
      this.currentTime = e.target.currentTime;
    },
    error(e) {
      console.log(e, "网络异常");
      this.songReady = true;
    },
    /**   底部播放器相关  **/
    // 下一首
    nextClick() {
      if (!this.songReady) {
        return;
      }
      if (this.playlist.length === 1) {
        this.loop();
        return;
      } else {
        let index = this.currentIndex + 1;
        if (index === this.playlist.length) {
          index = 0;
        }
        this.setCurrentIndex(index);
        if (!this.playing) {
          this.togglePlay();
        }
      }
      this.songReady = false;
    },
    // 上一首
    prevClick() {
      if (!this.songReady) {
        return;
      }
      this.songReady = false;
      let index = this.currentIndex - 1;
      if (index === -1) {
        index = this.playlist.length - 1;
      }
      this.setCurrentIndex(index);
      if (!this.playing) {
        this.togglePlay();
      }
      this.songReady = false;
    },
    // 播放暂停
    togglePlay() {
      this.setPlayingState(!this.playing);
      this.playing ? this.$refs.myVideo.play() : this.$refs.myVideo.pause();
      if (this.currentLyric) {
        this.currentLyric.togglePlay();
      }
    },
    ...mapMutations({
      setFullScreen: "music/setFullScreen",
      setPlayingState: "music/setPlayingState",
      setCurrentIndex: "music/setCurrenIndex",
      setPlaylist: "music/setPlayList"
    }),
    // 打开全屏
    openFull() {
      this.setFullScreen(true);
    }
  }
};
</script>

<style scoped lang="scss">
.my-progress {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  .normal-player {
    position: fixed;
    z-index: 150;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #fefefe;
    &.normal-enter-active,
    &.normal-leave-active {
      transition: all 0.4s;
      .top,
      .bottom {
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
      }
    }
    &.normal-enter,
    &.normal-leave-to {
      opacity: 0;
    }
    .btm-play2 {
      width: 100%;
      padding: 0 2.5rem 10px;
      box-sizing: border-box;

      .icon {
        width: 32px;
        height: 32px;
      }
      &.mini-enter-active,
      &.mini-leave-active {
        transition: all 0.4s;
      }
      &.mini-enter,
      &.mini-leave-to {
        opacity: 0;
      }
    }
    .bottom {
      position: absolute;
      bottom: 0px;
      width: 100%;
      background-color: rgba(255, 255, 255, 0.95);
      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 94%;
        margin: 0px auto;
        padding: 2px 0;
        .time {
          color: rgb(173, 172, 172);
          font-size: 11px;
          flex: 0 0 30px;
          line-height: 30px;
          width: 30px;
          &.time-l {
            text-align: left;
          }
          &.time-r {
            text-align: right;
            color: rgb(173, 172, 172);
          }
        }
        .progress-bar-wrapper {
          flex: 1;
        }
      }
      .dot-wrapper {
        text-align: center;
        font-size: 0;
        margin-top: 10px;
        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgb(80, 72, 72);
          &.active {
            width: 20px;
            border-radius: 5px;
            background: rgba(219, 44, 38, 0.8);
          }
        }
      }
    }
  }

  .header {
    position: fixed;
    z-index: 99;
    width: 100%;
    top: 0;
    height: 30px;
    line-height: 30px;
    background-color: rgb(149, 212, 236);
    p {
      margin: 0 10px;
    }
  }
  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.6;
    filter: blur(10px);
  }

  .middles {
    position: fixed;
    width: 100%;
    top: 0px;
    bottom: 100px;
    // bottom: 150px;
    white-space: nowrap;
    font-size: 0;
    .cd-bg {
      display: inline-block;
      vertical-align: top;
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%;
      .cd-wrapper {
        position: absolute;
        left: 10%;
        top: 10%;
        width: 80%;
        height: 100%;
        box-sizing: border-box;
        img {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
        }
        .cd-title{
          text-align: center;
           position: absolute;
          left: 0;
          bottom: -100px;
          color: #b98383;
          height: 30px;
          width: 100%;
          font-size: 16px;
        }
      }
    }
    .middle-r {
      transform: translate3d(0, 0, 0);
      display: inline-block;
      vertical-align: top;
      width: 100%;
      height: 100%;
      overflow: hidden;
      // height: calc(100vh - 100px);
      .pitem {
        font-size: 16px;
        color: #c7c7c7;
        line-height: 40px;
        text-align: center;
        &.current {
          color: #333;
          font-weight: bold;
        }
      }
    }
  }
}
.audios {
  width: 100%;
  opacity: 0;
  position: fixed;
  bottom: 20%;
}
ul,
li {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.btm-play {
  background-color: rgb(224, 237, 225);
  position: fixed;
  z-index: 9999;
  height: 70px;
  line-height: 70px;
  bottom: 0;
  width: 100%;
  padding: 0 2.5rem;
  box-sizing: border-box;
  .li2 {
    position: relative;
  }
  .icon {
    width: 32px;
    height: 32px;
  }
  .icon2 {
    width: 42px;
    height: 42px;
    position: absolute;
    left: 4px;
    top: 4px;
  }
  &.mini-enter-active,
  &.mini-leave-active {
    transition: all 0.4s;
  }
  &.mini-enter,
  &.mini-leave-to {
    opacity: 0;
  }
}
</style>
