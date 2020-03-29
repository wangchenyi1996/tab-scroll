<template>
  <div @click="handle">
    <h2>浪里行舟</h2>
    <child-com1
      :foo="foo"
      :boo="boo"
      :coo="coo"
      :doo="doo"
      title="前端工匠"
      class="abc"
      @change1="change1"
    ></child-com1>
  </div>
</template>
<script>
const childCom1 = () => import("@/components/attr_listener/childCom1.vue");
export default {
  components: { childCom1 },
  data() {
    return {
      foo: "Javascript",
      boo: "Html",
      coo: "CSS",
      doo: "Vue"
    };
  },
  mounted(){
    this.change1()
  },
  methods: {
    handle() {
      console.log('tag', 'handle')
    },
    change1(){
      console.log('tag', '父组件中非原生事件')
    }
  },
};
</script>
<style>
  .abc{
    color:red;
    font-size:20px;
  }
</style>