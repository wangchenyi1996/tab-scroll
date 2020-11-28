<template>
  <div class="about">
    <p>vuex测试</p>
    <br />
    <hr />
    <br />

    <p>Token:{{token}}</p> <br />
    <p>Count:{{count}}</p> <br />
    <p>userinfo:{{userinfo}}</p> <br />

    <button @click="getData">获取模块数据</button>
    <button @click="updateToken">刷新token值</button>
    <button @click="updateUser">修改用户信息</button>
    <br>
    <p>action</p>
    <p>测试数据：{{comTest}}</p>
    <button @click="test">action</button>

    <hr />
    <p>provide / inject 使用</p>
    <br />
    <br />
    <p>{{users}}</p>
    <button @click="handleReload" style="margin-top:50px;">点击刷新</button>
  </div>
</template>

<script>
import { mapState,mapGetters,mapActions } from "vuex";

export default {
  name: "aboutPage",
   //字符串数组方式
  // inject:["reload",'userInfo'],  

  //对象方式
  // inject:{
  //   reload:{
  //     defalut:'reload'
  //   },
  //   userInfo:{
  //     defalut:'userInfo'
  //   }
  // },

   /*
      provide：是一个对象，或者是一个返回对象的函数。里面呢就包含要给子孙后代的东西，也就是属性和属性值。
      注意：子孙层的provide会掩盖祖父层provide中相同key的属性值

      inject：一个字符串数组，或者是一个对象。属性值可以是一个对象，包含from和default默认值，
      from是在可用的注入内容中搜索用的 key (字符串或 Symbol)，意思就是祖父多层provide提供了很多数据，from属性指定取哪一个key;default指定默认值。
    */

  inject: {
    reload: {
      from:'reload',
      default: () => {}
    },
    users:{
      from:'userInfo1',
      defalut:() => {}
    },
    foo:{
      from:'foo'
    }
  },

  computed: {
    ...mapState({
      token: state => state.token,
      count: state=> state.user.count,
      userinfo: state=> state.user.userinfo
    }),
    ...mapGetters({
        comCount: 'user/getCountValue',
        comUserInfo: 'user/getUserInfo',
        comTest: 'user/getTestData',
        getToken: 'getToken'
    })
  },
  mounted() {
    console.log('执行刷新操作')
    console.log("count值:", this.comCount);
    console.log("用户信息：", this.comUserInfo);
    console.log("Token信息：", this.getToken);
  },
  methods: {
    ...mapActions({
        testData: 'user/testAction'
    }),
    getData() {
      console.log("tag", this.$store.state.token);
      console.log("tag", this.$store.state.user);
      this.$store.commit("user/addCount", 10);
    },
    updateToken() {
      this.$store.commit(
        "updateToken",
        "80336D5736BF685223289B752163877C27C53B0D"
      );
    },
    updateUser(){
        this.$store.commit(
        "user/updateUser",
       {name:"李四",age:"108"}
      );
    },
    test(){
        //法1
        // this.$store.dispatch('user/testAction',['123','456','789'])

        //法2
        this.testData(['123','456','789'])
    },

    //刷新页面
    handleReload(){
      // 可以响应式的 修改 provide 传递的数据 必须是对象类型才可修改， 对象可以引用
      // this.users.name = '王五'
      this.reload()
    }

  }
};
</script>

<style lang="scss">
</style>
