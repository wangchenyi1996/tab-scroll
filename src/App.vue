<template>
  <div id="app">
    <!-- <router-view v-if="isShow"/>
    
    <div class="container">
        <router-view name="header"></router-view>
        <router-view name="left"></router-view>
        <router-view name="mian"></router-view>
    </div>-->

    <keep-alive>
      <!-- 这里是会被缓存的视图组件，比如 page1,page2 -->
      <router-view v-if="$route.meta.keepAlive && isShow" />
    </keep-alive>
    <!-- 这里是不被缓存的视图组件，比如 page3 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>

    <!-- 底部tabbar -->
    <TabBar v-if="$route.meta && $route.meta.showTabbar" />

    <!-- 返回顶部 -->
    <back-top></back-top>

    <!-- 这是一个新增的测试组件，默认是隐藏的，在其他的页面中操作，使该组件显示 -->
    <test-com></test-com>

    <!-- 音乐播放器 -->
    <miniPlayer />

    <!-- <div>
      <a href="weixin://">打开微信</a>
    </div>
    <div>
      <a href="alipays://">打开支付宝</a>
    </div>
    <div>
      <a href="alipays://platformapi/startapp?saId=10000007">打开支付宝的扫一扫功能</a>
    </div>
    <div>
      <a href="alipays://platformapi/startapp?appId=60000002">打开支付宝的蚂蚁森林</a>
    </div> -->
    <!-- 拨号 -->
    <!-- <a href="tel:10086">打电话给: 10086</a> -->

    <!-- 发送短信 -->
    <!-- <a href="sms:10086">发短信给: 10086</a> -->

    <!-- 发送邮件 -->
    <!-- <a href="mailto:839626987@qq.com">发邮件给：839626987@qq.com</a> -->

    <!-- 选择照片或者拍摄照片 -->
    <!-- <input type="file" accept="image/*" /> -->

    <!-- 选择视频或者拍摄视频 -->
    <!-- <input type="file" accept="video/*" /> -->

    <!-- 多选 -->
    <!-- <input type="file" multiple /> -->
  </div>
</template>
<script>
import TabBar from "@/components/TabBar.vue";
import BackTop from '@/components/back-top/BackTop.vue';
import TestCom from '@/components/test/TestCom.vue';
import miniPlayer from '@/views/music/Progress.vue'
export default {
  data() {
    return {
      isShow: true,
    };
  },
  components: {
    TabBar,
    BackTop,
    TestCom,
    miniPlayer
  },
  /*
    provide：是一个对象，或者是一个返回对象的函数。里面呢就包含要给子孙后代的东西，也就是属性和属性值。
    注意：子孙层的provide会掩盖祖父层provide中相同key的属性值

    inject：一个字符串数组，或者是一个对象。属性值可以是一个对象，包含from和default默认值，
    from是在可用的注入内容中搜索用的 key (字符串或 Symbol)，意思就是祖父多层provide提供了很多数据，from属性指定取哪一个key;default指定默认值。
  */

  provide() {
    return {
      reload: this.pageReload,
      userInfo: {
        name: "张三",
        age: 18,
        gender: "男",
      },
      userInfo1: {
        name: "张小三",
        age: 18,
        gender: "女",
      },
    };
  },

  // mounted() {
    // 下面2种方法可以判断是pc端还是手机端
    // 这种方式可以根据设备进入不同页面
    // if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
    //   console.log("mobile");
    //   // window.location.href = "iPhone.html";
    // } else {
    //   console.log("PC");
    //   // window.location.href = "pc.html";
    // }

    // if (this.IsPC()) {
    //   console.log("PC");
    // } else {
    //   console.log("mobile");
    // }
  // },
  mounted() {
    //这个用来判断当前浏览器是否微信内置浏览器，是微信返回true，不是微信返回false
    const WxObj = window.navigator.userAgent.toLowerCase();
    if(WxObj.match(/microMessenger/i)=='micromessenger'){
      // 是微信就跳转跳转微信遮罩页面
      window.location.href = "/weixin.html";
    }
  },

  methods: {
    // 判断是pc端还是手机端
    IsPC() {
      let userAgentInfo = navigator.userAgent;
      let Agents = new Array(
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod",
        "BlackBerry"
      );
      let flag = true;
      for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      return flag;
    },
    //刷新
    pageReload() {
      this.isShow = false;
      this.$nextTick(() => {
        this.isShow = true;
      });
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  background-color: #fff;
  min-height: 100%;
  // padding-bottom: 70px;
}
* {
  margin: 0;
}
</style>
