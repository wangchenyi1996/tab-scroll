<template>
  <div>
    <p class="p1">商品列表，倒计时演示</p>


    <ul class="ouls">
      <li v-for="item in timeArr" :key="item.id" @click="gotDetail(item.id)">
        {{ item.title }}
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
        {title:'商品1',id:1,creatime:'2020/06/09 11:17:00',daoTim: 7 * 60 * 1000},
        {title:'商品2',id:2,creatime:'2020/06/09 11:17:00',daoTim: 10 * 60 * 1000},
        {title:'商品3',id:3,creatime:'2020/06/09 11:17:00',daoTim: 12 * 60 * 1000},
        {title:'商品4',id:4,creatime:'2020/06/09 11:17:00',daoTim: 15 * 60 * 1000},
      ]
    }
  },
  methods: {
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
