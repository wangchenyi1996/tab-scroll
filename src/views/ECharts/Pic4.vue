<template>
  <div>
    <!-- 
        按需引入v-charts的每种图表组件，都已经单独打包到lib文件夹下了
    |- lib/
        |- line.common.js  -------------- 折线图
        |- bar.common.js  --------------- 条形图
        |- histogram.common.js  --------- 柱状图
        |- pie.common.js  --------------- 饼图
        |- ring.common.js  -------------- 环图
        |- funnel.common.js  ------------ 漏斗图
        |- waterfall.common.js  --------- 瀑布图
        |- radar.common.js  ------------- 雷达图
        |- map.common.js  --------------- 地图
        |- sankey.common.js  ------------ 桑基图
        |- heatmap.common.js  ----------- 热力图
        |- scatter.common.js  ----------- 散点图
        |- candle.common.js  ------------ k线图
        |- gauge.common.js  ------------- 仪表盘
        |- tree.common.js  -------------- 树图
        |- bmap.common.js  -------------- 百度地图
        |- amap.common.js  -------------- 高德地图
        使用时，可以直接将单个图表引入到项目中
    -->
    <p style="margin:20px auto">饼图</p>
    <ve-radar :data="chartData" :settings="chartSettings"></ve-radar>
  </div>
</template>

<script>
import veRadar from "v-charts/lib/radar.common";
export default {
  name: "pic3",
  components: {
    veRadar
  },
  data() {
    this.chartSettings = {
      labelMap: {
        日期: "date",
        访问用户: "PV",
        下单用户: "Order",
        下单率: "orderRate"
      }
    };
    return {
      chartData: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
        ]
      }
    };
  }
};
</script>

<style scoped>
</style>