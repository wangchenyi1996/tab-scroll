<template>
  <div>
    <!-- <div class="style-1">
      <div>
        <div style="font-size: 32px;color: #fff;text-align: center;padding-top: 120rpx;">
          <p v-for="item in 1" :key="item">骚代码写在这里</p>
        </div>
      </div>
    </div>

    <div style="height: 30px;"></div>

    <div class="style-2">
      <div style="font-size: 32px;color: #fff;text-align: center;padding-top: 30px;">骚代码写在这里</div>
    </div>

    <div style="height: 100px;"></div>-->

    <div class="container">
      <div class="avator"></div>
      <p>bulr shadow</p>
    </div>
    <!-- 倒计时 -->
    <p>倒计时：{{ msg }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      creatime: "", // 开始时间
      daoTim: "", // 倒计时时间
      msg: "",
      tims: null
    };
  },
  mounted() {
    this.getadver();
  },
  methods: {
    getadver() {
      this.daoTim = 30 * 60 * 1000; // 过期时间  15分钟 或者30分钟
      this.creatime = "2020/06/03 15:00:00"; // 下单开始的时间--需要自己配置
      this.tims = setInterval(this.countdown, 1000); // 调用倒计时
    },
    countdown() {
      var _that = this;
      var now = new Date(_that.creatime); //处理开始时间    这个方法兼容大多数浏览器以及h5手机端
      var minutes = Number(_that.daoTim); //处理输入的过期时间
      var end = now.getTime() + minutes; //计算最后时间
      var time_now = new Date().getTime(); //当前时间
      var msec = end - time_now; //最后时间-当前时间
      // console.log('1',end)
      // console.log('2',msec)
      // console.log('3',time_now)
      if (msec > 0) {
        let day = parseInt(msec / 1000 / 60 / 60 / 24);
        let hr = parseInt((msec / 1000 / 60 / 60) % 24);
        let min = parseInt((msec / 1000 / 60) % 60);
        let sec = parseInt((msec / 1000) % 60);
        day = day;
        hr = hr > 9 ? hr : "0" + hr;
        min = min > 9 ? min : "0" + min;
        sec = sec > 9 ? sec : "0" + sec;
        this.msg = min + "分" + sec + "秒";
      } else {
        clearInterval(this.tims);
        this.$toast("倒计时结束", 500);
      }
    }
  }
};
</script>

<style lang="scss">
.style-1 {
  width: 375px;
  height: 375px;
  overflow: hidden;
  position: relative;

  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    position: absolute;
    z-index: 1;
    width: 200%;
    height: 110%;
    bottom: 0;
    left: -50%;
    background-color: #8d58fc;
    background-image: linear-gradient(to top right, #5876fc, #8d58fc);
  }

  > div {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
  }
}

.style-2 {
  width: 375px;
  height: 375px;
  overflow: hidden;
  position: relative;
  background-color: #8d58fc;
  background-image: linear-gradient(to top right, #5876fc, #8d58fc);

  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    position: absolute;
    z-index: 1;
    width: 200%;
    height: 110%;
    bottom: -102%;
    left: -50%;
    background-color: #fff;
  }
}

$img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1505822443&di=941986df9c6514d5d43eaba4aa938347&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.qqtouxiang8.net%2Fuploads%2Fallimg%2Fc150313%2F142623130563050-922006.jpg";

@import url(https://fonts.googleapis.com/css?family=Righteous);

.container {
  width: 200px;
  margin: 20px auto;
}

.avator {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: url($img) no-repeat center center;
  background-size: 100% 100%;

  &::after {
    content: "";
    position: absolute;
    top: 10%;
    left: 0%;
    width: 100%;
    height: 100%;
    background: inherit;
    background-size: 100% 100%;
    border-radius: 50%;
    transform: scale(0.95);
    filter: blur(10px) brightness(80%) opacity(0.8);
    z-index: -1;
  }
}

p {
  margin-top: 30px;
  text-align: center;
  font-size: 28px;
  font-family: Righteous;
}
</style>
