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
      <div class="index">
        <p class="index-item" @click="gotoTop()"  :class="{ active: currentIndex === -1 }">#</p>
        <div
          class="index-item"
          :class="{ active: currentIndex === index }"
          :data-index="index"
          v-for="(item, index) in citys"
          :key="item.letter"
          @click="scrollTo(index)"
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
      listHeight: [],
      scrollY: -1,
      currentIndex: -1, // 如果是0 ，A就选中了
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
      const listHeight = this.listHeight;
      if (newY > 0) {
        this.currentIndex = 0;
        return;
      }
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i];
        let height2 = listHeight[i + 1];
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i;
          return;
        }
      }
      this.currentIndex = listHeight.length - 2;
    },
  },

  methods: {
    // 点击字母
    scrollTo(index) {
      this.currentIndex = index
      this._scrollTo(index);
    },
    // 选择哪个城市
    onSelect(city) {
      this.current = city;
    },
    // 滚动监听
    contentScroll(position) {
      this.scrollY =position.y
    },
    _calculateHeight() {
      this.listHeight = [];
      const list = this.$refs.listGroup;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
      console.log(this.listHeight);
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
    gotoTop(){
      this.currentIndex = -1
      this.$refs.scroll.scrollToElement(this.$refs['current#'], 0);
    }
  },
};
</script>

<style lang="scss" scoped>
.active {
  color: red;
  font-weight: bold;
}
.content {
}
.scroll-box {
  position: relative;
  width: 100%;
  .index {
    width: 20px;
    position: fixed;
    right: 0;
    top: 30px;
    z-index: 999;
    color: #2f9bfe;
    font-size: 13px;
    .index-item {
      width: 20px;
      height: 26px;
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