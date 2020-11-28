<template class="border">
    <div>
        <!--方式一 -->
        <input placeholder="请输入..." :value="text" @input="$emit('change',$event.target.value)"  />

        <!-- 方式二 -->
        <input placeholder="请输入..." :value="text" @input="handleInput"  />
    </div>
</template>
<script>
export default {
    // 注意事项： model.prop.text 要和 props里面的 text一致
    // model.prop.event 要和 $emit事件一致
    model:{
        prop:'text',
        event:'change'
    },
    props: {
        text: {
            type: String,
            default: ''
        }
    },
    methods: {
       handleInput(e){
            this.$emit('change', e.target.value); //触发 input 事件，并传入新值
       }
    }
   
};
</script>