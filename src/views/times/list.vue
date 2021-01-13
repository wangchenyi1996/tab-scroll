<template>
  <div>
    <p class="p1">商品列表，倒计时演示</p>
    <ul class="ouls">
      <li v-for="item in timeArr" :key="item.id" @click="gotDetail(item.id)">
        {{ item.title }}--{{ item.msg }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      creatime: "", // 开始时间
      daoTim: "", // 倒计时时间
      timeArr:[
        {title:'商品1',id:1,creatime:'2021/01/13 17:07:15',daoTim: 30 * 60 * 1000, msg: '',timer: null},
        {title:'商品2',id:2,creatime:'2021/01/13 17:20:27',daoTim: 100 * 60 * 1000, msg: '',timer: null},
        {title:'商品3',id:3,creatime:'2021/01/13 17:30:43',daoTim: 120 * 60 * 1000, msg: '',timer: null},
        {title:'商品4',id:4,creatime:'2021/01/13 17:40:59',daoTim: 150 * 60 * 1000, msg: '',timer: null},
      ]
    }
  },
  created() {
    this.timeArr.forEach(item => {
      this.getadver(item)
    });
  },
  methods: {
     getadver(item) {
      item.timer = setInterval(()=>{
        this.countdown(item)
      }, 1000); // 调用倒计时
    },
    countdown(item) {
      var now = new Date(item.creatime); //处理开始时间    这个方法兼容大多数浏览器以及h5手机端
      var minutes = Number(item.daoTim); //处理输入的过期时间
      var end = now.getTime() + minutes; //计算最后时间
      var time_now = new Date().getTime(); //当前时间
      var msec = end - time_now; //最后时间-当前时间
      if (msec > 0) {
        let day = parseInt(msec / 1000 / 60 / 60 / 24);
        let hr = parseInt((msec / 1000 / 60 / 60) % 24);
        let min = parseInt((msec / 1000 / 60) % 60);
        let sec = parseInt((msec / 1000) % 60);
        day = day;
        hr = hr > 9 ? hr : "0" + hr;
        min = min > 9 ? min : "0" + min;
        sec = sec > 9 ? sec : "0" + sec;
        // 设置
        item.msg = min + "分" + sec + "秒";
      } else {
        this.$toast("倒计时结束", 500);
        clearInterval(item.timer);
      }
    },
    // 跳转详情
    gotDetail(id) {
      this.$router.push('/detail/'+id)
    }
  },
};
</script>

<style lang="scss" scoped>
.p1 {
  margin-top: 30px;
  text-align: center;
  font-size: 20px;
}
.ouls{
  list-style-type: none;
  margin-top: 40px;
  li{
    margin: 20px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
  }
}
</style>
