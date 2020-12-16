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
          />
          <p>{{ currentSong.name }}</p>
          <p>{{ currentSong.singer }}</p>
        </div>
        <!-- 中间歌词 -->
        <div class="middle-r">
          <Bscroll
            style="bottom:100px;"
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
        <!-- 底部 -->
        <div class="bottom">
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
      <ul
        class="btm-play u-f u-f-sbc"
        v-show="!fullScreen"
      >
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
      songReady: false
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
  mounted() {
    console.log(this.currentSong);
  },
  methods: {
    // 关闭全屏
    back() {
      this.setFullScreen(false);
    },
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
      console.log(e, "结束了");
      this.loop();
    },
    // 循环播放
    loop() {
      this.$refs.myVideo.currentTime = 0;
      this.$refs.myVideo.play();
      if (this.currentLyric) {
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
  // position: fixed;
  // z-index: 100;
  // top: 0;
  // left: 0;
  // bottom: 0;
  // right: 0;
  // background: #fefefe;
  box-sizing: border-box;
  width: 100%;
  .normal-player {
    position: fixed;
    z-index: 100;
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
      padding: 0 2.5rem 1rem;
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
        padding: 10px 0;
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
    }
  }
  .middle-r {
    // padding-bottom: 100px;
    height: calc(100vh - 100px);
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
  .header {
    height: 30px;
    line-height: 30px;
    background-color: rgb(149, 212, 236);
    p {
      margin: 0 10px;
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
