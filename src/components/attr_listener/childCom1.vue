<template class="border">
  <div>
    <p>foo: {{ foo }}</p>
    <p>childCom1的$attrs: {{ $attrs }}</p>
    <child-com2 v-bind="$attrs" @change2="change2" v-on="$listeners" @test1="test1" @click.native="clickHandle"></child-com2>

    <!-- 
      inheritAttrs：默认值true,继承所有的父组件属性（除props的特定绑定）作为普通的HTML特性应用在子组件的根元素上，
      如果你不希望组件的根元素继承特性设置inheritAttrs: false,但是class属性会继承（简单的说，inheritAttrs：true 继承除props之外的所有属性；inheritAttrs：false 只继承class属性）

      $attrs--继承所有的父组件属性（除了prop传递的属性、class 和 style ），一般用在子组件的子元素上，如第一个例子的<input v-bind="$attrs"/>
      
      $listeners--属性，它是一个对象，里面 包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器，你就可以配合 v-on="$listeners" 将所有的事件监听器指向这个组件的某个特定的子元素。（相当于子组件继承父组件的事件）
     -->


  </div>
</template>
<script>

const childCom2 = () => import("./childCom2.vue");
export default {
  components: {
    childCom2
  },
  inheritAttrs: false, // 可以关闭自动挂载到组件根元素上的没有在props声明的属性
  props: {
    foo: String ,// foo作为props属性绑定
  },
  created() {
    // console.log(this.$attrs); // { "boo": "Html", "coo": "CSS", "doo": "Vue", "title": "前端工匠" }
    console.log('listeners1',this.$listeners); 

    //父组件的chang1 事件
    // this.$listeners.change1()
    //也可以像下面这样使用
    this.$emit('change1')
  }, 
  methods: {
    change2(){
      console.log('tag2', '父组件中非原生事件2')
    },
    test1(){
      console.log('tag3', 'test1 事件')
    },
    clickHandle(){
       console.log('tag4', 'click 事件')
    }
  },
};
</script>