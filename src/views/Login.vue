<template>
  <div class="login-contanin">
    <input type="number" placeholder="请输入手机号码" v-model="user.mobile" />
    <input type="number" placeholder="请输入验证码" v-model="user.code" />
    <p>账号：13911111111 密码：246810</p>
    <button @click="handlelogin">登录</button>
  </div>
</template>

<script>
// import { login } from "@/api/user.js";
import router from "@/router/";
import {setToken} from '@/utils/auth.js'
export default {
  data() {
    return {
      user: {
        mobile: "13911111111",
        code: "246810",
      },
    };
  },
  methods: {
    handlelogin() {
      let path = this.$route.query.redirect || '/'
      try {
        // const result = await login(this.user);
        // console.log(result.data.data,'token相关')
        // this.$store.commit("setRefreshToken", result.data.data.refresh_token);
        this.$store.commit("updateToken", 'qwdhwqjkrq232452325523523');
        // setToken('qwdhwqjkrq232452325523523') // 设置 cookie
        this.$router.push(path)
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-contanin {
  padding: 20px;
  input {
    margin: 10px 0;
  }
  p {
    margin-bottom: 20px;
  }
  button {
    width: 120px;
    height: 40px;
    line-height: 40px;
  }
}
</style>