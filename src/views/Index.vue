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

    <vmodelCom v-model="title" />

    <p style="color:green;font-size:20px;">测试is属性</p>
    <component  :is="showOne"></component> 
    <button @click="changIS">切换is属性</button> 

  </div>
</template>
<script>
const childCom1 = () => import("@/components/attr_listener/childCom1.vue");
const syncCom = () => import("@/components/sync.vue");
const vmodelCom = () => import("@/components/v_models.vue");
const tisCom11 = () => import("@/components/isCom/isCom1.vue");
const tisCom22 = () => import("@/components/isCom/isCom2.vue");

export default {
  components: { childCom1,syncCom,vmodelCom,tisCom11,tisCom22},
  data() {
    return {
      foo: "Javascript",
      boo: "Html",
      coo: "CSS",
      doo: "Vue",
      shows:true,
      title:'1111111',
      showOne:'tisCom11'
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
    },
    changIS(){
      if(this.showOne=='tisCom11'){
          this.showOne='tisCom22'
      }else{
        this.showOne='tisCom11'
      }
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