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

    <p style="margin:30px auto;color:red;">测试.sync</p>
    <syncCom :shows.sync='shows' />

    <button @click="changeValue" style="margin-bottom:50px;">父组件切换</button>


    <vmodelCom v-model="title"/>


  </div>
</template>
<script>
const childCom1 = () => import("@/components/attr_listener/childCom1.vue");
const syncCom = () => import("@/components/sync.vue");
const vmodelCom = () => import("@/components/v_models.vue");
export default {
  components: { childCom1,syncCom,vmodelCom },
  data() {
    return {
      foo: "Javascript",
      boo: "Html",
      coo: "CSS",
      doo: "Vue",
      shows:true,
      title:'1111111'
    };
  },
 
  methods: {
    changeValue(){
      this.shows = !this.shows
    },
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