<template>
  <!-- <div id="video-container">
    <button @click="stop">停止</button>
  </div> -->
  <div>
    <h3><center>Html5 Api介绍使用</center></h3>
    <div class="notices">
      <button @click="joinFriend">有人想加你为好友</button>
      <p>{{ msg }}</p>
    </div>
    <button @click="getLine">获取网络状态</button>
    <button @click="getPosition">地理位置API</button>
    <input type="file" @change="upload" />
    <img :src="src" id="img" />
    <h3>radio和checkbox的自定义样式</h3>
    <p>原始的:</p>
    <div>
      <input type="radio" name="r0" checked />
      <input type="radio" name="r0" />
    </div>

    <div>
      <input type="checkbox" name="c0" />
      <input type="checkbox" name="c0" checked />
    </div>
    <p>自定义的:</p>
    <div class="dz-switch">
      <input type="radio" name="r1" checked />
      <input type="radio" name="r1" />
    </div>

    <div class="dz-switch">
      <input type="checkbox" name="c1" />
      <input type="checkbox" name="c1" checked />
    </div>

    <p>error:</p>
    <div class="dz-switch">
      <input class="error" type="radio" name="r2" checked />
      <input class="error" type="radio" name="r2" />
    </div>

    <div class="dz-switch">
      <input class="error" type="checkbox" name="c2" />
      <input class="error" type="checkbox" name="c2" checked />
    </div>
    <h3>web Workers</h3>
    <div style="margin-top: 10px; display: flex">
      <input
        type="number"
        placeholder="请输入"
        style="height: 35px; line-height: 35px"
        v-model="num"
      />
      <button @click="sends">发送</button>
      <button @click="stops">停止</button>
    </div>
    <h3>加密和解密使用</h3>
    <img src="@/assets/imgs/ctypto.png" />
    <h2>computed 使用</h2>
    <h3>1--循环</h3>
    <p v-for="(item, index) in a1" :key="item" @click="handle1(index)">
      {{ item }}
    </p>
    <h3>2--循环</h3>
    <p v-for="item in getFilterlist" :key="item" @click="handle2(item)">
      {{ item }}
    </p>
  </div>
</template>
<script>
// import EZUIKit from "ezuikit-js";
// 导入 crypto-js 包
import cryptoJS from "crypto-js/crypto-js";

import Worker from "../my.worker";
let worker = null;

export default {
  data() {
    return {
      msg: "",
      online: null,
      connection: null,
      src: "",
      allArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      a1: [1, 5, 9],
      num: null
    };
  },
  computed: {
    getFilterlist() {
      return this.allArr.filter((item) => {
        return this.a1.includes(item) === false;
      });
    },
  },
  mounted() {
    // this.player = new EZUIKit.EZUIKitPlayer({
    //   id: "video-container", // 视频容器ID
    //   accessToken:
    //     "at.3bvmj4ycamlgdwgw1ig1jruma0wpohl6-48zifyb39c-13t5am6-yukyi86mz",
    //   url: "ezopen://open.ys7.com/203751922/1.live",
    //   width: 300,
    //   height: 400,
    // });

     //子线程向主线程传递消息
    worker = new Worker();
    //监听子线程的message事件
    worker.addEventListener("message", function (e) {
      console.log("数据：", e.data);
    });

    window.addEventListener("online", (e) => {
      // console.log(e);
      this.getLine();
    });

    window.addEventListener("offline", (e) => {
      // console.log(e);
      this.getLine();
    });

    if (navigator.connection) {
      let timer = null;
      // 网络改变监听
      navigator.connection.addEventListener("change", (e) => {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
          this.updateConnectionStatus(e);
        }, 500);
      });
    }
  },
  methods: {
    stop() {
      this.player.stop();
    },
    sendWorkers(params) {
      console.log(params);
    },
    // web workers
    sends() {
      //向子线程发送message事件
      worker.postMessage(this.num);
    },
    stops() {
      //停止webworker
      worker.terminate();
    },

    // 网络改变监听
    updateConnectionStatus(e) {
      this.connection = navigator.connection || initConnection;
      console.log("当前网络：", e, e.currentTarget.type);
    },
    // 获取网络状态
    getLine() {
      this.online = navigator.onLine;
      console.log("网络状态：", this.online);
      if (this.online) {
        // console.log("有网啦❛‿˂̵✧");
      } else {
        // console.warn("掉线啦（>_<）...");
      }
    },
    // 通知
    popNotice() {
      if (window.Notification) {
        if (Notification.permission == "granted") {
          var notification = new Notification("Hi，帅哥：", {
            body: "可以加你为好友吗？",
            icon: "http://image.zhangxinxu.com/image/study/s/s128/mm1.jpg",
          });
          notification.addEventListener("click", (e) => {
            console.log(e);
            this.msg =
              "张小姐已于" +
              new Date().toTimeString().split(" ")[0] +
              "加你为好友！";
            notification.close();
          });

          notification.addEventListener("close", (e) => {
            console.log(e);
          });
        }
        console.log("通知：", notification);
      } else {
        alert("浏览器不支持Notification");
      }
    },
    // 加好友 点击触发通知
    joinFriend() {
      //用户已同意
      if (Notification.permission == "granted") {
        this.popNotice();
        //若没拒绝获取权限
      } else if (Notification.permission != "denied") {
        //向用户获取权限
        Notification.requestPermission((permission) => {
          this.popNotice();
        });
      }
    },
    // 获取地理定位信息
    getPosition() {
      if ("geolocation" in navigator) {
        let options = {
          enableHighAccuracy: true,
          maximumAge: 10 * 1000,
          timeout: 30 * 1000,
        };
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            //获取经纬度
            let center = [position.coords.longitude, position.coords.latitude];
            console.log("经纬度", center);
          },
          (err) => {
            console.log("错误：", err);
          },
          options
        );
      } else {
        alert("您的浏览器不支持定位");
      }
    },
    upload(event) {
      let file = event.target.files[0];
      //   转化成 bolb格式
      //   let blob = new Blob([file]);
      //   let url = URL.createObjectURL(blob);
      //   this.src = url;

      // 转化成base64格式
      //   let fileReader = new FileReader();
      //   let img = document.getElementById("img");
      //   fileReader.onload = function (e) {
      //     img.src = e.target.result;
      //   };
      //   fileReader.readAsDataURL(file);

      let blob = URL.createObjectURL(file);
      let img = document.getElementById("img");
      img.src = blob;
      img.onload = function (e) {
        URL.revokeObjectURL(this.src); //释放createObjectURL创建得对象
      };
    },

    // computed 相关
    // 删除
    handle1(index) {
      console.log(index);
      this.a1.splice(index, 1);
    },
    // 添加
    handle2(item) {
      this.a1.push(item);
    },
  },
};
</script>
<style lang='scss' scoped>
button {
  display: flex;
  flex-direction: column;
  margin: 10px;
}
$color-error: #f56c6c;
$color-black: #000;

.dz-switch {
  margin: 30px;
  font-size: 18px;
  input[type="radio"],
  input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    margin: -0.3em 0.25em 0 0;
    padding: 0;
    width: 1.6em;
    height: 1.6em;
    border: 1px solid #ccc;
    font-size: 0.9em;
    cursor: pointer;
    outline: none;
    transition: all 0.2s ease;
  }

  input[type="radio"] {
    border-radius: 50%;
  }

  input[type="radio"]:after {
    content: "";
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 50%;
    background: $color-black;
    border-radius: 50%;
    width: 0;
    height: 0;
    opacity: 0;
    transform: translate(-50%, -50%);
    transition: all 0.2s ease;
    transform-origin: center center;
    pointer-events: none;
  }

  input[type="radio"]:checked:after {
    width: 1em;
    height: 1em;
    opacity: 1;
  }

  input[type="checkbox"] {
    border-radius: 0.2em;
  }

  input[type="checkbox"]:after {
    content: "\2714";
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 50%;
    color: $color-black;
    font-size: 2.5em;
    font-family: meiryo, "sans-serif";
    opacity: 0;
    transition: all 0.1s ease;
    transform: translate(-50%, -50%) scale3d(0.2, 0.2, 1);
    transform-origin: center center;
  }

  input[type="checkbox"]:checked:after {
    opacity: 1;
    transform: translate(-50%, -50%) scale3d(1.2, 1.2, 1);
  }

  //error
  input[type="radio"].error {
    border: $color-error 1px solid;
  }

  input[type="radio"].error:after {
    background: $color-error;
  }

  input[type="checkbox"].error {
    border: $color-error 1px solid;
  }

  input[type="checkbox"].error:after {
    color: $color-error;
  }
}
</style>