<template>
  <div>
    <p style="margin:10px auto">折线图---显示指标数值</p>
    <ve-line :data="chartData" :extend="extend"></ve-line>

    <button @click="getData">改变数据</button>

    <p style="margin:10px auto">堆叠面积图</p>
    <ve-line :data="chartData" :settings="chartSettings"></ve-line>
  </div>
</template>

<script>
import axios from "axios";
import VeLine from "v-charts/lib/line.common";
export default {
  name: "pic1",
  data() {
    this.extend = {
      series: {
        label: {
          normal: {
            show: true
          }
        }
      }
    };
    this.chartSettings = {
      stack: { 用户: ["访问用户", "下单用户"] },
      area: true
    };
    return {
      chartData: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: "1/7", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: "1/8", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: "1/9", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: "1/10", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/11", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "1/12", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
        ]
      }
    };
  },
  components: {
    VeLine
  },
  mounted(){
    // this.getData()
  },
  methods: {
    getData() {
      axios
        .get(
          "http://rap2.taobao.org:38080/app/mock/233782/charts/getCharts"
        )
        .then((res)=> {
          let { chartData } = res.data
          this.chartData = chartData
          console.log(chartData);
        })
        .catch((error)=> {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>