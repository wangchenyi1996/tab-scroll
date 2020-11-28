<template>
  <div>
    <s-identify :identifyCode="identifyCode"></s-identify>
    <button @click="refreshCode">点击切换验证码</button>
    <hr />
    <h3>滑动验证</h3>
    <slide-verify
      ref="slideblock"
      @again="onAgain"
      @fulfilled="onFulfilled"
      @success="onSuccess"
      @fail="onFail"
      @refresh="onRefresh"
      :accuracy="accuracy"
      :slider-text="text"
    ></slide-verify>
    <div>{{ msg }}</div>

    <button @click="handleClick">在父组件可以点我刷新哦</button>
  </div>
</template>

<script>
import SIdentify from "@/components/Identify.vue";

export default {
  name: "Verifity",
  data() {
    return {
      makeCode: "",
      identifyCode: "",
      // 滑动相关
      msg: '',
      text: '向右滑',
      // 精确度小，可允许的误差范围小；为1时，则表示滑块要与凹槽完全重叠，才能验证成功。默认值为5
      accuracy: 1,
    };
  },
  components: {
    "s-identify": SIdentify,
  },
  mounted() {
    this.makeIdentifyCode({ randomTypeLen: true });
  },
  methods: {
    /**
     * 随机生成一个0~9之间的数
     */
    randomNum() {
      return Math.floor(Math.random() * 10);
    },

    /**
     * 随机生成一个字母
     * @param {boolean} isUupper 生成大写字母
     */
    randomAlphabet({ isUupper = false } = {}) {
      // a的Unicode值为97,z的Unicode值为123
      const alphabet = String.fromCharCode(Math.floor(Math.random() * 25) + 97);
      if (!isUupper) {
        return alphabet;
      } else {
        return alphabet.toUpperCase();
      }
    },

    /**
     * 生成图片验证码
     * @param {number} length 图片验证码位数
     * @param {boolean} typeMix 数字和字母混合
     * @param {string} pureNumber 纯数字('number')或者字母('alphabet')
     * @param {boolean} randomTypeLen 随机生成类型个数组合
     * @param {boolean} capsLookMix 字母大小写混合
     * @param {number} numLength 混合类型下的数字个数
     * @param {number} uupperLength 大写字母的个数
     */
    makeIdentifyCode({
      length = 4,
      typeMix = true,
      pureNumber = "alphabet",
      randomTypeLen = false,
      capsLookMix = false,
      numLength = 2,
      uupperLength = 1,
    } = {}) {
      this.makeCode = "";
      // 数字和字母混合
      if (typeMix) {
        // 随机生成类型个数组合
        if (randomTypeLen) {
          // 字母大小写混合
          if (capsLookMix) {
            const numLength = Math.floor(Math.random() * length) + 1;
            const uupperLength =
              numLength === length
                ? 0
                : Math.floor(Math.random() * (length - numLength)) + 1;
            for (let i = 0; i < numLength; i++) {
              this.makeCode += this.randomNum();
            }
            for (let i = 0; i < uupperLength; i++) {
              this.makeCode += this.randomAlphabet({ isUupper: true });
            }
            if (numLength + uupperLength < length) {
              for (let i = 0; i < length - numLength - uupperLength; i++) {
                this.makeCode += this.randomAlphabet();
              }
            }
          } else {
            const numLength = Math.floor(Math.random() * length) + 1;
            for (let i = 0; i < numLength; i++) {
              this.makeCode += this.randomNum();
            }
            if (numLength < length) {
              for (let i = 0; i < length - numLength; i++) {
                this.makeCode += this.randomAlphabet();
              }
            }
          }
        } else {
          // 字母大小写混合
          if (capsLookMix) {
            const tempNumLength =
              numLength < 0 ? 2 : numLength > length ? 2 : numLength;
            const tempUupperLength =
              uupperLength < 0
                ? 1
                : uupperLength > length - tempNumLength
                ? 1
                : uupperLength;
            for (let i = 0; i < tempNumLength; i++) {
              this.makeCode += this.randomNum();
            }
            for (let i = 0; i < tempUupperLength; i++) {
              this.makeCode += this.randomAlphabet({ isUupper: true });
            }
            if (tempNumLength + tempUupperLength < length) {
              for (
                let i = 0;
                i < length - tempNumLength - tempUupperLength;
                i++
              ) {
                this.makeCode += this.randomAlphabet();
              }
            }
          } else {
            const tempNumLength =
              numLength < 0 ? 2 : numLength > length ? 2 : numLength;
            for (let i = 0; i < tempNumLength; i++) {
              this.makeCode += this.randomNum();
            }
            if (tempNumLength < length) {
              for (let i = 0; i < length - tempNumLength; i++) {
                this.makeCode += this.randomAlphabet();
              }
            }
          }
        }
      } else {
        // 纯数字('number')
        if (pureNumber === "number") {
          for (let i = 0; i < length; i++) {
            this.makeCode += this.randomNum();
          }
        }
        // 纯字母('alphabet')
        if (pureNumber === "alphabet") {
          // 字母大小写混合
          if (capsLookMix) {
            const tempUupperLength =
              uupperLength < 0 ? 1 : uupperLength > length ? 1 : uupperLength;
            for (let i = 0; i < tempUupperLength; i++) {
              this.makeCode += this.randomAlphabet({ isUupper: true });
            }
            if (tempUupperLength < length) {
              for (let i = 0; i < length - tempUupperLength; i++) {
                this.makeCode += this.randomAlphabet();
              }
            }
          } else {
            for (let i = 0; i < length; i++) {
              this.makeCode += this.randomAlphabet();
            }
          }
        }
      }
      this.shuffle(this.makeCode);
    },

    /**
     * 图片验证码随机排序
     * @param {string} str 图片验证码
     */
    shuffle(str) {
      this.identifyCode = [...str].sort(() => Math.random() - 0.5).join("");
      console.log("验证码：", this.identifyCode);
    },

    /**
     * 更换图片验证码
     */
    refreshCode() {
      this.makeIdentifyCode({ randomTypeLen: true });
    },

    /**
     * 滑动验证相关
     */
    onSuccess(times){
        console.log('验证通过，耗时 '+ times + '毫秒');
        this.msg = `login success, 耗时${(times / 1000).toFixed(1)}s`
    },
    onFail(){
        console.log('验证不通过');
        this.msg = ''
    },
    onRefresh(){
        console.log('点击了刷新小图标');
        this.msg = ''
    },
    onFulfilled() {
        console.log('刷新成功啦！');
    },
    onAgain() {
        console.log('检测到非人为操作的哦！');
        this.msg = 'try again';
        // 刷新
        this.$refs.slideblock.reset();
    },
    handleClick() {
      // 父组件直接可以调用刷新方法
        this.$refs.slideblock.reset();
    }

  },
};
</script>