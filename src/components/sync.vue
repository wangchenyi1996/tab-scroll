<template class="border">
  <div v-if="!isMuti">
    <div v-show="shows" style="margin:10px;border:1px solid red;width
    100px;height:100px;">
        测试sync的显示和隐藏
    </div>
    <button @click="changeShow" style="margin-bottom:1px;">子组件切换</button>
  </div>

  <div v-else>
      <p>姓名：{{ name }}-----年龄：{{ age }}</p>

      <button @click="changeSync">修改 .sync属性值</button>
  </div>
</template>
<script>
export default {
    props: {
        shows: {
            type: Boolean,
            default: false
        },
        // isMuti为true 表示多个.sync属性
        // isMuti为false 表示单个.sync属性
        isMuti:{
            type:Boolean,
            default:false
        },
        name:{
            type:String,
            default:''
        },
        age:{
            type:Number,
            default:0
        }
       
    },
    methods: {
        changeShow() {
            this.$emit('update:shows', !this.shows); //触发 事件，并传入新值
        },
        changeSync(){
            this.$emit('update:name', '王五')
            this.$emit('update:age', 20)
        }
    }
   
};
</script>