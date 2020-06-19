<!--
 * @Description: mock使用
 * @Version: 1.0
 * @Autor: 王强
 * @Date: 2020-06-17 11:11:38
 * @LastEditors: 王强
 * @LastEditTime: 2020-06-17 14:02:15
--> 
<template>
  <div class="mock">
    <p>mock使用</p>

    <ul>
      <li v-for="item of list" :key="item.name">{{ item.name }}</li>
    </ul>
    <ul style="margin-top:50px;">
      <li v-for="item of categroyList" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      list: [],
      categroyList:[]
    };
  },
  mounted() {
    this.getCitylist();
    this.getCategroyList()
  },
  methods: {
    getCitylist() {
      axios
        .get("/cityList",{
          data:{
            a:1,
            b:2
          }
        })
        .then(res => {
          console.log("城市列表", res);
          this.list = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCategroyList(){
         axios
        .post("/categroy")
        .then(res => {
          console.log("商品分类列表", res.data.data.data.cate);
          this.categroyList = res.data.data.data.cate
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.mock {
  p {
    font-size: 18px;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
}
</style>