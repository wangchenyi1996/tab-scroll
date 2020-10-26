<template>
  <div class="book">
    <article
      @touchstart="touchstart"
      @touchmove="touchmove"
      @touchend="touchend"
    >
      <h3>{{ this.name }}</h3>
      <div v-html="content"></div>
    </article>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      bookPage: 0,
      content: "",
      name: "",
      timer: null,
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
    };
  },
  mounted() {
    this.autoBook();
  },
  methods: {
    getBook() {
      if (this.bookPage > 10) {
        return;
      }
      axios
        .get("/book/view/readBook", {
          params: {
            bookId: 2960,
            chapterId: this.bookPage,
          },
        })
        .then((res) => {
          let result = res.data.result[res.data.result.length - 1];
          this.name = result.name;
          this.content = result.content;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    autoBook() {
      this.getBook();
      let article = document.querySelector("article");
      let width = document.body.offsetWidth;
      this.$nextTick(() => {
        article.style.transform = `translateX(-${
          (width - 16) * this.bookPage
        }px)`;
      });
    },

    // 左滑、右滑翻页
    touchstart(e) {
      console.log("开始", e.touches[0].clientX);
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
    },
    touchmove(e) {
      // console.log("滑动", e.touches[0].clientX);
    },
    touchend(e) {
      console.log("结束", e.changedTouches[0].clientX);
      this.endY = e.changedTouches[0].clientY;
      this.endX = e.changedTouches[0].clientX;

      this.handleDirection(this.startX, this.startY, this.endX, this.endY);
    },
    // 处理左右方向
    handleDirection(startX, startY, endX, endY) {
      const that = this;
      let distanceX = endX - startX;
      let distanceY = endY - startY;
      //如果滑动距离太短
      if (Math.abs(distanceX) < 10 && Math.abs(distanceY) < 10) {
        return;
      }
      //判断滑动方向
      if (Math.abs(distanceX) > Math.abs(distanceY) && distanceX > 0) {
        console.log("往右滑动");
        this.bookPage = this.bookPage - 1;
      } else if (Math.abs(distanceX) > Math.abs(distanceY) && distanceX < 0) {
        console.log("往左滑动");
        this.bookPage = this.bookPage + 1;
      } else if (Math.abs(distanceY) > Math.abs(distanceX) && distanceY > 0) {
        alert('往下滑动')
      } else if (Math.abs(distanceY) > Math.abs(distanceX) && distanceY < 0) {
        alert('往上滑动')
      } 
      this.getBook();
    },
  },
};
</script>

<style lang="scss" scoped>
.book {
  box-sizing: border-box;
  background: #c5b49a;
  height: 100vh;
  padding: 0 16px;
  overflow: hidden;
  article {
    columns: calc(100vw - 32px) 1;
    column-gap: 16px;
    height: 100%;
    transition: 1s;
    h3 {
      margin-bottom: 10px;
      padding-top: 10px;
    }
  }
}
</style>