<template>
  <div >
    <child-com1
      :foo="foo"
      :boo="boo"
      :coo="coo"
      :doo="doo"
      title="前端工匠"
      class="abc"
      @change1="change1"
      v-on="$listeners"
     
    ></child-com1>
     <!-- @hook:mounted="handleMounted"  -->

    <p style="margin:10px auto;color:red;">测试.sync</p>
    <!-- 单个属性 .sync-->
    <syncCom :shows.sync='shows' :isMuti="false"/>
    <p style="color:red;font-size:20px;margin:10px;">shows:{{shows}}</p>
    <button @click="changeValue" style="margin-bottom:10px;">父组件切换</button>

     <!-- 多个属性 .sync
     <child  v-bind.sync = “{name:'张三',age:18}”></child>  
      (不能写成  :.sync="{name:'张三',age:18}"，否则会报错的)
      这样会把 "{name:'张三',age:18}" 对象中的每一个 property (如 name) 都作为一个独立的 prop 传进去，然后各自添加用于更新的 v-on 监听器。
    -->
    <syncCom v-bind.sync='objData' :isMuti="true"/>
     <button @click="muti" style="margin-bottom:10px;">测试多个.sync属性</button>

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
      showOne:'tisCom11',
      objData:{
        name:'张三',
        age:18
      }
    };
  },
  created() {
    // 监听子组件的mounted
    this.$on('hook:mounted',()=>{
      console.log('监听子组件的mounted')
    }) 
  },
 
  methods: {
    // 监听子组件的mounted
    handleMounted(){
      console.log('我是父组件的mounted')
    },

    //多个 .sync属性
    muti(){
      this.objData = {
        name:'李四',
        age:28
      }
    },

    //单个 .sync属性
    changeValue(){
      this.shows = !this.shows
    },
    handle() {
      console.log('tag', 'handle')
    },
    change1(){
      console.log('父页面', '父组件中非原生事件1')
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