<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: 王强
 * @Date: 2020-05-13 12:05:47
 * @LastEditors: 王强
 * @LastEditTime: 2020-05-20 15:56:40
--> 
<template>
    <div>
        
        <slot name="todo" :user1="user" :test1="test">
            {{ user.lastName }}
        </slot> 
    </div>
</template>
<script>
export default {
    name:'slotCom2',
    data() {
    return {
      user:{
        lastName:"qiang",
        firstName:"wang"
      },
      test:[1,2,3,4,5,6]
    }
  },
};
</script>
<style>
</style>