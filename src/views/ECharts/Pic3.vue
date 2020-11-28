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
    <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>

    <p style="margin:20px auto">饼图--玫瑰图</p>
    <ve-pie :data="chartData" :settings="chartSettings2"></ve-pie>
  </div>
</template>

<script>
import vePie from "v-charts/lib/pie.common";
export default {
  name: "pic3",
  components: {
    vePie
  },
  data() {
    this.chartSettings = {
      dimension: "日期",
      metrics: "访问用户"
    };
    this.chartSettings2 = {
      roseType: "radius"
    };
    return {
      chartData: {
        columns: ["日期", "访问用户"],
        rows: [
          { 日期: "1/1", 访问用户: 1393 },
          { 日期: "1/2", 访问用户: 3530 },
          { 日期: "1/3", 访问用户: 2923 },
          { 日期: "1/4", 访问用户: 1723 },
          { 日期: "1/5", 访问用户: 3792 },
          { 日期: "1/6", 访问用户: 4593 }
        ]
      }
    };
  }
};
</script>

<style scoped>
</style>