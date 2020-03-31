<template>
    <div class="nav">
        <div><slot name="left"></slot></div>
        <div><slot name="right"></slot></div>
    </div>
</template>
<script>
export default {
    name:'slotCom1'
};
</script>
<style>
    .nav{
        font-size:20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        margin-top: 30px;
        margin-bottom: 50px;
    }
</style>