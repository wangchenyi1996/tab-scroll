<template>
  <div class="water-ful">
    <p>瀑布流示例</p>
    <h3>v-lazy 背景图片</h3>
    <div v-lazy:background-image="bgurl" style="width:100%;height:200px"></div>
    <ul>
      <li class="item" v-for="(img, index) in list" :key="index">
        <img v-lazy="img" />
        <p>第{{ index + 1 }}张</p>
      </li>
    </ul>
  </div>
</template>

<script>
import imglist from "@/assets/imglist";
import axios from "axios";
export default {
  data() {
    return {
      list: imglist,
      bgurl: 'https://c-ssl.duitang.com/uploads/item/201902/15/20190215233958_jsnbd.thumb.400_0.jpg'
    };
  }
 
};
</script>

<style lang="scss" scoped>
ul,
li {
  list-style: none;
  padding: 0;
}
.water-ful {
  width: 100%;
  p {
    font-size: 20px;
    text-align: center;
    color: #303030;
  }
  ul {
    -webkit-column-count: 2; /* Chrome, Safari, Opera */
    -moz-column-count: 2; /* Firefox */
    column-count: 2;
    -webkit-column-gap: 10px; /* Chrome, Safari, Opera */
    -moz-column-gap: 10px; /* Firefox */
    column-gap: 10px;
    .item {
      margin: 20px 10px;
      img {
        width: 100%;
        border-radius: 2px;
      }
      p {
        font-size: 15px;
        color: #303030;
        text-align: center;
        width: 100%;
      }
    }
  }
}
</style>