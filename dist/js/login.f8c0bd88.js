(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login"],{"4c84":function(e,n,t){},a827:function(e,n,t){"use strict";var r=t("4c84"),o=t.n(r);o.a},dc3f:function(e,n,t){"use strict";t.r(n);var r=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("page-login",{staticClass:"login"},[t("ul",{staticClass:"tab",class:e.type+"-tab"},[t("li",{class:{active:"user"==e.type},on:{click:function(n){return e.changeType("user")}}},[e._v(" 用户名登录 ")]),t("li",{class:{active:"verify-code"==e.type},on:{click:function(n){return e.changeType("verify-code")}}},[e._v(" 验证码登录 ")])]),t("form",{staticClass:"form-part",on:{keyup:function(n){return!n.type.indexOf("key")&&e._k(n.keyCode,"enter",13,n.key,"Enter")?null:(n.preventDefault(),e.handleSubmit(n))}}},[t("login-user",{directives:[{name:"show",rawName:"v-show",value:"user"==e.type,expression:"type == 'user'"}],ref:"login-user",attrs:{"error-info":e.errorInfo},on:{"form-value-change":e.handleCheckValue}}),t("login-verify-code",{directives:[{name:"show",rawName:"v-show",value:"verify-code"==e.type,expression:"type == 'verify-code'"}],ref:"login-verify-code",attrs:{"error-info":e.errorInfo},on:{"form-value-change":e.handleCheckValue}})],1),t("a",{staticClass:"sc-btn sc-btn-transform sc-btn-block login-submit",class:{disabled:!e.canSubmit},on:{click:e.handleSubmit}},[e._t("submitBtnName",[e._v("登录")])],2)])},o=[],a=(t("b0c0"),t("4ec9"),t("d3b7"),t("ac1f"),t("3ca3"),t("5319"),t("ddb0"),t("96cf"),t("1da1")),s=t("5530"),c=t("7ded"),i=t("4c6b"),u=t("5880"),l=t("6a1d"),f=t("c31a"),d=t.n(f),m=new Map([["user",{username:null,password:null}],["verify-code",{phone:null,code:null}]]),p={name:"Login",components:{"page-login":function(){return Promise.resolve().then(t.bind(null,"6a43"))},"login-user":function(){return t.e("login-user").then(t.bind(null,"6d55"))},"login-verify-code":function(){return t.e("login-verify-code").then(t.bind(null,"f6c8"))}},data:function(){return{type:"user",form:{},canSubmit:!1,errorInfo:{}}},methods:Object(s["a"])({},Object(u["mapActions"])("app",["getPermissionMenu"]),{changeType:function(e){this.type=e,this.canSubmit=this.$refs["login-"+this.type].canSubmit,this.form=this.$refs["login-"+this.type].form},handleCheckValue:function(e){var n=e.form,t=(e.errorInfo,e.canSubmit);this.$set(this,"form",n),this.canSubmit=t},handleSubmit:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function n(){var t,r,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(e.canSubmit){n.next=3;break}return n.abrupt("return");case 3:return t=e.$lodash.cloneDeep(e.form),t.password&&(t.password=d()(t.password)),n.next=7,Object(c["loginIn"])(Object(s["a"])({},t),{loading:!0});case 7:if(r=n.sent,!r||200!=r.code){n.next=20;break}return e.$message({message:"登录成功！",type:"success"}),Object(l["b"])("token",r.content.token,3),localStorage.setItem("token",r.content.token),localStorage.setItem("username",r.content.username),localStorage.setItem("name",r.content.name),localStorage.setItem("uid",r.content.id),n.next=17,e.getPermissionMenu();case 17:e.$router.replace({name:"home"}),n.next=21;break;case 20:r&&210==r.code&&(o={u001:"username",u002:"username",u003:"phone",u004:"code",u005:"code",u006:"password",u007:"code"},e.errorInfo=e.$lodash.cloneDeep(m.get(e.type)),e.$nextTick((function(){e.errorInfo[o[r.msg]]=i["p"].get(r.msg).text})));case 21:case"end":return n.stop()}}),n)})))()}})},h=p,b=(t("a827"),t("2877")),g=Object(b["a"])(h,r,o,!1,null,"da65d894",null);n["default"]=g.exports}}]);