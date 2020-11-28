<template>
  <div>
    <p>1 、定时器 传递参数</p>
    <p>{{ obj.name }} -- {{ obj.age }}</p>

    <p @click="handleEvent">2 、触发自定义事件</p>
    <p>{{ users }}</p>
    <audio id="audio"></audio>
    <audio controls="controls">您的浏览器不支持播放音频文件</audio>
    <input @click="start()" type="button" value="开始" />
    <input @click="stop()" type="button" value="结束" />

    <h3>pointer-enent  上传文件</h3>
    <div class="ups">
      <input type="file" @change="upFile" accept=".jpg,.png">
      <span>上传图片</span>
    </div>
  </div>
</template>

<script>
let recorder;
export default {
  name: "Events",
  data() {
    return {
      obj: {},
      users: {},
    };
  },
  mounted() {
    setTimeout(this.test, 200, "我是张三", "今年10岁");
    this.customEvents();
  },
  methods: {
    // 定时器 加参数
    test(a, b) {
      this.$nextTick(() => {
        this.$set(this.obj, "name", a);
        this.$set(this.obj, "age", b);
        // console.log(this.obj)
      });
    },
    //自定义事件
    customEvents() {
      this.myEvent = new CustomEvent("cstEvent", {
        // 将需要传递的数据写在detail中，以便在EventListener中获取,数据将会在event.detail中得到
        detail: {
          name1: "张三",
          age1: 18,
        },
      });
      console.log("tag1", this.myEvent.detail); //传递的数据
      console.log("tag2", this.myEvent.type); //自定义事件名称
    },
    //触发事件
    handleEvent() {
      //假设listener注册在window对象上
      window.addEventListener("cstEvent", (event) => {
        // console.log('得到数据为：', event.detail);
        this.$nextTick(() => {
          this.users = event.detail;
        });
        //可以进行后续操作...
      });
      if (window.dispatchEvent) {
        window.dispatchEvent(this.myEvent);
      } else {
        window.fireEvent(this.myEvent);
      }
    },
    // 录音相关
    start() {
      let videoTarget = document.getElementById("audio");
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: { width: 400, height: 600 } })
        .then((stream) => {
          recorder = new MediaRecorder(stream);
          videoTarget.srcObject = stream;
          videoTarget = (...arg) => {
            console.log(arg);
          };
          recorder.ondataavailable = (event) => {
            let url = URL.createObjectURL(event.data);
            let link = document.createElement("a");
            link.target = "_blank";
            link.href = url;
            link.click();
          };
          recorder.start();
        });
    },

    stop() {
      recorder.stop();
    },
    upFile(e){
      console.log(e.target.files[0])
    }
  },
};
</script>

<style scoped lang='scss'>
p {
  margin: 10px auto;
}
.ups{
  position: relative;
  input[type='file']{
    color: #fff;
    height: 38px;
  }
  span{
    display: inline-block;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: skyblue;
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
  }
}
</style>