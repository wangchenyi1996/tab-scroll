<template>
  <div class="outer">
    <div class="inner"></div>
    <div class="inner"></div>
    <div class="inner"></div>
    <div class="inner"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.outer {
  /**定义子元素水平居中**/
  display: flex;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: #6a5acd8c;
  position: relative;
}
.inner {
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #6a5acdeb;
  transform-origin: 50% 30px; /* 30px为环绕半径,大小需要是父级盒子的一半 */
  animation: an-circle 3s ease-in-out infinite;
}
.inner:nth-child(2) {
  height: 12px;
  width: 12px;
  animation-delay: 0.2s;
}
.inner:nth-child(3) {
  height: 10px;
  width: 10px;
  animation-delay: 0.4s;
}
.inner:nth-child(4) {
  height: 8px;
  width: 8px;
  animation-delay: 0.6s;
}
@keyframes an-circle {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1turn);
  }
}
</style>