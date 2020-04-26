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
    <p>{{userInfo}}</p>
    <button @click="handleReload" style="margin-top:50px;">点击刷新</button>


  </div>
</template>

<script>
import { mapState,mapGetters,mapActions } from "vuex";

export default {
  name: "about",
   //字符串数组方式
  // inject:["reload",'userInfo'],  

  //对象方式
  inject:{
    reload:{
      defalut:'reload'
    },
    userInfo:{
      defalut:'userInfo'
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
        comTest:'user/getTestData'
    })
  },
  mounted() {
    console.log('执行刷新操作')
    console.log("count值:", this.comCount);
    console.log("用户信息：", this.comUserInfo);
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
      this.reload()
    }

  }
};
</script>

<style lang="scss">
</style>
