<template>
  <div class="variables">
    <h3>操作 Scss变量 实现 页面换肤功能</h3>
    <div class="box" :style="{ 'background-color':  bgcolor}">
      <span :style="{ color:  textcolor}"> 点击按钮实现换肤功能 </span>
    </div>
    <p style="text-align: center">选择颜色</p>
    <input type="color" @change="change" v-model="color" />
    <button @click="changeColor">确定换肤</button>
  </div>
</template>

<script>
//使用scss的变量，在data中定义也可以
import variables from "@/styles/variables.scss";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      color: "",  // 颜色
    };
  },
  computed: {
    ...mapState(["textcolor", "bgcolor"]),
  },
  methods: {
     ...mapMutations({
      CHANGE_COLOR: 'CHANGE_COLOR' // 将 `this.CHANGE_COLOR()` 映射为 `this.$store.commit('CHANGE_COLOR')`
    }),
    // input 颜色选择器
    change(e) {
      // console.log(e.target.value);
      this.color = e.target.value
    },

    //  store
    changeColor() {
      // this.$store.commit(
      //   "CHANGE_COLOR",
      //   this.color
      // );
      this.CHANGE_COLOR(this.color)
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
// 想要使用$test-color 需要引入文件

.variables {
  width: 100%;
  height: 100vh;
  h3 {
    text-align: center;
    padding: 20px;
  }
  .box {
    height: 70vh;
    width: 100%;
    border: 1px solid #333;
    margin: 0 auto;
  }
  input,
  button {
    display: block;
    margin: 10px auto;
    color: $test-color;
  }
}
</style>