<template>
  <div class="my-scrolls">
    <h3 style="text-align: center">better-scroll 使用</h3>
    <div ref="wrapper" class="wrapper-container">
      <div class="content">
        <!-- 轮播图 -->
        <div class="imgs u-f">
          <img
            v-for="item in bannerList"
            :key="item.id"
            v-lazy="item.url"
            alt="banner"
            @load="scrollRefresh"
          />
        </div>
        <!-- 列表 -->
        <ul class="m-lists">
          <li class="m-item u-f" v-for="(item, index) in listArr" :key="index">
            <img v-lazy="item.firstImg" class="img" @load="scrollRefresh" />
            <p>{{ index + 1 }}--{{ item.describtion }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BScroll from "better-scroll";

export default {
  data() {
    return {
      bannerList: [],
      listArr: [],
      scroll: null,
      top: 30,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll();
      if (this.scroll) {
        this.getList();
        this.getBannerList();
      }
    });
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
          this.listArr = res.data.data.selectList.slice(0, 15);
          // console.log("列表", this.listArr);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    scrollRefresh() {
      this.scroll && this.scroll.refresh();
    },
    _initScroll() {
      // 1.初始化BScroll对象
      if (!this.$refs.wrapper) return;

      this.$refs.wrapper.style.top = this.top + "px";

      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: 3,
        click: true,
        mouseWheel: true,
        scrollX: true,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
ul,
li {
  list-style: none;
}
.wrapper-container {
  position: absolute;
  top: 0px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
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
</style>