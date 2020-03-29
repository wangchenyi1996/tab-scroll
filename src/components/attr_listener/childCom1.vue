<template class="border">
  <div>
    <p>foo: {{ foo }}</p>
    <p>childCom1的$attrs: {{ $attrs }}</p>
    <child-com2 v-bind="$attrs" @change2="change2"></child-com2>
  </div>
</template>
<script>
const childCom2 = () => import("./childCom2.vue");
export default {
  components: {
    childCom2
  },
  inheritAttrs: false, // 可以关闭自动挂载到组件根元素上的没有在props声明的属性
  props: {
    foo: String ,// foo作为props属性绑定
  },
  created() {
    console.log(this.$attrs); // { "boo": "Html", "coo": "CSS", "doo": "Vue", "title": "前端工匠" }
    console.log('listeners',this.$listeners); 
    // this.change1()
  }, 
  methods: {
    change1(){
      console.log('tag', '父组件中非原生事件')
    },
    change2(){
      console.log('tag', '父组件中非原生事件')
    }
  },
};
</script>