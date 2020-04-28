<template>
  <div @click="handle">
    <child-com1
      :foo="foo"
      :boo="boo"
      :coo="coo"
      :doo="doo"
      title="前端工匠"
      class="abc"
      @change1="change1"
    ></child-com1>

    <p style="margin:10px auto;color:red;">测试.sync</p>
    <syncCom :shows.sync='shows' />

    <p style="color:red;font-size:20px;margin:10px;">shows:{{shows}}</p>

    <button @click="changeValue" style="margin-bottom:10px;">父组件切换</button>

    <p style="color:red;font-size:20px;margin:20px;">自定义组件中：v-model使用</p><hr />
    <p>注意事项：自定义组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件</p>
    <p style="color:red;font-size:20px;margin:20px;"> 父组件： title:{{title}}</p>
    <vmodelCom v-model="title" />


    <p style="color:green;font-size:20px;">测试is属性--使用keep-alive可以保持页面缓存</p>

    <keep-alive>
      <component  :is="showOne"></component> 
    </keep-alive>

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
      title:'我是张三',
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
    color:skyblue;
    font-size:14px;
  }
</style>