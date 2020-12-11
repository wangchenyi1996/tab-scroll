<template>
  <div>
    <ul class="shop u-f u-f-wrap">
      <li v-for="(item, index) in items" :key="index">
        <span>{{ item.text }}</span>
        <span>{{ item.price }}</span>
        <button @click="additem">添加</button>
      </li>
    </ul>

    <div class="cart u-f u-f-ajc" style="">{{ count }}</div>

    <div class="ball-container">
      <!--小球-->
      <div v-for="(ball, index) in balls" :key="index">
        <transition
          name="drop"
          @before-enter="beforeDrop"
          @enter="dropping"
          @after-enter="afterDrop"
        >
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      items: [
        { text: "苹果", price: 15 },
        { text: "香蕉", price: 15 },
      ],
      // 生成一个动画小球的div,并且生成五个小球,
      // 五个是为了生成一定数量的小球来作为操作使用,
      // 按照小球动画的速度,一般来说五个也可以保证有足够的小球数量来运行动画
      balls: [
        //小球 设为5个
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false },
      ],
      dropBalls: [],  //dropBalls数组接收下落小球,用来存贮已经下落的小球
    };
  },
  mounted() {
    let i =0
    let arr = [
      { text: "苹果", price: 15 },
      { text: "香蕉", price: 15 },
    ]
    for(let j = 0; j < 20 ; j++){
      this.items.push(...arr)
    }
  },
  methods: {
    additem(event) {
      this.drop(event.target);
      this.count++;
    },
    drop(el) { //el代表点击的添加按钮button,而不是小球
      // console.log(el)
      //抛物
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) { //将false的小球放到dropBalls
          ball.show = true;
          ball.el = el; //设置小球的el属性为一个dom对象
          this.dropBalls.push(ball);    //在所有的小球中只要找到1个ball.show = true;就可以了，不用把所有的小球都有要有设置为true
          return;
        }
      }
    },

    //下面方法beforeDrop，dropping，afterDrop都是动画方法
    beforeDrop(el) {
      //这个方法的执行是因为这是一个vue的监听事件,动画enter之前
      //把使用到的小球从起始位置（购物车位置）上升到添加按钮位置
      //在这时el与上面的drop（el）不是同一个el,这里的el代表的是类为ball的div及其子元素
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          //外层元素是纵向的动画，内层元素是横向的动画
          //el.getBoundingClientRect()这个方法返回一个矩形对象，
          // 包含四个属性：left、top、right和bottom。分别表示元素的左，上，右和下分别相对【浏览器视窗】的位置。
          //ball.el与el不是同一个，ball.el是指点击添加按钮时的那个el
          let rect = ball.el.getBoundingClientRect(); //元素相对于视口的位置
          // console.log('位置信息：',rect)
          //当前按钮和购物车中小球的left的差值
          //window.innerHeight文档显示区域的宽高,y表示的是按钮到购物车的高度
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22); //获取y 负数,因为是从左上角往下的的方向
          el.style.display = "";
          el.style.transform = "translateY(" + y + "px)"; //translateY
          let inner = el.getElementsByClassName("inner-hook")[0];
          inner.style.transform = "translateX(" + x + "px)";
        }
      }
    },
    dropping(el, done) {
      /*重置小球数量  样式重置*/
      el.offsetHeight //这行代码必须加上 否则没有过渡效果 offsetWidth / offsetTop / offset开头的属性都可以
      el.style.transform = "translate3d(0,0,0)";
      let inner = el.getElementsByClassName("inner-hook")[0];
      inner.style.transform = "translate3d(0,0,0)";
      el.addEventListener("transitionend", done);
    },
    afterDrop(el) {
      /*初始化小球*/
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = "none";
      }
    }
  },
};
</script>

<style lang="scss" scoped>
ul,li{
  list-style-type: none;
}
.shop {
  >li{
    width: 50%;
    margin: 10px 0;
  }
}
.ball {
  position: fixed;
  left: 32px;
  bottom: 22px;
  z-index: 200;
  transition: all 0.5s cubic-bezier(0.49, -0.29, 0.75, 0.41); /*贝塞尔曲线*/
}
.inner {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: rgb(0, 160, 220);
  transition: all 0.5s linear;
}
.cart {
  position: fixed;
  bottom: 10px;
  left: 32px;
  width: 30px;
  height: 30px;
  background-color: orangered;
  color: rgb(255, 255, 255);
}
</style>