<template>
  <div class="tabbar" id="buycar">
    <ul class="tab-list u-f u-f-asc">
      <router-link to="/home" tag="li" class="tab-item u-f-c" active-class="active" >
        <span class="tab-desc">首页</span>
      </router-link>
      <router-link to="/about" tag="li" class="tab-item u-f-c" active-class="active">
        <span class="tab-desc">vuex</span>
      </router-link>
      <router-link to="/joinchat" tag="li" class="tab-item u-f-c" active-class="active">
        <span class="tab-desc">聊天</span>
      </router-link>
      <router-link to="/cart" tag="li" class="tab-item u-f-c" active-class="active">
        <span class="tab-desc">购物车</span>
      </router-link>
       <router-link to="/index" tag="li" class="tab-item u-f-c" active-class="active">
        <span class="tab-desc">我的</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  };
</script>

<style scoped lang="scss">
@import '../common/style.scss';
.tabbar {
  position: fixed;
  z-index: 100;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: skyblue;
  height: 40px;
  width: 100%;
  .tab-list {
    // width: 100%;
    padding: 0;
    height:40px;
    .tab-item {
       color: whitesmoke;
      .tab-desc {
        margin-top: 5px;
      }
      .icon::before {
        font-size: 22px;
      }
    }
  }
}
.active {
  // color: red !important;
  animation: jump 1s;
  //字体渐变色
  @include lg-text(); 
  // background-image: -webkit-linear-gradient(left, red, yellow);
  // -webkit-background-clip: text;
  // -webkit-text-fill-color: transparent;
}

</style>
