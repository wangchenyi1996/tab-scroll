(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Index"],{"8fc1":function(o,t,n){"use strict";var e=n("9272"),i=n.n(e);i.a},9272:function(o,t,n){},d504:function(o,t,n){"use strict";n.r(t);var e=function(){var o=this,t=o.$createElement,n=o._self._c||t;return n("div",[n("child-com1",o._g({staticClass:"abc",attrs:{foo:o.foo,boo:o.boo,coo:o.coo,doo:o.doo,title:"前端工匠"},on:{change1:o.change1}},o.$listeners)),n("p",{staticStyle:{margin:"10px auto",color:"red"}},[o._v("测试.sync")]),n("syncCom",{attrs:{shows:o.shows,isMuti:!1},on:{"update:shows":function(t){o.shows=t}}}),n("p",{staticStyle:{color:"red","font-size":"20px",margin:"10px"}},[o._v("shows:"+o._s(o.shows))]),n("button",{staticStyle:{"margin-bottom":"10px"},on:{click:o.changeValue}},[o._v("父组件切换")]),n("syncCom",o._b({attrs:{isMuti:!0}},"syncCom",o.objData,!1,!0)),n("button",{staticStyle:{"margin-bottom":"10px"},on:{click:o.muti}},[o._v("测试多个.sync属性")]),n("p",{staticStyle:{color:"red","font-size":"20px",margin:"20px"}},[o._v("自定义组件中：v-model使用")]),n("hr"),n("p",[o._v("注意事项：自定义组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件")]),n("p",{staticStyle:{color:"red","font-size":"20px",margin:"20px"}},[o._v(" 父组件： title:"+o._s(o.title))]),n("vmodelCom",{model:{value:o.title,callback:function(t){o.title=t},expression:"title"}}),n("p",{staticStyle:{color:"green","font-size":"20px"}},[o._v("测试is属性--使用keep-alive可以保持页面缓存")]),n("keep-alive",[n(o.showOne,{tag:"component"})],1),n("button",{on:{click:o.changIS}},[o._v("切换is属性")])],1)},i=[],s=(n("d3b7"),function(){return n.e("chunk-2d20fae6").then(n.bind(null,"b552"))}),c=function(){return n.e("chunk-2d2382c6").then(n.bind(null,"fdf8"))},l=function(){return n.e("chunk-2d2259e5").then(n.bind(null,"e4bb"))},a=function(){return n.e("chunk-2d0a403e").then(n.bind(null,"0547"))},u=function(){return n.e("chunk-2d0f11b0").then(n.bind(null,"9ee3"))},h={components:{childCom1:s,syncCom:c,vmodelCom:l,tisCom11:a,tisCom22:u},data:function(){return{foo:"Javascript",boo:"Html",coo:"CSS",doo:"Vue",shows:!0,title:"我是张三",showOne:"tisCom11",objData:{name:"张三",age:18}}},created:function(){this.$on("hook:mounted",(function(){console.log("监听子组件的mounted")}))},methods:{handleMounted:function(){console.log("我是父组件的mounted")},muti:function(){this.objData={name:"李四",age:28}},changeValue:function(){this.shows=!this.shows},handle:function(){console.log("tag","handle")},change1:function(){console.log("父页面","父组件中非原生事件1")},changIS:function(){"tisCom11"==this.showOne?this.showOne="tisCom22":this.showOne="tisCom11"}}},r=h,d=(n("8fc1"),n("2877")),m=Object(d["a"])(r,e,i,!1,null,null,null);t["default"]=m.exports}}]);