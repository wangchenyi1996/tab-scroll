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

    <!-- <audio
      ref="myAudio"
      src="http://lc-4KpiYqDR.cn-n1.lcfile.com/1645b49cdb91c583ec12.m4a/tmm.m4a"
      controls="controls"
      class="music"
      @canplay="ready"
    >
      您的浏览器不支持播放音频文件
    </audio> -->
    
  </div>
</template>

<script>
import { getSongAndLyricList, songList } from "@/assets/song/songList";
import { mapGetters, mapMutations,mapActions } from "vuex";

export default {
  data() {
    return {
      musicList: songList,
      isplay: false
    };
  },
  computed: {
    ...mapGetters("music", [
      "playlist",
      "fullScreen",
      "currentSong",
      "playing",
      "currentIndex"
    ])
  },
  methods: {
    ...mapMutations({
      setFullScreen: "music/setFullScreen",
      setPlayingState: "music/setPlayingState",
      setCurrentIndex: "music/setCurrenIndex",
      setPlaylist: "music/setPlayList"
    }),
     ...mapActions({
       selectPlay: 'music/selectPlay'
    }),
    // 获取列表
    async getListDetail(id) {
      const result = await getSongAndLyricList(id);
      console.log("歌词解析：", result);
    },
    // 点击列表播放
    playMusic(index) {
      this.isplay = true
      this.selectPlay({
        list: this.musicList,
        index: index,
      });
    },
    ready(e) {
      if (!this.isplay) {
        let audio = this.$refs.myAudio;
        let playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              audio.play();
              this.isplay = false
            })
            .catch(err => {
              console.log();
            });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.my-music {
  height: 100vh;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
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