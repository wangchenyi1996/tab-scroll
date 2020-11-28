<template>
  <div class="border">
    <p>boo: {{ boo }}</p>
    <p>coo: {{ coo }}</p>
    <p>childCom2: {{ $attrs }}</p>
    <child-com3 v-bind="$attrs" v-on="$listeners"></child-com3>
  </div>
</template>
<script>
const childCom3 = () => import("@/components/attr_listener/childCom3.vue");
export default {
  components: {
    childCom3
  },
  inheritAttrs: false,
  props: {
    boo: String,
    coo: String,
  },
  created() {
    // console.log(this.$attrs); // { "boo": "Html", "coo": "CSS", "doo": "Vue", "title": "前端工匠" }
     console.log('listeners2',this.$listeners); 
    //  this.$listeners.change2()
    //  this.$listeners.click()
    this.$emit('change2')
    this.$emit('click')
  }

};
</script>