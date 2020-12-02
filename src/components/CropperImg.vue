<template>
  <div class="cropper-img">
    <img :src="faceimg" alt="头像" ref="face" class="img" />
  </div>
</template>

<script>
import "cropperjs/dist/cropper.min.css"; // 图片裁剪
import Cropper from "cropperjs";

export default {
  props: {
    faceimg: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      mycropper: null,
    };
  },
  mounted() {
    this.initCropper();
  },
  methods: {
    initCropper() {
      let image = this.$refs.face; // 需要裁剪的图片
      this.mycropper = new Cropper(image, {
        viewMode: 1,
        dragMode: "move",
        aspectRatio: 1,
        autoCropArea: 1,
        background: false,
        zoomOnWheel: false,
        movable: true,
        cropBoxMovable: false,
      });
    },
  },
};
</script>

<style lang="scss">
.cropper-img {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 1;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  .img {
    display: block;
    max-width: 100%;
  }
}
</style>