<!--
 * @Description: 下拉刷新
 * @Version: 1.0
 * @Autor: 王强
 * @Date: 2020-06-11 17:09:30
 * @LastEditors: 王强
 * @LastEditTime: 2020-06-12 12:20:58
--> 
<template>
  <div ref="container">
    <div class="pull-to-refresh-layer">
      <div v-show="!isShowLoading">
        <i ref="icon" class="css-icon icon-upward"></i>
        <p>下拉刷新</p>
      </div>
      <div v-show="isShowLoading" style="padding-top: 30px;font-size:16px;">正在刷新中...</div>
    </div>
    <!-- 数据 -->
    <p class="p1">下拉刷新</p>
    <div class="item" v-for="item in list" :key="item">{{item}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowLoading: false
    };
  },
  computed: {
    list() {
      return new Array(100)
        .fill(0)
        .map((item, index) => "第" +( index + 1) + "个");
    }
  },
  mounted() {
    this.pullRefresh(this.$refs.container, done => {
      setTimeout(() => {
        done();
      }, 1000);
    });
  },
  methods: {
    pullRefresh(el, callback) {
      let beginPagY = 0;
      let currentPos;
      const maxTranslateY = 150;
      const iconEl = this.$refs.icon;
      el.addEventListener("touchstart", e => {
          console.log('scrollTop',el.scrollTop)
          // console.log('e',e.touches[0])
        if (el.scrollTop !== 0) {
          return;
        }
        beginPagY = e.touches[0].pageY;
        console.log('beginPagY',beginPagY)
        e.preventDefault();
      });
      el.addEventListener("touchmove", e => {
        if (el.scrollTop !== 0) {
          return;
        }
        const pageY = e.touches[0].pageY;
        const distance = (currentPos = pageY - beginPagY);
        console.log(distance)
        if (distance < 0 || distance > maxTranslateY) {
          // 上拉的时候不做任何处理
          return;
        }
        if (distance > 60) {
          iconEl.classList.add("active");
          // console.log(iconEl.classList);
        } else {
          iconEl.classList.remove("active");
        }
        e.preventDefault();
        el.style.transform = `translateY(${distance}px)`;
      });
      let clear = () => {
        this.isShowLoading = false;
        el.style.transform = `translateY(0)`;
        setTimeout(() => {
          el.style.transition = ``;
        }, 200);
      };
      el.addEventListener("touchend", () => {
        el.style.transition = `.2s`;
        if (currentPos >= 60) {
          this.isShowLoading = true;
          el.style.transform = `translateY(30px)`;
          callback &&
            callback(() => {
              clear();
            });
          return;
        }
        clear();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.p1{
    font-size: 20px;
    margin: 20px;
    color: aquamarine;
}
.item {
  font-size: 14px;
  line-height: 30px;
  color: #aaa;
}
.item + .item {
  border-top: 1px solid;
}
.css-icon {
  display: inline-block;
  height: 1em;
  width: 1em;
  font-size: 20px;
  box-sizing: border-box;
  text-indent: -9999px;
  vertical-align: middle;
  position: relative;
}
.css-icon::before,
.css-icon::after {
  content: "";
  box-sizing: inherit;
  position: absolute;
  left: 50%;
  top: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.icon-upward::before {
  height: 0.65em;
  width: 0.65em;
  border-style: solid;
  border-width: 2px 0 0 2px;
  -ms-transform: translate(-50%, -50%) rotate(45deg);
  transform: translate(-50%, -50%) rotate(45deg);
}
.icon-upward::after {
  height: 0.8em;
  border-left: 2px solid;
  top: 55%;
}

.icon-upward.active {
  transform: rotate(180deg);
  transition: transform 0.3s;
}

.pull-to-refresh-layer {
  height: 60px;
  margin-top: -60px;
  font-size: 12px;
  text-align: center;
  color: #aaa;
  line-height: 30px;
}
</style>