<template>
  <div class="scroll-box" :style="{ height: heights + 'px' }">
    <Bscroll
      ref="scroll"
      :top="0"
      :datas="citys"
      :pull_down_refresh="true"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
    >
      <div class="content">
        <!-- 城市 -->
        <div class="section" ref="current#" v-if="current">
          <div class="city-title">当前城市</div>
          <div class="city-list">
            <div class="city-item">{{ current }}</div>
          </div>
        </div>
        <div class="section" id="hot" v-if="hotCitys.length">
          <div class="city-title">热门城市</div>
          <div class="city-list">
            <div
              class="city-item"
              :class="{ active: current === city }"
              v-for="(city, i) in hotCitys"
              :key="i"
              @click="onSelect(city)"
            >
              {{ city }}
            </div>
          </div>
        </div>
        <!-- 城市列表 -->
        <div
          ref="listGroup"
          class="section"
          :id="item.letter"
          v-for="item in citys"
          :key="item.letter"
        >
          <div class="letter">{{ item.letter }}</div>
          <div class="city-list">
            <div
              class="city-item"
              :class="{ active: current === city }"
              v-for="(city, itemIndex) in item.list"
              :key="itemIndex"
              @click="onSelect(city)"
            >
              {{ city }}
            </div>
          </div>
        </div>
      </div>
      <!-- 26 个字母 -->
      <div
        class="index"
        @touchstart="touchstart"
        @touchmove.stop.prevent="touchmove"
      >
        <p
          class="index-item"
          @click="gotoTop()"
          :class="{ active: currentIndex === -1 }"
        >
          #
        </p>
        <div
          class="index-item"
          :class="{ active: currentIndex === index }"
          :data-index="index"
          v-for="(item, index) in citys"
          :key="item.letter"
          @click.stop="scrollTo(index)"
        >
          {{ item.letter }}
        </div>
      </div>
    </Bscroll>
  </div>
</template>

<script>
import Bscroll from "./better-scroll/Bscroll.vue";
import cityList from "@/assets/data/cityList";
import { getData } from "@/common/dom";

export default {
  data() {
    return {
      heights: window.innerHeight,
      citys: cityList,
      current: "北京",
      scrollIntoId: "A",
      hotCitys: [
        "杭州",
        "天津",
        "北京",
        "上海",
        "深圳",
        "广州",
        "成都",
        "重庆",
        "厦门",
      ],
      listHeight: [], // 左侧列表元素高度集合
      scrollY: -1, // 列表的y轴位置属性
      currentIndex: -1, // 如果是0 ，A就选中了 ,右侧列表点击的index高亮
    };
  },
  components: {
    Bscroll,
  },
  mounted() {
    this._calculateHeight();
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight();
      }, 20);
    },
    scrollY(newY) {
      let listHeight = this.listHeight;
      // 当newY大于0,滚动到顶部
      if (newY > 0) {
        this.currentIndex = 0;
        return;
      }
      // 在中间部分滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i];
        let height2 = listHeight[i + 1];
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i;
          // console.log(this.currentIndex)
          return;
        }
      }
      // 滚动到底部,则-newY要大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2;
    },
  },

  methods: {
    touchstart(e) {
      console.log(e.target);
    },
    touchmove(e) {
      console.log(e.target);
    },

    // 点击字母
    scrollTo(index) {
      this._scrollTo(index);
      this.currentIndex = index;
    },
    // 选择哪个城市
    onSelect(city) {
      this.current = city;
    },
    // 滚动监听
    contentScroll(position) {
      this.scrollY = position.y;
    },
    _calculateHeight() {
      // 计算高度之前我们需要先计算出第一个列表元素也就是 ‘A’ 距离顶部高度
      const firstdiv = this.$refs.listGroup[0];
      let top = firstdiv.getBoundingClientRect().top;
      this.listHeight = [];
      const list = this.$refs.listGroup;
      // let height = 0; // 如果没有热门城市和当前城市，可以设置为0
      let height = top;
      this.listHeight.push(height);
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
      // console.log("左边城市列表高度集合:", this.listHeight);
    },
    _scrollTo(index) {
      if (!index && index !== 0) {
        return;
      }
      if (index < 0) {
        index = 0;
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2;
      }
      this.scrollY = -this.listHeight[index];
      this.$refs.scroll.scrollToElement(this.$refs.listGroup[index], 0);
    },
    gotoTop() {
      this.currentIndex = -1;
      this.$refs.scroll.scrollToElement(this.$refs["current#"], 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.active {
  color: red;
  font-weight: bold;
}
.scroll-box {
  position: relative;
  width: 100%;
  .index {
    width: 20px;
    position: fixed;
    right: 2px;
    top: 30px;
    z-index: 999;
    color: #2f9bfe;
    font-size: 13px;
    .index-item {
      width: 20px;
      height: 26px;
      line-height: 26px;
      text-align: center;
    }
  }
  .section {
    margin-bottom: 10px;
    .city-title {
      color: #333;
      font-size: 14px;
      margin-bottom: 14px;
    }
    .letter {
      width: 22px;
      height: 22px;
      color: #fff;
      border-radius: 100%;
      background-color: #2f9bfe;
      font-size: 14px;
      line-height: 22px;
      text-align: center;
      margin-bottom: 15px;
    }
    .city-list {
      display: flex;
      flex-wrap: wrap;
      .city-item {
        width: 100px;
        height: 27px;
        margin-right: 18px;
        margin-bottom: 14px;
        line-height: 27px;
        text-align: center;
        border: 1px solid #dcdcdc;
        border-radius: 3px;
        color: #999;
        font-size: 14px;
        &.active {
          background-color: #d5ebff;
          border-color: #2f9bfe;
          color: #2f9bfe;
        }
      }
    }
  }
}
</style>