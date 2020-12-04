<template>
  <div>
    <h1>vue 实现 单选 多选 反选 全选 全不选</h1>
    <p>单选框</p>
    <ul>
      <li
        v-for="(item, index) in radioList"
        :key="index"
        :class="selectedNum == index ? 'active' : ''"
        @click="select(index)"
      >
        {{ item }}
      </li>
    </ul>

    <p>多选框</p>
    <ul>
      <li
        v-for="(item, index) in checkboxList"
        :key="item"
        :class="checkbox.includes(index) ? 'active' : ''"
        @click="check(index)"
      >
        {{ item }}
      </li>
    </ul>
    <button @click="letsGetThisFuckingCheck">
      {{ isCheckAll ? "取消全选" : "选择全部" }}
    </button>
    <button @click="checkOpposite">反选</button>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      selectedNum: "",
      radioList: ["某个元素", "某个元素", "某个元素", "某个元素", "某个元素"],
      checkbox: [],
      checkboxList: [
        "某个元素",
        "某个元素",
        "某个元素",
        "某个元素",
        "某个元素",
        "某个元素",
        "某个元素",
      ],
    };
  },

  computed: {
    //判断是否全部选中
    isCheckAll() {
      if (this.checkbox.length == this.checkboxList.length) {
        return true;
      }
      return false;
    }
  },

  methods: {
    //单选
    select(i) {
      this.selectedNum = i;
    },
    //多选
    check(i) {
      var idx = this.checkbox.indexOf(i);
      //如果已经选中了，那就取消选中，如果没有，则选中
      if (idx > -1) {
        this.checkbox.splice(idx, 1);
      } else {
        this.checkbox.push(i);
      }
    },

    letsGetThisFuckingCheck() {
      if (this.isCheckAll) {
        this.clearCheckbox();
      } else {
        this.checkAll();
      }
    },
    //选中全部
    checkAll() {
      var len = this.checkboxList.length;
      this.checkbox = [];
      for (var i = 0; i < len; i++) {
        this.checkbox.push(i);
      }
    },
    //清空选择
    clearCheckbox() {
      this.checkbox = [];
    },
    //反选
    checkOpposite() {
      var len = this.checkboxList.length;
      var idx;
      for (var i = 0; i < len; i++) {
        idx = this.checkbox.indexOf(i);
        //已经选中的删去，没选中的加进去
        if (idx > -1) {
          this.checkbox.splice(idx, 1);
        } else {
          this.checkbox.push(i);
        }
      }
    },
  },
};
</script>
<style scoped>
h1{
  text-align: center;
}
li {
  display: inline-block;
  font-size: 16px;
  padding: 5px;
  background-color: #e6e6e6;
  margin: 5px 10px;
  cursor: pointer;
}
.active {
  border: 2px solid red;
}
</style>