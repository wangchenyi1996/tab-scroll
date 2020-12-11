<template>
  <div class="top">
    <img v-show="showBack" @click="backTop" src="./top.svg" alt="返回顶部" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showBack: false,
      top: 0,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.$once("hook:beforeDestroy", () => {
      window.removeEventListener("scroll", this.handleScroll);
    });
  },
  methods: {
    handleScroll(e) {
      let winHeight =
        document.documentElement.clientHeight || window.innerHeight;
      this.top = e.target.documentElement.scrollTop;
      // console.log(this.top);
      // 控制滚动按钮的隐藏或显示
      if (this.top > winHeight) {
        this.showBack = true;
      } else {
        this.showBack = false;
      }
    },
    //回到顶部
    backTop() {
      let timer = setInterval(() => {
        let ispeed = Math.floor(-this.top / 15);
        document.documentElement.scrollTop = document.body.scrollTop =
          this.top + ispeed;
        if (this.top === 0) {
          clearInterval(timer);
        }
      }, 16);
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  position: relative;
  > img {
    width: 40px;
    height: 40px;
    position: fixed;
    bottom: 100px;
    right: 10px;
  }
}
</style>