<template>
  <div class="container">
    <div class="ul">
      <div class="li">小刘同学加入了凹凸实验室</div>
      <div class="li">小邓同学加入了凹凸实验室</div>
      <div class="li">小李同学加入了凹凸实验室</div>
      <div class="li">小王同学加入了凹凸实验室</div>
      <!--   插入用于填充的数据数据 -->
      <div class="li">小刘同学加入了凹凸实验室</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes scroll {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0, -140px);
  }
}

.container {
  margin: 20px auto;
  width: 220px;
  height: 40px;
  background: #0066ff;
  border-radius: 2em;
  overflow: hidden;
  .ul {
    height: 140px;
    // animation-name: scroll;
    // animation-duration: 7s;
    // animation-timing-function: linear;
    // animation-iteration-count: infinite;
    animation: scroll 7s linear infinite;  //动画属性简写
  }
  .li {
    width: 100%;
    line-height: 40px;
    vertical-align: bottom;
    color: #fff;
    text-align: center;
  }
}
</style>