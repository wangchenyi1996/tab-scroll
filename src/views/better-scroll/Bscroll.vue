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
    pullDownRefresh: {
      tyle: Boolean,
      default: true,
    },
    refreshDelay: {
      type: Number,
      default: 20,
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
        mouseWheel: true,
        disableMouse: false, //启用鼠标拖动
        disableTouch: false, //启用手指触摸
        startX: 0,
        scrollX: true,
        pullUpLoad: this.pullUpLoad, //监听下拉加载
        pullDownRefresh: this.pullDownRefresh, //下拉刷新
      });

      // 监听滚动位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on("scroll", (position) => {
          this.$emit("scroll", position);
        });
      }

      // 监听是否滚动到底部--上拉加载
      if (this.pullUpLoad) {
        this.scroll.on("pullingUp", () => {
          this.$emit("pullingUp");
        });
      }

      // 下拉刷新
      if (this.pullDownRefresh) {
        this.scroll.on("pullingDown", () => {
          this.$emit("pullingDown");
        });
      }

    },
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    //完成上拉加载
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    //完成下拉刷新
    finishPullDown() {
      this.scroll && this.scroll.finishPullDown();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll.y;
    }
  }
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
