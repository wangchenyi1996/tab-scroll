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