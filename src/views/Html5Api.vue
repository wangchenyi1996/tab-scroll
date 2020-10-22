<template>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "",
      online: null,
      connection: null,
      src: "",
    };
  },
  mounted() {
    window.addEventListener("online", (e) => {
      console.log(e);
      this.getLine();
    });

    window.addEventListener("offline", (e) => {
      console.log(e);
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