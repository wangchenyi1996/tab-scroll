<template>
  <div style="width:100%;">
    <div class="pic"></div>
    <div class="flex">
      <div class="card"></div>
      <div class="card"></div>
      <div class="card"></div>
      <div class="card"></div>
    </div>
    <transition-group
      name="more"
      v-bind:css="false"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
    >
      <template v-if="show3">
        <div class="item" v-for="item in list" :data-index="item" :key="item">
          <div class="square"></div>
          <div class="content">
            <div>123</div>
            <div>456</div>
          </div>
        </div>
      </template>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      show3: false,
    };
  },
  mounted() {
    for (let i = 1; i <= 10; i++) {
      this.list.push(i);
    }
    setTimeout(() => {
      this.show3 = !this.show3;
    }, 100);
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0;
    },
    enter(el, done) {
      console.log(el.dataset.index)
      let delay = el.dataset.index * 100;
      let animation =
        el.dataset.index % 2 == 0
          ? "one-in 0.4s infinite"
          : "two-in 0.4s infinite";
      setTimeout(() => {
        el.style.transition = "opacity 0.4s ";
        el.style.opacity = 1;
        el.style.animation = animation;
        el.style["animation-iteration-count"] = 1;
        done();
      }, delay);
    },
  },
};
</script>

<style lang="scss" scoped>
.pic {
  width: 97%;
  height: 120px;
  margin: 20px 5px;
  border-radius: 8px;
  background: #cae5e8;
}
.item {
  margin: 5px;
  padding: 0px;
  overflow: hidden;
}
.item div {
  display: inline;
  float: left;
}
.flex {
  display: flex;
  justify-content: space-between;
}
.card {
  width: 65px;
  height: 65px;
  margin: 15px 12px;
  margin-top: 0px;
  border-radius: 8px;
  background: #cae5e8;
}
.item::after {
  content: "";
  clear: both;
  display: block;
}
.square {
  width: 20%;
  height: 75px;
  background: #cae5e8;
  border-radius: 8px;
}
.content {
  width: 79%;
}
.content div {
  margin: 15px;
  margin-top: 0px;
  padding: 0px;
  width: 95%;
  border-radius: 8px;
  line-height: 30px;
  background: #99d1d3;
}
.content div:last-child {
  width: 65%;
  background: #cae5e8;
}
@keyframes one-in {
  from {
    padding-left: 100%;
    height: 0;
  }
  to {
    padding-left: 0%;
    height: 100px;
  }
}
@keyframes two-in {
  from {
    padding-right: 100%;
    padding-top: 100px;
    height: 0;
  }
  to {
    padding-right: 0%;
    padding-top: 0px;
    height: 100px;
  }
}
</style>