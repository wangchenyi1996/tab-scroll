<template>
  <div class="border">
    <p>childCom3: {{ $attrs }}</p>
  </div>
</template>
<script>
export default {
  props: {
    coo: String,
    title: String
  },
  created(){
    console.log('listeners3',this.$listeners); 
  }
};
</script>