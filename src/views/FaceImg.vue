<template>
  <div class="img-cropper">
    <h3>图片裁剪</h3>
    <input
      type="file"
      @change="fileChange"
      ref="files"
      hidden
      accept="image/png, image/jpeg"
    />
    <div class="u-f u-f-sbc" @click="chooseImg">
      <span>头像</span>
      <img :src="faceimg"  width="100"/>
    </div>
    <CropperImg :faceimg='faceimg' v-if="show"/>
  </div>
</template>

<script>
import CropperImg from '@/components/CropperImg.vue'

export default {
  data() {
    return {
      faceimg: require("@/assets/imgs/faces/1.7.png"),
      show: false
    };
  },
  components: {
    CropperImg,
  },
 
  methods: {
    // 选择相同的文件不触发这个函数
    // 可以使用 this.$refs.files.value = '' 解决
    fileChange(e) {
      const file = e.target.files[0];
      const face = window.URL.createObjectURL(file);
      this.faceimg = face;
      this.show = true
    },
    // 选择头像
    chooseImg() {
      // 可以触发file的点击事件
      this.$refs.files.click();
    },
  },
};
</script>

<style lang="scss" scoped>
.img-cropper {
  width: 100%;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  h3 {
    text-align: center;
  }
}
</style>