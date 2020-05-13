<template>
  <div id="app">
    <router-view v-if="isShow"/>
    
    <div class="container">
        <router-view name="header"></router-view>
        <router-view name="left"></router-view>
        <router-view name="mian"></router-view>
    </div>

  </div>
</template>
<script>
   export default {
      data(){
        return {
          isShow:true
        }
      },
      /*
        provide：是一个对象，或者是一个返回对象的函数。里面呢就包含要给子孙后代的东西，也就是属性和属性值。
        注意：子孙层的provide会掩盖祖父层provide中相同key的属性值

        inject：一个字符串数组，或者是一个对象。属性值可以是一个对象，包含from和default默认值，
        from是在可用的注入内容中搜索用的 key (字符串或 Symbol)，意思就是祖父多层provide提供了很多数据，from属性指定取哪一个key;default指定默认值。
      */

      provide(){
        return{
          reload:this.pageReload,
          userInfo:{
            name:'张三',
            age:18,
            gender:'男'
          },
          userInfo1:{
            name:'张小三',
            age:18,
            gender:'女'
          }
        }
      },
      methods: {
        //刷新
        pageReload() {
          this.isShow=false;
          this.$nextTick(()=>{
            this.isShow=true;
          })
        }
      }

    }
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*{
  margin: 0;
}
</style>
