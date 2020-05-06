<template>
  <div>
    <div class="box"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.box {
  width: 100px;
  height: 100px;
  position: relative;
}
/*当屏幕小于400px屏幕样式*/
// @media screen and (max-width:400px){
// 	.box{
// 		background-color: yellow;
// 	};
// }
// /*当屏幕大于400px 小于 1200px 屏幕样式*/
// @media screen and (min-width:400px) and (max-width:1200px) {
// 	.box{
// 		background-color: red;
// 	};
// }

.box::after{
    border: 1px solid orangered;
    content: '';
    width: 200%;
    height: 200%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 4px;
    -webkit-transform: scale(0.5,0.5);
    transform: scale(0.5,0.5);
    
}

// 根据设备 像素比来表示 1px border
@media screen and (-webkit-min-device-pixel-ratio: 2) {
  .box::after {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }
}
@media screen and (-webkit-min-device-pixel-ratio: 3) {
  .box::after {
       width: 300%;
            height: 300%;
    -webkit-transform: scale(0.333333);
    transform: scale(0.333333);
  }
}
</style>