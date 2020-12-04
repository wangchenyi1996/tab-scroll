<template>
  <div>
    <button @click="$router.back()">返回</button>
    <h3>我是 add1.vue</h3>
    <button v-permission="['admin']">权限角色按钮</button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>