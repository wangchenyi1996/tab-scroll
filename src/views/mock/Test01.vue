<!--
 * @Description: mock使用
 * @Version: 1.0
 * @Autor: 王强
 * @Date: 2020-06-17 11:11:38
 * @LastEditors: 王强
 * @LastEditTime: 2020-06-17 14:02:15
--> 
<template>
  <div
    class="mock"
    ref="maintain"
    @touchstart="touchstart"
    @touchmove="touchmove"
    @touchend="touchend"
  >
    <h3 style="margin-top: 20px">
      <center>mock使用--实现纯前端分页效果</center>
    </h3>

    <ul ref="delegate">
      <li
        v-for="(item, index) in currentPageData"
        :key="index"
        :data-key="index"
      >
        国家：{{ item.cn }}---区号：{{ item.code }}
      </li>
    </ul>
    <center style="font-weight: bolder">
      <a @click="prevPage()">上一页</a>
      <span>第{{ currentPage }}页/共{{ totalPage }}页</span>
      <a @click="nextPage()">下一页</a>
    </center>

    <ul>
      <li v-for="item of list" :key="item.name">{{ item.name }}</li>
    </ul>
    <ul style="margin-top: 10px">
      <li v-for="item of categroyList" :key="item.id">{{ item.name }}</li>
    </ul>

    <button @click="repeatAjax">点击重复发送请求</button>
    <button @click="repeatAjax2">点击重复发送请求（封装）</button>
  </div>
</template>

<script>
import axios from "axios";
import { getMenu, login } from "@/api/test";

let CancelToken = axios.CancelToken;
let source;

export default {
  data() {
    return {
      list: [],
      categroyList: [],
      // 前端分页
      productList: [], //所有数据
      totalPage: 1, // 统共页数，默认为1
      currentPage: 1, //当前页数 ，默认为1
      pageSize: 15, // 每页显示数量
      currentPageData: [], //当前页显示内容
      // 路由切换
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0
    };
  },
  created() {
    // this.getCitylist();
    // this.getCategroyList()
    this.getCountryAreaCodeList();
  },
  mounted() {
    // 事件委托
    this.$refs.delegate.addEventListener("click", function(e) {
      // 兼容性处理
      let event = e || window.event;
      let target = event.target || event.srcElement;
      // 判断是否匹配目标元素
      if (target.nodeName.toLocaleLowerCase() === "li") {
        let id = target.getAttribute("data-key"); //给元素设置一个属性
        console.log(id); // 获取到属性，可以进行其他操作
      }
    });
  },
  methods: {
    /*************** 重复发送ajax请求 ****************/
    repeatAjax() {
      let _that = this;
      // 取消上一次请求
      this.cancelRequest();

      axios
        .get("http://rap2api.taobao.org/app/mock/233782/api/roomList", {
          params: {
            a: 1,
            b: 2
          },
          cancelToken: new axios.CancelToken(function executor(c) {
            source = c;
          })
        })
        .then(res => {
          console.log("列表", res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancelRequest() {
      if (typeof source === "function") {
        //这样就可以成功取消上一次请求
        source("终止重复的请求");
      }
    },

    // 测试 get请求
    async repeatAjax2() {
      try {
        const result = await getMenu({ a: 1, b: 2 });
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    },
    // 测试 post请求
    // async repeatAjax2() {
    //   try {
    //     const result = await login({ name: "张三", age: 18 });
    //     console.log(result);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },

    /*************** 重复发送ajax请求 ****************/

    // 左滑、右滑切换路由实现
    touchstart(e) {
      // console.log("开始", e.touches[0].clientX);
      this.startX = e.touches[0].clientX;
    },
    touchmove(e) {
      // console.log("滑动", e.touches[0].clientX);
    },
    touchend(e) {
      // console.log("结束", e.changedTouches[0].clientX);
      this.endX = e.changedTouches[0].clientX;
      let X = this.endX - this.startX;
      if (X < -50) {
        //左滑
        this.$router.push("/home");
      }
      if (X > 50) {
        //右滑
        this.$router.push("/about");
      }
    },

    getCitylist() {
      axios
        .get("/cityList", {
          // params:{
          //   a:1,
          //   b:2
          // }
        })
        .then(res => {
          console.log("城市列表", res);
          this.list = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCategroyList() {
      axios
        .post("/categroy")
        .then(res => {
          console.log("商品分类列表", res.data.data.data.cate);
          this.categroyList = res.data.data.data.cate;
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 前端分页相关
    getCountryAreaCodeList() {
      axios
        .post("/getCountryCode")
        .then(res => {
          // console.log("国家区号列表", res.data.data);
          this.productList = res.data.data;
          //获取数据完成后进行页数计算
          // 计算一共有几页
          this.totalPage = Math.ceil(this.productList.length / this.pageSize);
          // 计算得0时设置为1
          this.totalPage = this.totalPage == 0 ? 1 : this.totalPage;
          this.getCurrentPageData();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 设置当前页面数据，对数组操作的截取规则为[0~9],[10~20]...,
    // 当currentPage为1时，我们显示(0*pageSize+1)-1*pageSize，当currentPage为2时，我们显示(1*pageSize+1)-2*pageSize...
    getCurrentPageData() {
      let begin = (this.currentPage - 1) * this.pageSize;
      let end = this.currentPage * this.pageSize;
      this.currentPageData = this.productList.slice(begin, end);
    },
    //上一页
    prevPage() {
      if (this.currentPage == 1) {
        return false;
      } else {
        this.currentPage--;
        this.getCurrentPageData();
      }
    },
    // 下一页
    nextPage() {
      if (this.currentPage == this.totalPage) {
        return false;
      } else {
        this.currentPage++;
        this.getCurrentPageData();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
ul,
li {
  list-style-type: none;
}
.mock {
  transition: all 0.8s;
  li,
  p {
    font-size: 16px;
    height: 36px;
    line-height: 36px;
    text-align: center;
  }
}
</style>