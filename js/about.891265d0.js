(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"1d1c":function(t,e,o){var n=o("23e7"),r=o("83ab"),c=o("37e8");n({target:"Object",stat:!0,forced:!r,sham:!r},{defineProperties:c})},"4de4":function(t,e,o){"use strict";var n=o("23e7"),r=o("b727").filter,c=o("d039"),s=o("1dde"),u=s("filter"),a=u&&!c((function(){[].filter.call({length:-1,0:1},(function(t){throw t}))}));n({target:"Array",proto:!0,forced:!u||!a},{filter:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}})},"7a82":function(t,e,o){var n=o("23e7"),r=o("83ab"),c=o("9bf2");n({target:"Object",stat:!0,forced:!r,sham:!r},{defineProperty:c.f})},dbb4:function(t,e,o){var n=o("23e7"),r=o("83ab"),c=o("56ef"),s=o("fc6a"),u=o("06cf"),a=o("8418");n({target:"Object",stat:!0,sham:!r},{getOwnPropertyDescriptors:function(t){var e,o,n=s(t),r=u.f,i=c(n),f={},l=0;while(i.length>l)o=r(n,e=i[l++]),void 0!==o&&a(f,e,o);return f}})},e439:function(t,e,o){var n=o("23e7"),r=o("d039"),c=o("fc6a"),s=o("06cf").f,u=o("83ab"),a=r((function(){s(1)})),i=!u||a;n({target:"Object",stat:!0,forced:i,sham:!u},{getOwnPropertyDescriptor:function(t,e){return s(c(t),e)}})},f820:function(t,e,o){"use strict";o.r(e);var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"about"},[o("p",[t._v("vuex测试")]),o("br"),o("hr"),o("br"),o("p",[t._v("Token:"+t._s(t.token))]),t._v(" "),o("br"),o("p",[t._v("Count:"+t._s(t.count))]),t._v(" "),o("br"),o("p",[t._v("userinfo:"+t._s(t.userinfo))]),t._v(" "),o("br"),o("button",{on:{click:t.getData}},[t._v("获取模块数据")]),o("button",{on:{click:t.updateToken}},[t._v("刷新token值")]),o("button",{on:{click:t.updateUser}},[t._v("修改用户信息")]),o("br"),o("p",[t._v("action")]),o("p",[t._v("测试数据："+t._s(t.comTest))]),o("button",{on:{click:t.test}},[t._v("action")]),o("hr"),o("p",[t._v("provide / inject 使用")]),o("br"),o("br"),o("p",[t._v(t._s(t.users))]),o("button",{staticStyle:{"margin-top":"50px"},on:{click:t.handleReload}},[t._v("点击刷新")])])},r=[];o("a4d3"),o("4de4"),o("4160"),o("1d1c"),o("7a82"),o("e439"),o("dbb4"),o("b64b"),o("159b");function c(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}var s=o("5880");function u(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,n)}return o}function a(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?u(Object(o),!0).forEach((function(e){c(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):u(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}var i={name:"about",inject:{reload:{from:"reload",default:function(){}},users:{from:"userInfo1",defalut:function(){}},foo:{from:"foo"}},computed:a({},Object(s["mapState"])({token:function(t){return t.token},count:function(t){return t.user.count},userinfo:function(t){return t.user.userinfo}}),{},Object(s["mapGetters"])({comCount:"user/getCountValue",comUserInfo:"user/getUserInfo",comTest:"user/getTestData",getToken:"getToken"})),mounted:function(){console.log("执行刷新操作"),console.log("count值:",this.comCount),console.log("用户信息：",this.comUserInfo),console.log("Token信息：",this.getToken)},methods:a({},Object(s["mapActions"])({testData:"user/testAction"}),{getData:function(){console.log("tag",this.$store.state.token),console.log("tag",this.$store.state.user),this.$store.commit("user/addCount",10)},updateToken:function(){this.$store.commit("updateToken","80336D5736BF685223289B752163877C27C53B0D")},updateUser:function(){this.$store.commit("user/updateUser",{name:"李四",age:"108"})},test:function(){this.testData(["123","456","789"])},handleReload:function(){this.reload()}})},f=i,l=o("2877"),b=Object(l["a"])(f,n,r,!1,null,null,null);e["default"]=b.exports}}]);