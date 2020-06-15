<!--
 * @Description: 聊天
 * @Version: 1.0
 * @Autor: 王强
 * @Date: 2020-06-15 09:08:01
 * @LastEditors: 王强
 * @LastEditTime: 2020-06-15 16:26:35
--> 
<template>
  <div style="width:100%;height:100%;" ref="chatMain">
    <p class="p1">聊天-socket</p>

    <div class="chat-list" style="padding-top: 50px;padding-bottom:70px;">
      <div class="chat-item" v-for="item in msgList" :key="item.id">
        <p v-if="item.isJoin" class="times">{{ item.name }}</p>
        <div v-else>
          <p class="times">{{ item.times }}</p>
          <!-- 自己发的消息 -->
          <div class="left" v-if="item.isOwn">
            <div class="c-item u-f">
              <img :src="item.img" alt="face" />
              <div class="contents u-f-c u-f-jsb">
                <span class="names">{{ item.name }}</span>
                <div class="txt">{{ item.content }}</div>
              </div>
            </div>
          </div>
          <!-- 别人发的消息 -->
          <div class="right" v-else>
            <div class="c-item u-f-r2">
              <img :src="item.img" alt="face" />
              <div class="contents u-f-c u-f-jsb">
                <span class="names">{{ item.name }}</span>
                <div class="txt">{{ item.content }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="chats">
      <input type="text" placeholder="请输入消息内容" v-model="inputValue" v-on:keyup.enter="submit" />
      <button class="send-btn" @click="submit">发送消息</button>
    </div>
  </div>
</template>

<script>
// 人性化时间
import { fnFormatTimeHeader } from "@/config/mUtils.js";
export default {
  data() {
    return {
      top: 0,
      key: 1,
      inputValue: "",
      img: "http://lc-3resYveE.cn-n1.lcfile.com/77b5a9e6ebeb6cddd527/tou6.jpg",
      name: "王菲",
      content: "你好呀，我是王菲",
      //   msgList: []
      msgList: [
        {
          id: 0,
          name: "欢迎 谢霆锋 加入群聊",
          isJoin: true
        },
        {
          id: 1,
          name: "张三",
          content:
            "不要争了，我才是最帅的,不要争了，不要争了，我才是最帅的,不要争了，我才是最帅的不要争了，我才是最帅的,不要争了，我才是最帅的我才是最帅的",
          isOwn: true,
          times: new Date().getTime() - 10 * 60 * 1000,
          img: require("../../assets/imgs/faces/1.1.png"),
          isJoin: false
        },
        {
          id: 2,
          name: "李四",
          content: "你不是最帅的",
          isOwn: false,
          times: new Date().getTime(),
          img: require("../../assets/imgs/faces/1.2.png"),
          isJoin: false
        },
        {
          id: 3,
          name: "王五",
          content: "不要争了，我才是最帅的,不要争了，我才是最帅的",
          isOwn: false,
          times: new Date().getTime() - 20 * 600 * 1000,
          img: require("../../assets/imgs/faces/1.3.png"),
          isJoin: false
        },
        {
          id: 4,
          name: "王大五",
          content: "不要争了，我才是最帅的,不要争了，我才是最帅的",
          isOwn: true,
          times: new Date().getTime() - 7 * 60 * 1000,
          img: require("../../assets/imgs/faces/1.6.png"),
          isJoin: false
        },
        {
          id: 6,
          name: "王大五",
          content: "不要争了，我才是最帅的,不要争了，我才是最帅的",
          isOwn: true,
          times: new Date().getTime() - 4 * 60 * 1000,
          img: require("../../assets/imgs/faces/1.6.png"),
          isJoin: false
        },
        {
          id: 5,
          name: "王qq",
          content: "不要争了，我才是最帅的",
          isOwn: true,
          times: new Date().getTime() - 28 * 3600 * 1000,
          img: require("../../assets/imgs/faces/1.8.png"),
          isJoin: false
        }
      ]
    };
  },
  created() {
    // console.log('socket信息：',this.socket)
    this.handleTimeFormat();
    this.join(this.name, this.img, this.content);
    this.welcome();
    this.quit();
    this.receiveMsg();
  },
  mounted() {
    this.back();
  },
  methods: {
    back() {
      this.$nextTick(() => {
        this.top = this.$refs.chatMain.clientHeight;
        console.log(this.top);
        window.scroll({ top: this.top + 100, left: 0, behavior: "smooth" });
      });
    },
    // 处理时间
    handleTimeFormat() {
      this.msgList.forEach(item => {
        if (typeof item.times === "number") {
          item.times = fnFormatTimeHeader(item.times);
        }
      });
    },
    //加入群
    join(name, img, content) {
      this.socket.emit("join", name, img, content);
    },
    //广播-欢迎加入群
    welcome() {
      //获取即时信息渲染
      this.socket.on("welcome", (name, users) => {
        // console.log(name,users)
        //插入欢迎信息
        let wel = {
          name: "欢迎 " + name + " 加入群聊",
          isJoin: true
        };
        this.msgList.push(wel);
      });
    },
    //退出群提醒
    quit() {
      //获取即时信息渲染
      this.socket.on("quit", (name, users) => {
        //插入退出信息
        let wel = {
          name: name + " 退出群聊",
          isJoin: true
        };
        this.msgList.push(wel);
        // console.log('退出群聊的用户信息：',users)
      });
    },
    // 发送消息
    submit() {
      if (this.inputValue.length) {
        let data = {
          id: parseInt(this.msgList.length + 1) * 2,
          name: "张三" + parseInt(this.msgList.length + 1) * 2,
          content: this.inputValue,
          isOwn: this.inputValue.length % 2 === 0 ? true : false,
          times: new Date().getTime(),
          img:
            this.inputValue.length % 2
              ? require("../../assets/imgs/faces/1.6.png")
              : require("../../assets/imgs/faces/1.8.png"),
          isJoin: false
        };
        console.log(data.img);
        this.msgList.push(data);
        this.handleTimeFormat();
        this.inputValue = ""; //清空
        this.socket.emit("message", data);
        this.key++;
      }
      this.$nextTick(() => {
        this.back();
      });
    },
    //获取消息
    receiveMsg() {
      //获取即时信息渲染
      this.socket.on("sendMsg", data => {
        this.msgList.push(data);
        this.handleTimeFormat();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.chats {
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  bottom: 0px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px 0;
  input {
    height: 35px;
    line-height: 35px;
    flex: 3;
    background-color: #f5f5f5;
    outline: none;
    padding-left: 10px;
    border: none;
    margin-left: 15px;
    border-radius: 4px;
  }
  .send-btn {
    margin: 0 15px;
    flex: 1;
    height: 35px;
    line-height: 35px;
    font-size: 16px;
    background-color: cadetblue;
    color: #fff;
    border: none;
    border-radius: 10px;
    outline: none;
  }
}
.p1 {
  position: fixed;
  top: 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  background-color: rgba(221, 96, 23, 0.8);
  z-index: 99;
}
.scroll-wrapper {
  height: calc(100% - 60px);
}
.chat-item {
  width: 100%;
  .times {
    font-size: 14px;
    color: #999;
    margin: 10px 0;
    text-align: center;
  }
  .left {
    width: 100%;
    font-size: 14px;
    .c-item {
      //   width: 100%;
      margin: 10px;
      box-sizing: border-box;
      img {
        height: 50px;
        width: 50px;
        margin-right: 15px;
      }
      .contents {
        max-width: 70%;
        .names {
          font-size: 14px;
          color: #999;
          margin-bottom: 10px;
        }
        .txt {
          background-color: #fff;
          padding: 6px 10px;
          box-sizing: border-box;
          border-radius: 6px;
          line-height: 25px;
          position: relative;
          &::before {
            position: absolute;
            content: "";
            width: 0;
            height: 0;
            border-width: 7px 10px;
            border-style: solid;
            border-color: transparent #fff transparent transparent;
            top: 15%;
            left: -20px;
          }
        }
      }
    }
  }

  .right {
    font-size: 14px;
    .c-item {
      //   width: 100%;
      margin: 10px;
      box-sizing: border-box;
      img {
        height: 50px;
        width: 50px;
        margin-right: 20px;
        margin-left: 10px;
      }
      .contents {
        max-width: 70%;
        .names {
          font-size: 14px;
          color: #999;
          margin-bottom: 10px;
          text-align: right;
        }
        .txt {
          background-color: #fff;
          padding: 6px 10px;
          box-sizing: border-box;
          border-radius: 6px;
          line-height: 25px;
          position: relative;
          &::after {
            position: absolute;
            content: "";
            width: 0;
            height: 0;
            border-width: 7px 10px;
            border-style: solid;
            border-color: transparent transparent transparent #fff;
            top: 15%;
            right: -20px;
          }
        }
      }
    }
  }
}
</style>