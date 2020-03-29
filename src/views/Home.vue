<template>
  <div class="home">
   <!-- <div style="display:flex;">
      <button @click="toast">显示taost弹出框---模拟吸顶效果</button>
      <p @click="downs">去下载图片</p>
   </div> -->
    <Tab :tabList="tabList" @Tabchang="tabchange" :current="current" />
    <div class="tiyu">
      <div class="title">体育</div>
      <div class="litem" v-for="(item,index) in tiyu" :key="index">
        <img :src="item.roomImg" />
        <p>{{item.roomWhere}}</p>
      </div>
      
    </div>
    <div class="yule">
      <div class="title">娱乐</div>
      <div class="litem" v-for="(item,index) in yule" :key="index">
        <img :src="item.roomImg" />
        <p>{{item.roomWhere}}</p>
      </div>
    </div>
    <div class="caij">
      <div class="title">财经</div>
      <div class="litem" v-for="(item,index) in caij" :key="index">
        <img :src="item.roomImg" />
        <p>{{item.roomWhere}}</p>
      </div>
    </div>
    <div class="lishi">
      <div class="title">历史</div>
      <div class="litem" v-for="(item,index) in lishi" :key="index">
        <img :src="item.roomImg" />
        <p>{{item.roomWhere}}</p>
      </div>
    </div>
    <div class="keji">
      <div class="title">科技</div>
      <div class="litem" v-for="(item,index) in keji" :key="index">
        <img :src="item.roomImg" />
        <p>{{item.roomWhere}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Tab from "@/components/tab.vue";
import datas from "@/assets/data.js";

export default {
  name: "home",
  components: {
    Tab
  },
  data() {
    return {
      tabList: ["体育", "娱乐", "财经", "历史", "科技"],
      current: 0,
      // tiyu: datas.tiyu,
      // caij: datas.caij,
      // yule: datas.yule,
      // lishi: datas.lishi,
      // keji: datas.keji,
      tiyu: datas.tiyu,
      caij: datas.tiyu,
      yule: datas.tiyu,
      lishi: datas.tiyu,
      keji: datas.tiyu,
      domH: [],
       show: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.domH.push(0);
    this.domH.push(document.getElementsByClassName("yule")[0].offsetTop - 50);
    this.domH.push(document.getElementsByClassName("caij")[0].offsetTop - 50);
    this.domH.push(document.getElementsByClassName("lishi")[0].offsetTop - 50);
    this.domH.push(document.getElementsByClassName("keji")[0].offsetTop - 50);
    console.log("tag", this.domH);
  },
  methods: {
    toast() {
      this.$toast("我是最帅的",1500);
    },
    tabchange(index) {
      this.current = index;
      if (index == 0) {
        document.documentElement.scrollTop = this.domH[0];
        console.log(document.documentElement.scrollTop);
      } else if (index == 1) {
        document.documentElement.scrollTop = this.domH[1];
        console.log(document.documentElement.scrollTop);
      } else if (index == 2) {
        document.documentElement.scrollTop = this.domH[2];
        console.log(document.documentElement.scrollTop);
      } else if (index == 3) {
        document.documentElement.scrollTop = this.domH[3];
        console.log(document.documentElement.scrollTop);
      } else if (index == 4) {
        document.documentElement.scrollTop = this.domH[4];
        console.log(document.documentElement.scrollTop);
      }
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      console.log(scrollTop);
      if (scrollTop < this.domH[1]) {
        this.current = 0;
      } else if (scrollTop < this.domH[2]) {
        this.current = 1;
      } else if (scrollTop < this.domH[3]) {
        this.current = 2;
      } else if (scrollTop < this.domH[4]) {
        this.current = 3;
      } else {
        this.current = 4;
      }
    },
    downs(){
      this.$router.push({
        path:'/down'
      })
    }
  }
};
</script>

<style lang="scss">
.home {
  width: 98%;
  .tiyu {
    .title {
      font-size: 20px;
      color: red;
      text-align: left;
    }
    .litem {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }
    .litem > img {
      width: 100px;
    }
  }
  .yule {
    .title {
      font-size: 20px;
      color: red;
      text-align: left;
    }
    .litem {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }
    .litem > img {
      width: 100px;
    }
  }
  .caij {
    .title {
      font-size: 20px;
      color: red;
      text-align: left;
    }
    .litem {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }
    .litem > img {
      width: 100px;
    }
  }
  .lishi {
    .title {
      font-size: 20px;
      color: red;
      text-align: left;
    }
    .litem {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }
    .litem > img {
      width: 100px;
    }
  }
  .keji {
    .title {
      font-size: 20px;
      color: red;
      text-align: left;
    }
    .litem {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }
    .litem > img {
      width: 100px;
    }
  }
}
</style>
