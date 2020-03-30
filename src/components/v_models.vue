<template class="border">
    <div>
        value:{{value}}
        <!-- <input @input="handleInput" v-model="tempValue"/> -->
        <input v-model="tempValue"/>
        <button @click="handleInput">按钮</button>
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
            tempValue: '默认值'
        }
    },
    methods: {
       handleInput(){
            this.$emit('input', this.tempValue); //触发 input 事件，并传入新值
       }
    }
   
};
</script>