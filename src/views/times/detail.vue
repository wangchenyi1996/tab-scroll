<template>
  <div>
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
      tims: null,
       timeArr:[
        {title:'商品1',id:1,creatime:'2020/06/09 11:37:00',daoTim: 7 * 60 * 1000},
        {title:'商品2',id:2,creatime:'2020/06/09 11:37:00',daoTim: 10 * 60 * 1000},
        {title:'商品3',id:3,creatime:'2020/06/09 11:37:00',daoTim: 12 * 60 * 1000},
        {title:'商品4',id:4,creatime:'2020/06/09 11:37:00',daoTim: 15 * 60 * 1000},
      ],
    };
  },
  watch: {
    $route: {
      handler(val, oldVal){
        console.log(val,oldVal);
      },
      // 深度观察监听
      deep: true,
      immediate:true
    }
  },
  created() {
    let id = parseInt(this.$route.params.id)
    this.creatime = this.timeArr[id-1].creatime
    this.daoTim = this.timeArr[id-1].daoTim
    this.getadver();
  },
  methods: {
    getadver() {
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
p {
  margin-top: 30px;
  text-align: center;
  font-size: 28px;
  font-family: Righteous;
}
</style>
