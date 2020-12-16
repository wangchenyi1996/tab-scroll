<template>
  <div class="my-music">
    <h2>音乐播放器</h2>
    <!-- 歌曲列表 -->
    <div class="song-list">
      <div
        class="song-item u-f-c"
        v-for="(item, index) in musicList"
        :key="item.id"
        @click="playMusic(index)"
      >
        <span>{{ item.name }}</span>
        <span>{{ item.singer }}</span>
      </div>
    </div>

    <!--  src="@/assets/song/mp3/haikuotiankong.mp3" 本地地址 只是测试使用 -->
    <audio
      ref="myAudio"
      :src="musicList && musicList[musicId].url"
      controls="controls"
      class="music"
      @canplay="ready"
    >
      您的浏览器不支持播放音频文件
    </audio>
  </div>
</template>

<script>
import { getSongAndLyricList } from "@/assets/song/songList";

export default {
  data() {
    return {
      musicList: [
        {
          index: 0,
          url: "https://music.163.com/song/media/outer/url?id=346089.mp3",
          id: "347230",
          name: "海阔天空",
          singer: "beyond乐队",
          pic:
            "http://p1.music.126.net/QHw-RuMwfQkmgtiyRpGs0Q==/102254581395219.jpg"
        },
        {
          index: 1,
          url: "https://music.163.com/song/media/outer/url?id=1446233379.mp3",
          id: "1446233379",
          name: "处处吻",
          singer: "杨千嬅",
          pic:
            "https://p1.music.126.net/awQVkO1OmMWoxZL--dikJg==/109951164970741627.jpg?param=400y400"
        },
        {
          index: 2,
          url: "https://music.163.com/song/media/outer/url?id=113757.mp3",
          id: "113757",
          name: "甜蜜蜜",
          singer: "邓丽君",
          pic:
            "https://p2.music.126.net/__K9OrLQxVbN-TzfQ7Lbyw==/18159534045160057.jpg?param=400y400"
        }
      ],
      musicId: 0,
      playing: false
    };
  },
  mounted() {
    this.getListDetail(this.musicId);
  },
  methods: {
    // 获取列表
    async getListDetail(id) {
      const result = await getSongAndLyricList(id);
      // console.log('歌词解析：',result);
    },
    // 点击列表播放
    playMusic(id) {
      this.playing = false
      this.musicId = id;
    },
    ready(e) {
      // console.log(e.target.duration)
      if (!this.playing) {
        this.$refs.myAudio.play();
        this.playing = true
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.my-music {
  width: 100%;
  height: 100%;
  h2 {
    text-align: center;
    margin: 1rem 0;
  }
  .music {
    width: 100%;
    position: absolute;
    bottom: 10px;
  }
  .song-list {
    width: 100%;
    .song-item {
      font-size: 15px;
      color: #989898;
      padding: 10px;
      margin: 10px;
      background-color: rgba(224, 237, 225, 0.7);
      &:active {
        background-color: rgb(224, 237, 225);
      }
      span {
        &:first-child {
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>