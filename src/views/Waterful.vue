<template>
  <div class="water-ful">
    <p>瀑布流示例</p>
    <ul>
      <li class="item" v-for="(img,index) in list" :key="index">
        <img :src="img" />
        <p>第{{index+1}}张</p>
      </li>
    </ul>
  </div>
</template>

<script>
import imglist from "@/assets/imglist";
export default {
  data() {
    return {
      list: imglist,
    };
  },
  mounted() {
    console.log(this.list);
  },
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