<template>
  <div class="btn" @click="handlelike">点赞</div>
</template>

<script>
var count = 0;
export default {
  data() {
    return {
      count: 0,
    };
  },

  methods: {
    handlelike() {
      const likeDom = document.createElement("div");
      count++;
      likeDom.className = count % 2 === 0 ? "like" : "like like--is-second";
      likeDom.style.willChange = "margin-top";
      document.body.appendChild(likeDom);
      setTimeout(() => {
        document.body.removeChild(likeDom);
      }, 3900);
    },
  },
};
</script>

<style lang="scss">
@mixin middle {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

@keyframes animation-y {
  0% {
    transform: translate(-50%, 100px) scale(0);
  }
  50% {
    transform: translate(-50%, -100px) scale(1.5);
  }
  100% {
    transform: translate(-50%, -300px) scale(1.5);
  }
}

@keyframes animation-x {
  0% {
    margin-left: 0px;
  }
  25% {
    margin-left: 25px;
  }
  75% {
    margin-left: -25px;
  }
  100% {
    margin-left: 0px;
  }
}

.like {
  @include middle;
  width: 25px;
  height: 25px;
  pointer-events: none;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  // background-image: url(https://img14.360buyimg.com/ling/jfs/t1/134959/40/26/8929/5ec79d68E968b0377/aa4feff2b7bcf231.png);
  background-image: url("../../assets/imgs/good1.png");
  animation: animation-x 3s 0s linear infinite, animation-y 4s 0s linear 1;
  &--is-second {
    // background-image: url(https://img14.360buyimg.com/ling/jfs/t1/134906/37/26/9080/5ec79d5dE90e5f972/bc39e647c61c8bab.png);
    background-image: url("../../assets/imgs/good2.png");
    animation: animation-x 3s -2s linear infinite, animation-y 4s 0s linear 1;
  }
}
.btn {
  @include middle;
  top: 80%;
  user-select: none;
  width: 50px;
  line-height: 50px;
  background: #0066ff;
  color: #fff;
  text-align: center;
  border-radius: 50%;
  box-shadow: 0 0 10px #999;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 1;
  }
}
</style>