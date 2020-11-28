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
    <p style="margin:20px auto">地图</p>
    <ve-map :data="chartData" :settings="chartSettings"></ve-map>

     <p style="margin:20px auto">地图--设置城市</p>
    <ve-map :data="chartData2" :settings="chartSettings2"></ve-map>

  </div>
</template>

<script>
import veMap from "v-charts/lib/map.common";
export default {
  name: "map",
  components: {
    veMap
  },
  data() {
    this.chartSettings = {
      position: "china",
      dimension: "位置",
      metrics: ["人口", "面积"],
      dataType: {
        面积: "KMB"
      }
    };
     this.chartSettings2 = {
        position: 'province/beijing'
      }
     
    return {
      chartData: {
        columns: ["位置", "税收", "人口", "面积"],
        rows: [
          { 位置: "吉林", 税收: 123, 人口: 123, 面积: 92134 },
          { 位置: "北京", 税收: 1223, 人口: 2123, 面积: 29234 },
          { 位置: "上海", 税收: 2123, 人口: 1243, 面积: 94234 },
          { 位置: "浙江", 税收: 4123, 人口: 5123, 面积: 29234 }
        ]
      },
      chartData2: {
          columns: ['位置', '人口'],
          rows: [
            { '位置': '延庆区', '人口': 123 },
            { '位置': '密云区', '人口': 1223 },
            { '位置': '平谷区', '人口': 2123 },
            { '位置': '海淀区', '人口': 4123 }
          ]
        }
    };
  }
};
</script>

<style scoped>
</style>