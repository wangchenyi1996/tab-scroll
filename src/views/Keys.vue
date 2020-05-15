<template>
  <div>
    <img src="~@/assets/imgs/red.jpg" alt="" srcset="">
    <ul>
      <li v-for="(item, index) in arr" :key="index">{{ item.title }}</li>
    </ul>

    <button @click="removes">删除</button>
  </div>
</template>

<script>
let arrs = [
  { id: 1, title: "我是第1个" },
  { id: 2, title: "我是第2个" },
  { id: 3, title: "我是第3个" }
];
export default {
  data() {
    return {
      arr: arrs
    };
  },
  methods: {
    /**
     如果 不加上key 删除第一个相当于删除最后一个
     */
    removes() {
      this.arr.shift()
    }
  }
};
</script>

<style lang="scss" scoped>
ul {
  margin-top: 30px;
  margin-bottom: 30px;
  li {
    margin: 10px;
  }
}
</style>