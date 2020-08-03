<!--
 * @Description: 
    某些特定的页面，实现前进刷新，后退不刷新，类似app般的用户体验。
    注：　此处的刷新特指当进入此页面时，触发ajax请求，向服务器获取数据。
    不刷新特指当进入此页面时，不触发ajax请求，而是使用之前缓存的数据，以便减少服务器请求，用户体验更流畅。
 * @Version: 1.0
 * @Autor: 王强
 * @Date: 2020-05-15 08:59:37
 * @LastEditors: 王强
 * @LastEditTime: 2020-05-15 10:12:13
 -->
<template>
  <div>
    <headers title="我是page2页面" />

    <p>我是商品详情页面</p>

    <p @click="fk">去付款</p>


    <p>page2：{{list[1]}}</p>



    <button @click="handleReload" style="margin-top:50px;">点击刷新</button>


  </div>
</template>

<script>
import headers from "@/components/back/back";
export default {
  components: {
    headers
  },
  data() {
    return {
      list: [],
       isFirstEnter:false // 是否第一次进入，默认false
    };
  },
   inject: {
    reload: {
      from:'reload',
      default: () => {}
    }
  },
   beforeRouteEnter(to, from, next) {
    // 路由导航钩子，此时还不能获取组件实例 `this`，所以无法在data中定义变量（利用vm除外）
    if (from.name == "page3") {
      to.meta.isBack = true;
      //判断是从哪个路由过来的，
      //如果是page3过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
    }

    next();
  },
  created() {
    console.log("我是page2页面,created");
     this.isFirstEnter=true;
     // 只有第一次进入或者刷新页面后才会执行此钩子函数
     // 使用keep-alive后（2+次）进入不会再执行此钩子函数
    // this.getData();
  },
  activated() {
    console.log("我是page2页面,activated");
     if(!this.$route.meta.isBack || this.isFirstEnter){
         // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
        //  this.getData();

         this.list=[]// 把数据清空，可以稍微避免让用户看到之前缓存的数据
         this.getData();

      }
      // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
      this.$route.meta.isBack=false
      // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
      this.isFirstEnter = false
  },
//   deactivated() {
//     console.log("我是page2页面,deactivated");
//   },
  methods: {
    fk() {
      this.$router.push("/page3");
    },
    getData() {
        console.log("我是异步请求2222...");
      axios
        .post(
          "http://rap2.taobao.org:38080/app/mock/234046/api/home_my_channel"
        )
        .then(res => {
          const list = [];
          res.data.data.mylist.forEach(item => {
            list.push(item.name1);
          });
          this.list = list
        });
    },
    //刷新页面
    handleReload(){
      this.reload()
    }

  }
};
</script>

<style lang="scss" scoped>
p {
  font-size: 20px;
  margin-top: 40px;
}
</style>