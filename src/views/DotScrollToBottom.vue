<!--
 * @Description: 商品飞入购物车动画
 * @Version: 1.0
 * @Autor: 王强
 * @Date: 2020-06-17 17:32:49
 * @LastEditors: 王强
 * @LastEditTime: 2020-06-18 09:56:19
--> 
<template>
  <div style="width:100%">
    <ul class="my-ul">
      <li @click="$router.push('/pic1')">点击去图表页面</li>
      <li @click="$router.push('/mock')">点击去mockjs页面</li>
      <li @click="$router.push('/vlist')">点击去虚拟列表页面，模拟几万条数据</li>
      <li @click="$router.push('/list')">模仿 商品列表的倒计时功能</li>
      <li @click="$router.push('/refresh')">自定义下拉刷新功能</li>
    </ul>
    <div class="cart-list u-f">
      <div class="cart-item u-f-c" v-for="item in 6" :key="item">
        <img src="@/assets/imgs/images/q.png" alt width="70" />
        <p>我是商品介绍我是商品介绍我是商品介绍我是商品介绍我是商品</p>
        <span @click="addToCart(item)" class="buyCar">小球</span>
      </div>
      <div style="position: relative;">
        <transition
          appear
          @before-appear="beforeEnter"
          @after-appear="afterEnter"
          v-for="(item,index) in showMoveDot"
          :key="index"
        >
          <div class="move_dot" ref="ball" v-if="item"></div>
        </transition>
      </div>
    </div>
    <ul class="goods u-f u-f-asc">
      <!-- <li v-for="i in 10" :key="i">商品{{ i+1 }}...</li> -->
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMoveDot: [], //控制下落的小圆点显示隐藏
      elLeft: 0, //当前点击购物车按钮在网页中的绝对top值
      elTop: 0 //当前点击购物车按钮在网页中的绝对left值
    };
  },
  methods: {
    addToCart(item) {
      this.showMoveDot = [...this.showMoveDot, true];
      this.elLeft = event.target.getBoundingClientRect().left;
      this.elTop = event.target.getBoundingClientRect().top;
      // console.log(event.target.getBoundingClientRect())
      // console.log( this.elLeft, this.elTop)
    },
    beforeEnter(el) {
      // 设置transform值
      el.style.transform = `translate3d(${this.elLeft - 30}px,${this.elTop -
        100}px , 0)`;
      // 设置透明度
      el.style.opacity = 0;
    },
    afterEnter(el) {
      // 获取底部购物车徽标的位置
      const badgePosition = document
        .getElementById("buycar")
        .getBoundingClientRect();
      // 设置位移
      el.style.transform = `translate3d(${badgePosition.left +
        30}px,${badgePosition.top - 30}px,0)`;
      // 增加贝塞尔曲线
      el.style.transition =
        "transform .88s cubic-bezier(0.3, -0.25, 0.7, -0.15)";
      el.style.transition = "transform .88s linear";
      this.showMoveDot = this.showMoveDot.map(item => false);
      // 设置透明度
      el.style.opacity = 1;
    }
  }
};
</script>

<style lang="scss" scoped>
.my-ul {
  padding-top: 20px;
  list-style-type: none;
  li {
    height: 40px;
    line-height: 40px;
  }
}
.cart-list {
  width: 100%;
  overflow-x: scroll;
  margin-top: 30px;
  .cart-item {
    p {
      width: 100px;
      font-size: 13px;
    }
    span {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      background-color: red;
      font-size: 12px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      // align-self: flex-end;
    }
  }
}
.goods {
  list-style-type: none;
  margin-top: 30px;
  flex-wrap: wrap;
  padding: 0;
  > li {
    height: 100px;
    width: 150px;
    border: 1px solid skyblue;
  }
}
.move_dot {
  position: fixed;
  // z-index: 100;
  top: 20px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
</style>