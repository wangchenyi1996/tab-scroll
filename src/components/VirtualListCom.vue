<!--
 * @Description: 虚拟列表
 * @Version: 1.0
 * @Autor: 王强
 * @Date: 2020-06-11 16:20:38
 * @LastEditors: 王强
 * @LastEditTime: 2020-06-11 16:53:43
--> 
<template>
  <div>
    <button @click="add" class="btns">点击增加数据</button>
    <div class="container" ref="container">
      <div class="scroll-wrapper" :style="style">
        <div v-for="(item, index) in scrollList" :key="index" class="item">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => ["测试数据"]
    },
    startIndex: {
      type: Number,
      default: 0
    },
    endIndex: {
      type: Number,
      default: 60
    }
  },
  data() {
    return {
      list1: this.list,
      paddingTop: 0,
      paddingBottom: 0,
      allHeight: 0
    };
  },
  computed: {
    scrollList() {
      return this.list1.slice(this.startIndex, this.endIndex);
    },
    style() {
      return {
        paddingTop: this.paddingTop + "px",
        paddingBottom: this.paddingBottom + "px"
      };
    }
  },
  watch: {
    list1(val) {
      const valLen = val.length;
      this.allHeight = valLen * 30;
      // console.log(this.allHeight);
      // console.log(this.scrollList, this.scrollList.length * 30);
      this.paddingBottom = this.allHeight - this.scrollList.length * 30;
      // console.log(this.paddingBottom);
    }
  },
  mounted() {
    const container = this.$refs.container;
    container.addEventListener("scroll", () => {
      const top = container.scrollTop;
      this.startIndex = Math.floor(top / 30);
      this.endIndex = this.startIndex + 60;

      this.paddingTop = top;
      if (this.endIndex >= this.list1.length - 1) {
        this.paddingBottom = 0;
        return;
      }
      this.paddingBottom = this.allHeight - 600 - top;
      console.log(this.paddingBottom);
    });
  },
  methods: {
    add() {
      let arr = new Array(50000).fill(0);
      arr = arr.map((item, index) => {
        return "第" + index + "个";
      });
      this.list1 = [...this.list1, ...arr];
    }
  }
};
</script>

<style lang="scss" scoped>
.btns {
  width: 130px;
  height: 30px;
  line-height: 30px;
  border: none;
  font-size: 16px;
  background-color: skyblue;
  color: #fff;
  margin-top: 10px;
}
.container {
  width: 300px;
  height: 600px;
  overflow: auto;
  border: 1px solid;
  margin: 10px auto;
}
.item {
  height: 29px;
  line-height: 30px;
  border-bottom: 1px solid #aaa;
  padding-left: 20px;
}
</style>