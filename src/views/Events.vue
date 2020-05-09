<template>
    <div>
        <p>1 、定时器 传递参数</p>
        <p>{{ obj.name }} -- {{ obj.age }}</p>

        <p @click="handleEvent">2 、触发自定义事件</p>
        <p>{{ users }}</p>

    </div>
</template>

<script>
    export default {
        name:'Events',
        data(){
            return{
                obj:{},
                users:{}
            }
        },
        mounted(){
            
            setTimeout(this.test,200,'我是张三','今年10岁')
            this.customEvents()
        },
        methods: {
            // 定时器 加参数
            test(a,b){
                this.$nextTick(()=>{
                    this.$set(this.obj,'name',a)
                    this.$set(this.obj,'age',b)
                    // console.log(this.obj)
                })
            },
            //自定义事件
            customEvents(){
                this.myEvent = new CustomEvent('cstEvent', {
                     // 将需要传递的数据写在detail中，以便在EventListener中获取,数据将会在event.detail中得到
                    detail:{
                        name1:'张三',
                        age1:18
                    }
                });
                console.log('tag1', this.myEvent.detail)     //传递的数据
                console.log('tag2', this.myEvent.type)       //自定义事件名称
                
            },
            //触发事件
            handleEvent(){
                //假设listener注册在window对象上
                window.addEventListener('cstEvent', (event)=>{
                    // console.log('得到数据为：', event.detail);
                   this.$nextTick(()=>{
                        this.users = event.detail
                   })
                    //可以进行后续操作...
                });
                if(window.dispatchEvent) {  
                    window.dispatchEvent(this.myEvent);
                } else {
                    window.fireEvent(this.myEvent);
                }
            }
        },
    }
</script>

<style scoped>
p{
    margin:10px auto;
}
</style>