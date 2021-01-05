<template>
  <div class="animation">
    <!-- <Test1 /> -->
    <!-- 直播点击动画 -->
    <!-- <Test2 /> -->
    <!-- 打字动画 -->
    <!-- <Test3 /> -->
    <!-- Vue实现购物小球抛物线 -->
    <Test4 />
  </div>
</template>

<script>
import Test1 from '@/components/animation/Test1.vue';
import Test2 from '@/components/animation/Test2.vue';
import Test3 from '@/components/animation/Test3.vue';
import Test4 from '@/components/animation/Test4.vue';
export default {
  components: {
    Test1,
    Test2,
    Test3,
    Test4
  },
};
</script>

<style lang="scss" scoped>
.animation{
  width: 100%;
  min-height: 100%;
}
</style>