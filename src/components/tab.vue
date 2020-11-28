<template>
  <ul class="tabs">
    <li class="tab-litem" v-for="(item,index) in tabList" :key="index" :class="current==index?'current':''" @click="tabItem(index)">{{item}}</li>
  </ul>
</template>

<script>
export default {
  name: "Tab",
  props: {
    tabList: {
      type:Array,
      defalut:()=>[]
    },
    current:{
      type:Number
    }
  },
  
  methods: {
    tabItem(index) {
      this.$emit('Tabchang',index)
    }

  }

};
</script>

<style scoped lang="scss">
.tabs{
  position: sticky;
  top: 0;
  background-color: #fff;
  width: 90%;
    list-style-type: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .tab-litem{
      flex: 1;
      text-align: center;
      padding: 10px;
    }
    .current{
      color: aqua;
      font-size: 16px;
      font-weight: bold;
    }
  }
</style>
