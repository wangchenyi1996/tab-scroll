<template>
  <div class="scroll-box" :style="{height:heights+'px'}">
    <!-- 26 个字母 -->
    <div class="index">
      <p class="index-item" @click="scrollTo('#')">#</p>
      <div
        class="index-item"
        v-for="item in citys"
        :key="item.letter"
        @click="scrollTo(item.letter)"
      >{{ item.letter }}</div>
    </div>

    <div class="content">
      <div class="section" id="current" v-if="current">
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
          >{{ city }}</div>
        </div>
      </div>
      <div class="section" :id="item.letter" v-for="item in citys" :key="item.letter">
        <div class="letter">{{ item.letter }}</div>
        <div class="city-list">
          <div
            class="city-item"
            :class="{ active: current === city }"
            v-for="(city, itemIndex) in item.list"
            :key="itemIndex"
            @click="onSelect(city)"
          >{{ city }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    };
  },
  methods: {
    scrollTo(letter) {
      if (letter === "#") {
        document.querySelector("#A").scrollIntoView({ behavior: "smooth" });
      } else {
        document
          .querySelector(`#${letter}`)
          .scrollIntoView({ behavior: "smooth" });
      }
    },
    onSelect(city) {
      this.current = city;
    },
  },
};
</script>

<style lang="scss" scoped>
.scroll-box {
  .index {
    position: fixed;
    right: 0;
    top: 50px;
    z-index: 999;
    color: #2f9bfe;
    font-size: 16px;
    .index-item {
      width: 20px;
      height: 21px;
      line-height: 21px;
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