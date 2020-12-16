export default {
  namespaced: true,
  state: {
    // 播放
    playing: false,
    // 全屏
    fullScreen: false,
    // 歌曲列表
    playlist: [],
    // 当前播放索引
    currentIndex: -1,

  },
  getters: {
    playing: state => state.playing,
    fullScreen: state => state.fullScreen,
    playlist: state => state.playlist,
    currentIndex: state => state.currentIndex,
    // 当前播放歌曲信息
    currentSong: (state) => {
      return state.playlist[state.currentIndex] || {}
    }

  },
  actions: {
    selectPlay({ commit }, { list, index }) {
      commit('setPlayList', list)
      commit('setCurrenIndex', index)
      commit('setFullScreen', true)
      commit('setPlayingState', true)
    }
  },
  mutations: {
    setPlayList(state, list) {
      state.playlist = list
    },
    setPlayingState(state, flag) {
      state.playing = flag
    },
    setFullScreen(state, flag) {
      state.fullScreen = flag
    },
    setCurrenIndex(state, index) {
      state.currentIndex = index
    }
  }
};