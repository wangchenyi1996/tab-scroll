<template>
  <div id="app">
    <router-view v-if="isShow"/>
  </div>
</template>
<script>
   export default {
      data(){
        return {
          isShow:true
        }
      },
      provide(){
        return{
          reload:this.pageReload,
          userInfo:{
            name:'张小三',
            age:18,
            gender:'男'
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
