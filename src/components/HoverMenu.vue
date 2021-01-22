<!--
 * @Description: 悬浮菜单组件
 * @Version: 1.0.0
-->
<template>
	<div class="menu-content">
		<img class="menu icon" @click="handleShow" :class="{ menuOpen: openFlag }" src="@/assets/menu/menu.png" />
		<img class="icon" :class="{ 'open open1': openFlag }" src="@/assets/menu/bg.png" />
		<img class="icon" :class="{ 'open open2': openFlag }" src="@/assets/menu/pic.png" />
		<img class="icon" :class="{ 'open open3': openFlag }" src="@/assets/menu/text.png" />
		<img class="icon" :class="{ 'open open4': openFlag }" src="@/assets/menu/save.png" />
		<img class="icon" :class="{ 'open open5': openFlag }" src="@/assets/menu/save.png" />
	</div>
</template>

<script>
export default {
	data() {
		return {
			openFlag: false //是否展开菜单
		};
	},
	methods: {
		handleShow() {
			this.openFlag = !this.openFlag;
		}
	}
};
</script>

<style lang="scss" scoped>
.menu-content {
	.icon {
		position: fixed;
		bottom: 90px;
		right: 40px;
		width: 40px;
		height: 40px;
		opacity: 0;
		transform: rotate(0deg);
		transition: all 0.5s ease-out 0s;
	}
	.menu {
		z-index: 1;
		opacity: 1;
	}
	.menuOpen {
		transform: rotate(180deg);
		animation-fill-mode: forwards;
		transition: all 0.5s ease-out 0s;
	}
	.open {
		opacity: 1;
		transform: rotate(360deg);
		animation-fill-mode: forwards;
		transition: all 0.5s ease-out 0s;
	}
	.open1 {
		right: 40px;
		bottom: 175px;
	}

	.open2 {
		right: 95px;
		bottom: 140px;
	}
	.open3 {
		right: 125px;
		bottom: 85px;
	}
	.open4 {
		right: 90px;
		bottom: 35px;
	}
	.open5 {
		right: 40px;
		bottom: 5px;
	}
}
</style>
