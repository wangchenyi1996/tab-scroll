<template>
  <div>
    <p class="p">I'm an O2man.</p>
    <p class="p">我是凹凸曼</p>
  </div>
</template>

<script>
export default {
  mounted() {
    const doms = document.getElementsByClassName("p");
    this.run(doms[0]);
  },
  methods: {
    run(dom) {
      dom.className += " active";
      setTimeout(() => {
        dom.className = "p";
      }, 3000);
    }
  }
};
</script>

<style lang="scss" scoped>
span {
  font-family: Monaco;
}
$main: #0066ff;
@mixin middle {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

@keyframes animate-x {
  0% {
    width: 0;
  }
}

@keyframes cursor-x {
  0% {
    border-color: $main;
  }
  50% {
    border-color: transparent;
  }
  100% {
    border-color: $main;
  }
}

@keyframes animate-y {
  0% {
    max-height: 0;
  }
  100% {
    max-height: 110px;
  }
}

@keyframes cursor-y {
  0% {
    background-color: curentColor;
  }
  50% {
    background-color: transparent;
  }
  100% {
    background-color: curentColor;
  }
}

div {
  text-align: center;
  @include middle;
  color: $main;
}

p {
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  width: 125px;
  font-family: Monaco;
  border-right: 1px solid transparent;
  &.active {
    animation: animate-x 3s 0s steps(13) 1 forwards,
      cursor-x 0.4s 0s linear infinite;
  }
  &:nth-child(2) {
    padding-bottom: 1px;
    width: 20px;
    white-space: normal;
    position: relative;
    text-align: center;
    margin: 0 auto;
    max-height: 0;
    animation: animate-y 1.6s 3s steps(5) 1 forwards;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      display: block;
      background: transparent;
      animation: cursor-y 0.4s 3s linear infinite;
    }
  }
}
</style>