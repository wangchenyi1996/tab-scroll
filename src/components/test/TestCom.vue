<template>
  <div class="show-bg" v-if="popupShow">
    <div class="u-f-c u-f-ac show-popup">
      <p>我是弹框</p>
    </div>
    <img src="./close.png" alt="关闭" class="close" @click="handleclosepopup">
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
  export default {
    computed:{
      ...mapState(['popupShow'])
    },
    created() {
      // console.log(this.popupShow)
      
    },
    methods: {
      ...mapMutations(['closePopup']),
      handleclosepopup() {
        this.closePopup()
      }
    }
  }
</script>

<style lang="scss" scoped>
.show-bg{
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.6);
  width: 100%;
  height: 100%;
}
.show-popup{
  // height: 400px;
  // width: 300px;
  width: 80%;
  height: 60%;
  position: absolute;
	top: 50%;
	left: 50%;
  transform: translate(-50%, -50%);
  background: orangered;
}
.close{
  width: 40px;
  height: 40px;
  position: absolute;
  top: 82%;
  left: 50%;
  transform: translateX(-50%);
}
</style>