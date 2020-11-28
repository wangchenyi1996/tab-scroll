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
  </div>
</template>

<script>
export default {
  name: "home",

  computed: {
      comCount() {
        return this.$store.getters['user/getCountValue']
      },
      comUserInfo(){
        return this.$store.getters['user/getUserInfo']
      }
  },
  mounted(){
      console.log('count值:',this.comCount)
      console.log('用户信息：',this.comUserInfo)
  },
  methods: {
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
    }
  }
};
</script>

<style lang="scss">

</style>
