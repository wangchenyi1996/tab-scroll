<!--
 * @Description: 虚拟列表
 * @Version: 1.0
 * @Autor: 王强
 * @Date: 2020-06-11 16:20:38
 * @LastEditors: 王强
 * @LastEditTime: 2020-06-11 16:47:13
--> 
<template>
  <div>
    <ScrollList :list="list" :startIndex="startIndex" :endIndex="endIndex"/>
  </div>
</template>

<script>
const ScrollList = ()=>import('@/components/VirtualListCom.vue')
export default {
  components: {
    ScrollList,
  },
  data() {
    return {
      list: ["测试数据"],
      startIndex: 0,
      endIndex: 60,
    };
  },
};
</script>

<style lang="scss" scoped>

</style>