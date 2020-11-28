<!--
 * @Description: 
    某些特定的页面，实现前进刷新，后退不刷新，类似app般的用户体验。
    注：　此处的刷新特指当进入此页面时，触发ajax请求，向服务器获取数据。
    不刷新特指当进入此页面时，不触发ajax请求，而是使用之前缓存的数据，以便减少服务器请求，用户体验更流畅。
 * @Version: 1.0
 * @Autor: 王强
 * @Date: 2020-05-15 08:59:37
 * @LastEditors: 王强
 * @LastEditTime: 2020-05-15 09:36:30
 -->
<template>
   <div>
      <headers title="我是page3 付款页面"/>

    <p> 我是付款页面 </p>

   </div>
</template>

<script>
   import headers from '@/components/back/back'
   export default {
      components: {
         headers
      },
      mounted(){
         console.log('我是page3 付款页面,mounted')
      },
      activated(){
         console.log('我是page3 付款页面,activated')
      },
    //   deactivated(){
    //      console.log('我是page3 付款页面,deactivated')
    //   },
      methods: {
         goPage3(){
            this.$router.push('/page3')
         }
      },
   }
</script>

<style lang="scss" scoped>
p{
    font-size: 20px;
    margin-top: 40px;
}
</style>