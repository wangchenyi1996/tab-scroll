<template>
  <div class="my-progress">
    <h2 style="margin-bottom:100px; text-align:center;">进度条使用</h2>

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
    <!-- 音频 -->
    <audio
      src="http://lc-4KpiYqDR.cn-n1.lcfile.com/1645b49cdb91c583ec12.m4a/tmm.m4a"
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
import ProcessBar from "@/components/process-bar.vue";

export default {
  data() {
    return {
      currentTime: 0,
      duration: 0,
      percent: 0,
      move: false
    };
  },
  components: {
    ProcessBar
  },
  watch: {
    currentTime() {
      this.percent = this.currentTime / this.duration;
    }
  },
  methods: {
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
      let playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            audio.play();
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 滑动 进度条
    percentChange(percent) {
      this.move = true;
      // 可以获取当前播放时间
      const currentTime = this.duration * percent;
      this.currentTime = currentTime;
      // 进行播放
      let audio = this.$refs.myVideo;
      audio.currentTime = this.currentTime;
      // this.$nextTick(() => {
      let playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            audio.play();
          })
          .catch(err => {
            console.log(err);
          });
      }
      // });
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
    },
    ready(e) {
      this.duration = e.target.duration;
    },
    updateTime(e) {
      if (this.move) {
        return;
      }
      this.currentTime = e.target.currentTime;
    },
    error(e) {
      console.log(e,'网络异常');
    }
  }
};
</script>

<style scoped lang="scss">
.my-progress {
  height: 100%;
  padding-top: 50px;
  box-sizing: border-box;
  width: 94%;
  margin: 0 auto;
  overflow: hidden;
  .progress-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
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
</style>
