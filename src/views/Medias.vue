<template>
  <div>
    <div class="box">
      <!-- pc端： 
      1:打开二维码登录网页index.html 
      2:index.html调用GetQrCodeServlet
      3:GetQrCodeServlet干2件事
      　　a:生成随机的uuid,是一个唯一标识，该标识贯穿整个流程
      　　b:生成二维码图片，二维码信息：http://xx.xx.xx.xx:8080/QrCodeLoginPro/Login.html?uuid="
      + uuid 
      4:index页面展示二维码
      5:index页面调用LongConnectionCheckServlet进行长连接轮询操作，参数为uuid
      6:LongConnectionCheckServlet只干1件事
      　　a:拿到uuid后循环检查loginUserMap中uuid是否不为null。
      7:如果为null则代表没有登录，index.html将继续进行轮询 　　
      ps: LongConnectionCheckServlet 一个长连接请求检测登录状态 　　　　
      loginUserMap 是一个静态的map结构的登录池，uuid为key , 登录信息为value 
      
      手机端：
      1:扫描pc端的二维码 2:打开二维码中的网页
      http://xx.xx.xx.xx:8380/QrCodeLoginPro/Login.html?uuid=" + uuid
      3:登录，将uname upwd uuid 传递给登录程序PhoneLoginServlet
      4:PhoneLoginServlet干2件事 　　
          a:检测登录
      　　b:登录成功后将登录信息插入到loginUserMap中去，uuid为key 
      pc端：
      　　1:继续轮询检测uuid中是否为null
      　　2:登录后的uuid中就不为null了，此时LongConnectionCheckServlet停止循环，返回登录状态。 -->
    </div>
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

.box::after {
  content: "";
  position: absolute;
  border: 1px solid orangered;
  top: 0;
  left: 0;
  border-radius: 4px;
  -webkit-transform: scale(0.5, 0.5);
  transform: scale(0.5, 0.5);
}

// 根据设备 像素比来表示 1px border
@media screen and (-webkit-min-device-pixel-ratio: 2) {
  .box::after {
     width: 200%;
    height: 200%;
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