<template>
  <div>
    <p>{{ firstNum }}</p>
    <p>{{ secondNum }}</p>
    <p>{{ thirdNum }}</p>
  </div>
  <!-- 
      1. 如果watch  不加上immediate: true, 执行顺序是 created -> computed -> mounted -> watch -> computed
      顺序如下：
      created
      computed: 100
      mounted
      watch: 2
      computed: 200

      2. 如果watch  加上immediate: true,执行顺序是 watch -> created -> computed -> mounted -> watch -> computed
        watch: 0
        created
        computed: 100
        mounted
        watch: 2
        computed: 200
  -->
</template>
 
<script>
export default {
  computed: {
    secondNum() {
      // firstNum 从一开始就与之绑定关联
      console.log("computed: " + this.firstNum * 100);
      return this.firstNum * 100;
    },
  },
  data() {
    return {
      firstNum: 0,
      thirdNum: 0,
    };
  },
  watch: {
    // firstNum(val) {
    //     // firstNum 只有在发生改变时，才会进入该逻辑
    //     console.log('watch: ' + val)
    //     this.thirdNum = val * 100
    // }
    firstNum: {
      handler(newName, oldName) {
        console.log("watch: " + newName);
        this.thirdNum = newName * 100;
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true,
    },
  },
  created() {
    console.log("created");
    // 该步骤在 data() 数据实例化之前。
    // 此时改变 data() 中的数据是不会触发 change 事件的，无法进入 watch 代码部分。
    this.firstNum = 1;
    // console.log(this.firstNum);
  },
  mounted() {
    console.log("mounted");
    // 该步骤在 data 数据实例化之后。
    // 此时改变 data 中的数据是会触发 change 事件的，也就能被 watch 到。
    this.firstNum = 2;
  },
};
</script>