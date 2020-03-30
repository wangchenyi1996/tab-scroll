<template class="border">
  <div>
    <div v-show="shows" style="margin:30px;border:1px solid red;width
    100px;height:100px;">
        测试sync的显示和隐藏
    </div>
    <button @click="changeShow" style="margin-bottom:40px;">子组件切换</button>
  </div>
</template>
<script>
export default {
    props: {
        shows: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        changeShow() {
            this.$emit('update:shows', !this.shows); //触发 事件，并传入新值
        }
    }
   
};
</script>