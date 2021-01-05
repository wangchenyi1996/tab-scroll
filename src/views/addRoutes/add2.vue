<template>
  <div style="height: 100vh; width: 100%">
    <h1>歌词上下渐变效果</h1>
    <button @click="$router.back()">返回</button>
    <button @click="$router.push('/music')">模仿网易云音乐播放器</button>
    <ul ref="lyricUL" class="ul-sings lyric-wrap">
      <li
        v-for="(item, i) in lyricsObjArr"
        :class="{ 'active': lyricIndex === i }"
        :key="item.uid"
        :data-index="i"
        ref="lyric"
      >
        {{ item.lyric }}
      </li>
    </ul>
  </div>
</template>

<script>
let singInfo = `
[00:00.00:甜蜜蜜]
[00:01.00:邓丽君]
[00:02.00]甜蜜蜜
[00:05.00]邓丽君
[00:09.00]甜蜜蜜你笑得甜蜜蜜
[00:16.00]好像花儿开在春风里
[00:21.00]开在春风里
[00:27.00]在哪里在哪里见过你
[00:35.00]你的笑容这样熟悉
[00:40.00]我一时想不起
[00:46.00]啊~~在梦里
[00:54.00]梦里梦里见过你
[01:01.00]甜蜜笑得多甜蜜
[01:08.00]是你~是你~梦见的就是你
[01:16.00]在哪里在哪里见过你
[01:24.00]你的笑容这样熟悉
[01:29.00]我一时想不起
[01:35.00]啊~~在梦里
[01:41.00](音乐演奏)
[02:01.00]在哪里在哪里见过你
[02:08.00]你的笑容这样熟悉
[02:14.00]我一时想不起
[02:20.00]啊~~在梦里
[02:27.00]梦里梦里见过你
[02:34.00]甜蜜笑得多甜蜜
[02:42.00]是你~是你~梦见的就是你
[02:50.00]在哪里在哪里见过你
[02:57.00]你的笑容这样熟悉
[03:02.00]我一时想不起
[03:08.00]啊~~在梦里
`;
export default {
  data() {
    return {
      lyricsObjArr: [],
      lyricIndex: 0,
      timer: null,
    };
  },
  created() {
    this.handleSings();
  },
  mounted() {
    this.handleOnline();
    window.addEventListener("online", this.handleOnline);
    this.$once("hook:beforeDestroy", () => {
      window.removeEventListener("online", this.handleOnline);
    });
  },
  methods: {
    handleOnline() {
      console.log(this.lyricsObjArr);
      // this.lyricsObjArr
      if (this.timer) return;
      this.timer = setInterval(() => {
        if (this.lyricIndex <= this.lyricsObjArr.length) {
          this.lyricIndex++;
        }
      }, 3000);
    },
    // 处理歌词相关
    handleSings() {
      const regNewLine = /\n/;
      const lineArr = singInfo.split(regNewLine); // 每行歌词的数组
      const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/;

      lineArr.forEach((item) => {
        if (item === "") return;
        const obj = {};
        const time = item.match(regTime);

        obj.lyric =
          item.split("]")[1].trim() === "" ? "" : item.split("]")[1].trim();
        obj.time = time
          ? this.formatLyricTime(time[0].slice(1, time[0].length - 1))
          : 0;
        obj.uid = Math.random().toString().slice(-6);
        if (obj.lyric === "") {
          console.log("这一行没有歌词");
        } else {
          this.lyricsObjArr.push(obj);
        }
      });
      // console.log(this.lyricsObjArr);
    },
    formatLyricTime(time) {
      // 格式化歌词的时间 转换成 sss:ms
      const regMin = /.*:/;
      const regSec = /:.*\./;
      const regMs = /\./;

      const min = parseInt(time.match(regMin)[0].slice(0, 2));
      let sec = parseInt(time.match(regSec)[0].slice(1, 3));
      const ms = time.slice(
        time.match(regMs).index + 1,
        time.match(regMs).index + 3
      );
      if (min !== 0) {
        sec += min * 60;
      }
      return Number(sec + "." + ms);
    },
  },
};
</script>

<style scoped>
ul,
li {
  list-style-type: none;
}
.ul-sings {
  margin-top: 30px;
  font-size: 14px;
  padding: 0.4rem 0.8rem;
  line-height: 2;
  letter-spacing: 1px;
  text-align: center;
  height: 80vh;
  width: 100%;
  overflow: scroll;
  color: #4a4a4a;
}
.active{
  color: #333 !important;
  font-weight: bold;
  font-size: 16px !important;
}
.lyric-wrap {
  mask-image: linear-gradient(
    180deg,
    hsla(0, 0%, 100%, 0) 0,
    hsla(0, 0%, 100%, 0.6) 15%,
    #fff 25%,
    #fff 75%,
    hsla(0, 0%, 100%, 0.6) 85%,
    hsla(0, 0%, 100%, 0)
  );
}
</style>