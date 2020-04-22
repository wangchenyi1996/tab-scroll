<template>
    <div>
        <p style="font-size:20px;margin:30px;"> 路由解耦模式：1、布尔模式</p>

        <p>id值：{{ $route.params.id }}</p>

        <p>name值：{{ $route.params.name }}</p>
    </div>
</template>

<script>
    export default {
        mounted(){
            console.log('route', this.$route)
        }
    }
</script>

<style scoped>

</style>