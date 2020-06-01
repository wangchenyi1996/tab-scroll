<!--
 * @Description: 个人中心常见的布局--凹凸样式
 * @Version: 1.0
 * @Autor: 王强
 * @Date: 2020-05-14 14:40:11
 * @LastEditors: 王强
 * @LastEditTime: 2020-05-29 09:04:53
--> 
<template>
	<div>
		<div class="style-1">
			<div>
				<div style="font-size: 32px;color: #fff;text-align: center;padding-top: 120rpx;">
          <p v-for="item in 6" :key="item">骚代码写在这里</p>
        </div>
			</div>
		</div>
		
		<div style="height: 100px;"></div>
		
		<div class="style-2">
			<div style="font-size: 32px;color: #fff;text-align: center;padding-top: 120rpx;">骚代码写在这里</div>
		</div>
		
		<div style="height: 100px;"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.style-1 {
	width: 375px;
	height:375px;
	overflow: hidden;
	position: relative;
	
	&::after{
		content: '';
		display: block;
		border-radius: 50%;
		position: absolute;
		z-index: 1;
		width: 200%;
		height: 110%;
		bottom: 0;
		left: -50%;
		background-color: #8d58fc;
		background-image: linear-gradient(to top right, #5876fc, #8d58fc);
	}
	
	>div{
		position: absolute;
		z-index: 2;
		width: 100%;
		height: 100%;
	}
}

.style-2 {
	width: 375px;
	height: 375px;
	overflow: hidden;
	position: relative;
	background-color: #8d58fc;
	background-image: linear-gradient(to top right, #5876fc, #8d58fc);
	
	&::after{
		content: '';
		display: block;
		border-radius: 50%;
		position: absolute;
		z-index: 1;
		width: 200%;
		height: 110%;
		bottom: -102%;
		left: -50%;
		background-color: #fff;
	}
}
</style>
