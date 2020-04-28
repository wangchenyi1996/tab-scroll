<template class="border">
    <div style="color:red;font-size:20px;">
       isCom1组件<br />
       <input type="text" placeholder="请输入" v-model="test">
    </div>
</template>
<script>
export default {
    name:'isCom1',
    data() {
        return {
            test: ''
        }
    },
};
</script>