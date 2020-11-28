<template>
    <div>
        <p style="font-size:20px;margin:30px;"> 路由解耦模式：2、对象模式</p>

        <p>id值：{{ $route.params.id }}</p>

        <p>name值：{{ name }}</p>
    </div>
</template>

<script>
    export default {
        props:['name'],
        mounted(){
            console.log('route', this.$route)
        }
    }
</script>

<style scoped>

</style>