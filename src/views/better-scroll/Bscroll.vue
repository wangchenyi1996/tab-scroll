<template>
  <div ref="wrapper" class="wrapper-container">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    top: {
      type: [String, Number],
    },
    datas: {
      type: Array,
      required: true,
    },
    probeType: {
      type: Number,
      default: 1,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    setTimeout(() => {
      this._initScroll();
    }, 20);
  },
  watch: {
    datas() {
      this.$nextTick(() => {
        this.refresh();
      });
    },
  },
  methods: {
    _initScroll() {
      // 1.初始化BScroll对象
      if (!this.$refs.wrapper) return;
      this.$refs.wrapper.style.top = this.top + "px";
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: true,
        pullUpLoad: this.pullUpLoad,
        mouseWheel: true,
        disableMouse: false, //启用鼠标拖动
        disableTouch: false, //启用手指触摸
        startX: 0,
        scrollX:true,
      });

      // 2.将监听事件回调
      this.scroll.on("scroll", (pos) => {
        this.$emit("scroll", pos);
      });
      // 3.监听上拉到底部
      this.scroll.on("pullingUp", () => {
        // console.log("上拉加载");
        this.$emit("pullingUp");
      });
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp();
    },
    scrollTo(x, y, time) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
    },
  },
};
</script>

<style>
.wrapper-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
