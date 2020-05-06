<template>
  <div class="amap-page-container">
    <!-- 搜索框 -->
    <el-amap-search-box
      class="search-box"
      :search-option="searchOption"
      :on-search-result="onSearchResult"
    ></el-amap-search-box>
    <!-- 地图 -->
    <el-amap
      ref="map"
      vid="amapDemo"
      :amap-manager="amapManager"
      :center="center"
      :zoom="zoom"
      :plugin="plugin"
      :events="events"
      class="amap-demo"
    >
      <el-amap-marker
        v-for="(marker,index) in markers"
        :position="marker.position"
        :key="index+1"
        :events="marker.events"
      ></el-amap-marker>
    </el-amap>
  </div>
</template>

<script>
import { AMapManager } from "vue-amap";
import ajax from "../config/ajax";
export default {
  name: "MyMap",
  data() {
    return {
      title: "地图",
      goWhere: [118.926491, 32.054958], //目标地经纬度

      searchOption: {
        //默认输入搜索地
        city: "南京",
        citylimit: true
      },

      markers: [],
      amapManager: new AMapManager(),
      zoom: 16,
      center: [118.909332, 32.029011],
      events: {
        init: o => {
          console.log(o.getCenter());
          console.log(this.$refs.map.$$getInstance());
          o.getCity(result => {
            console.log(result);
          });

          let marker = new AMap.Marker({
            position: this.center
          });

          marker.setMap(o);
        },
        moveend: () => {},
        zoomchange: () => {},
        //点击marker
        click: e => {
          let result = e.lnglat;
          console.log(result);
        }
      },
      plugin: [
        "ToolBar",
        {
          pName: "MapType",
          defaultType: 0,
          events: {
            init(o) {
              console.log(o);
            }
          }
        }
      ]
    };
  },
  methods: {
    //搜索
    onSearchResult(pois) {
      let latSum = 0;
      let lngSum = 0;
      console.log(pois);
      if (pois.length > 0) {
        pois.forEach(poi => {
          let { lng, lat } = poi;
          lngSum += lng;
          latSum += lat;
          //   this.markers.push([poi.lng, poi.lat]);
          this.markers.push({
            position: [poi.lng, poi.lat],
            events: {
              click: e => {
                let result = e.lnglat;
                let url = `https://restapi.amap.com/v3/geocode/regeo`;
                let location = `${result.lng},${result.lat}`;
                let key = "74976c5462c5d65770f8e09772189af6";
                ajax(url, { location, key }).then(res => {
                  if (res.infocode == "10000") {
                    // console.log(res)
                    this.$toast(res.regeocode.formatted_address);
                  }
                });
              }
            }
          });
        });
        let center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        };
        this.center = [center.lng, center.lat];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.amap-demo {
  margin-top: 50px;
  min-height: 93vh;
  height: 93%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.search-box {
  position: absolute;
  top: 55px;
  left: 15px;
  width: 270px;
}

.amap-page-container {
  position: relative;
}
</style>
