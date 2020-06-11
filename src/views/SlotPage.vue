<template>
    <div>
       <!-- 方法1 -->
       <slotCom1>
           <div slot="left" style="color:green;">我是左边</div>
            <div slot="right" style="color:blue;">我是右边</div>
       </slotCom1>

       <!-- 方法2推荐使用 -->
       <slotCom1>
           <!-- <template v-slot:left>
               <div  style="color:green;">我是左边</div>
            </template> -->
            <template #left>
               <div  style="color:red;">我是左边</div>
            </template>
            <template v-slot:right >
                <div style="color:yellow;">我是右边</div>
            </template>
       </slotCom1>

        <!-- 作用域插槽 -->
        <!-- slotProps 可以随意命名 -->
        <!-- slotProps 接取的是子组件标签slot上属性数据的集合所有v-bind:user="user" -->
       
        <slotCom2>
            <template v-slot:todo="slotProps" >
                <!-- {{slotProps.user1.firstName}} -->
                <!-- {{slotProps.user1.lastName}} -->
                 <p style="margin:20px 0;">作用域插槽</p>
                <ul>
                    <li v-for="item in slotProps.test1" :key="item" style="color:red;font-size:20px;margin-bottom:20px;">
                        {{item}}
                    </li>
                </ul>
            </template> 

        </slotCom2>

         <slotCom2>
             <template #todo="{test1}" >
                <p>解构插槽</p>
                <ul>
                    <li v-for="item in test1" :key="item" style="color:red;font-size:20px;margin-bottom:20px;">
                        {{item}}
                    </li>
                </ul>
            </template> 
        </slotCom2>
       
    </div>
</template>
<script>
const slotCom1 = () => import("@/components/slots/slotCom1.vue");
const slotCom2 = () => import("@/components/slots/slotCom2.vue");
export default {
    components: {
        slotCom1,slotCom2
    },
};
</script>
<style>
   
</style>