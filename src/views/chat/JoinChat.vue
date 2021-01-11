<!--
 * @Description: 加入聊天
 * @Version: 1.0
 * @Autor: 王强
 * @Date: 2020-06-16 10:35:33
 * @LastEditors: 王强
 * @LastEditTime: 2020-06-16 11:50:48
--> 
<template>
  <div class="content">
    <div class="title">欢迎进入聊天室</div>
    <div class="head" @click="modify">
      <img :src="require('@/assets/imgs/images/'+nowimg+'.png')" class="head-img"/>
      <img src="@/assets/imgs/down.png" class="down" />
    </div>
    <input
      type="text"
      class="user"
      placeholder="请取一个名字"
      v-model="name"
      placeholder-style="color:#999;font-weight:400;font-size:16px"
    />
    <div class="join" @click="submit">加入</div>

    <div class="modify" :style="{bottom:bootom+'px'}">
      <div class="modfiy-mian">
        <div v-for="(e,index) in img" :key="index" class="us-img" @click="selected(index)">
          <img :src="require('@/assets/imgs/images/'+e.i+'.png')" style="height:40px;width:40px;border-radius:20px;"/>
          <div class="dd">
            <div class="ddd" :style="{opacity:e.x}"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg" @click="modify" :style="{display:bg}"></div>
  </div>
</template>

<script>
// 表情包
import emojiJson from '@/assets/emoji';
console.log(emojiJson.data.split(','))

export default {
  data() {
    return {
      name: "",
      nowimg: "a",
      bb: false,
      bg: "none",
      bootom:-400,
      img: [
        { i: "a", x: 1 },
        { i: "b", x: 0 },
        { i: "c", x: 0 },
        { i: "d", x: 0 },
        { i: "e", x: 0 },
        { i: "f", x: 0 },
        { i: "g", x: 0 },
        { i: "h", x: 0 },
        { i: "i", x: 0 },
        { i: "j", x: 0 },
        { i: "k", x: 0 },
        { i: "l", x: 0 },
        { i: "m", x: 0 },
        { i: "n", x: 0 },
        { i: "o", x: 0 },
        { i: "p", x: 0 },
        { i: "q", x: 0 },
        { i: "r", x: 0 },
        { i: "s", x: 0 },
        { i: "t", x: 0 }
      ]
    };
  },
  methods: {
    modify: function() {
      this.bb = !this.bb;
      if (this.bb) {
        this.bg = "block";
        this.bootom = 0
      } else {
        this.bg = "none";
        this.bootom = -400
      }
    },
    selected: function(index) {
      for (let i = 0; i < this.img.length; i++) {
        this.img[i].x = 0;
      }
      this.img[index].x = 1;
      this.nowimg = this.img[index].i;
    },
    submit: function() {
      if (this.name.length > 0) {
        var mesg = {
          name: this.name,
          img: this.nowimg
        };
        // console.log(mesg)
         this.$router.push({
          path: `/chat/${this.name}/${this.nowimg}`,
        })
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: rgba(255, 131, 60, 1);
  line-height:25px;
  padding-bottom: 60px;
}
.head {
  width: 72px;
  height: 72px;
  position: relative;
  .head-img {
    width: 72px;
  height: 72px;
    border-radius: 50%;
  }
  .down {
    position: absolute;
    opacity: 0.6;
    right: -24px;
    top: 24px;
    width:24px;
    height:24px;
  }
}
.user {
  margin-top: 20px;
  padding: 0 12px;
  width: 250px;
  height: 48px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 12px;
  text-align: center;
  font-size: 18px;
  outline: none;
  border: none;
}
.join {
  margin-top: 90px;
  width: 100px;
  height: 100px;
  background: rgba(255, 131, 60, 1);
  box-shadow: 0px 18px 34px -4px rgba(255, 131, 60, 0.5);
  border-radius: 50%;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  line-height: 100px;
  color: rgba(255, 255, 255, 1);
}
.modify {
  position: fixed;
  left: 0;
  bottom: -400px;
  width: 100%;
//   height: 400px;
  z-index: 1000;
  background: #fff;
  border-radius: 24px 24px 0px 0px;
  transition: bottom 0.6s;
}
.modfiy-mian {
  padding: 40px 18px;
  flex-direction: row;
  display: flex;
  flex-wrap: wrap;
  .us-img {
    flex: auto;
    width: 20%;
    text-align: center;
    margin: 8px 0;
    image {
      width: 40px;
      height: 40px;
      border-radius: 4px;
    }
    .ddd {
      display: inline-block;
      justify-content: center;
      width: 8px;
      height: 8px;
      background: rgba(255, 131, 60, 1);
      border-radius: 50%;
    }
  }
}
.bg {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>