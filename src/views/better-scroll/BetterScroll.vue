<template>
  <div class="my-scrolls">
    <h3 style="text-align: center">better-scroll 使用</h3>
    <Bscroll
      ref="scroll"
      :top="30"
      :datas="listArr"
      :pull_down_refresh="true"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
      @pullingDown="pullDown"
    >
      <div class="content">
        <!-- 轮播图 -->
        <div class="imgs u-f">
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="item in bannerList" :key="item.id">
              <img v-lazy="item.url" alt="banner" @load="scrollRefresh" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>
        <!-- 列表 -->
        <ul class="m-lists">
          <li
            class="m-item u-f"
            v-for="(item, index) in listArr"
            :key="index"
            @click="handleDetail(item)"
          >
            <img v-lazy="item.firstImg" class="img" @load="scrollRefresh" />
            <p>{{ index + 1 }}--{{ item.describtion }}</p>
          </li>
        </ul>
      </div>
    </Bscroll>
  </div>
</template>

<script>
import axios from "axios";
import Bscroll from "./Bscroll.vue";

export default {
  data() {
    return {
      allList: [],
      bannerList: [],
      listArr: [],

      swiperOption: {
        loop: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: true,
          disableOnInteraction: true,
        },
        // 显示分页
        pagination: {
          el: ".swiper-pagination",
          clickable: true, //允许分页点击跳转
          type: "progressbar",
        },
        // 设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
  components: {
    Bscroll,
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  mounted() {
    this.getBannerList();
    this.getList();
  },
  methods: {
    // 获取轮播图
    getBannerList() {
      axios
        .get("http://rap2api.taobao.org/app/mock/233782/api/swiper")
        .then((res) => {
          // console.log("轮播图", res.data.swiperList);
          this.bannerList = res.data.swiperList;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取列表
    getList() {
      axios
        .post(
          "http://rap2api.taobao.org/app/mock/234046/api/home_select_recormend_goods"
        )
        .then((res) => {
          this.allList = res.data.data.selectList;
          this.listArr = res.data.data.selectList.slice(0, 15);
          // console.log("列表", this.listArr);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 下拉加载
    loadMore() {
      let temp = {
        describtion:
          "纪梵希高定香榭天鹅绒唇膏306#(小羊皮口红 法式红 雾面哑光 持久锁色）",
        firstImg:
          "https://img12.360buyimg.com/da/s513x513_jfs/t17803/140/312601975/303824/9f668081/5a6a95c0N65c45d06.png",
        imgArr: [],
        intro: [],
        price: 327.75,
      };
      setTimeout(() => {
        this.listArr.push(temp, ...this.allList.slice(15, 17));
        this.$refs.scroll.finishPullUp();
        this.scrollRefresh();
      }, 1000);
    },
    //模拟下拉刷新
    pullDown() {
      let temp = {
        describtion:
          "纪梵希高定香榭天鹅绒唇膏306#(小羊皮口红 法式红 雾面哑光 持久锁色）",
        firstImg:
          "https://img12.360buyimg.com/da/s513x513_jfs/t17803/140/312601975/303824/9f668081/5a6a95c0N65c45d06.png",
        imgArr: [],
        intro: [],
        price: 327.75,
      };
      setTimeout(() => {
        this.listArr.unshift(...this.allList.slice(18, 20));
        this.$refs.scroll.finishPullDown();
        this.scrollRefresh();
      }, 1000);
    },
    contentScroll(position) {
      // console.log(position);
    },
    // 刷新
    scrollRefresh() {
      this.$refs.scroll.refresh();
    },
    handleDetail(item) {
      console.log(item);
    },
  },
};
</script>

<style lang="scss" scoped>
ul,
li {
  list-style: none;
}
.my-scrolls {
  width: 100%;
  height: 100vh;
  .imgs {
    height: 200px;
    width: 100%;
    overflow-x: scroll;
    img {
      width: 100%;
    }
  }
  .m-lists {
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    .m-item {
      width: 100%;
      margin-top: 20px;
      .img {
        width: 20%;
      }
    }
  }
}
.swiper-container {
  position: relative;
  width: 100%;
  height: 200px;
  background: pink;
}
.swiper-container .swiper-slide {
  width: 100%;
  height: 180px;
  font-size: 16px;
  text-align: center;
}
</style>