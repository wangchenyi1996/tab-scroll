<template>
  <div>
    <button @click="$router.back()">返回</button>
    <h3>我是 add1.vue</h3>
    <button v-permission="['admin']">权限角色按钮</button>
    <Loading />
    <h2>悬浮菜单组件</h2>
    <HoverMenu />
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import HoverMenu from '@/components/HoverMenu.vue'
export default {
  components:{
    Loading,HoverMenu
  }
};
</script>

<style>
</style>