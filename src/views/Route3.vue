<template>
    <div>
        <p style="font-size:20px;margin:30px;"> 路由解耦模式：3、函数模式</p>

        <p>id值：{{ id }}</p>

        <p>name值：{{ name }}</p>
    </div>
</template>

<script>
    export default {
        props:['name','id'],
        mounted(){
            console.log('route', this.$route)
        }
    }
</script>

<style scoped>

</style>