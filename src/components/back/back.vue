<!--
 * @Description: 返回上一页面
 * @Version: 1.0
 * @Autor: 王强
 * @Date: 2020-05-15 09:05:03
 * @LastEditors: 王强
 * @LastEditTime: 2020-05-15 09:22:17
 -->
<template>
  <div class="navs u-f u-f-ajc">
    <span @click="back">&lt;</span>
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.navs {
    width: 100%;
  height: 45px;
  line-height: 45px;
  background-color: skyblue;
  span {
    &:nth-of-type(1) {
      font-size: 30px;
      color: white;
      position: absolute;
      left: 10px;
    }
    &:nth-of-type(2) {
      font-size: 16px;
      color: white;
      text-align: center;
    }
  }
}
</style>