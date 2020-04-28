<template class="border">
    <div>
        子组件:value-{{value}}
        <!-- <input @input="handleInput" v-model="tempValue"/> -->
        <input v-model="tempValue" placeholder="请输入..." @input="handleInput"/>
        <button @click="handleInput">设置值</button>
    </div>
</template>
<script>
export default {
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            tempValue: ''
        }
    },
    methods: {
       handleInput(){
            this.$emit('input', this.tempValue); //触发 input 事件，并传入新值
       }
    }
   
};
</script>