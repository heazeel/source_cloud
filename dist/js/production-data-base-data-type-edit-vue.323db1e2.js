(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["production-data-base-data-type-edit-vue"],{"128b":function(e,t,n){"use strict";n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return c})),n.d(t,"b",(function(){return i}));var r=n("0d5e"),a=function(e,t){return Object(r["get"])("/dev/parts/type/search",e,t)},c=function(e,t){return Object(r["post"])("/dev/parts/type/create",e,t)},i=function(e,t){return Object(r["post"])("/dev/parts/type/delete",e,t)}},a908:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("drawer-right",{staticClass:"type-edit",attrs:{size:"mini",title:"类别"+e.action.title,"submit-func":e.handleSubmit},on:{open:e.init,cancel:function(t){return e.$router.back()}}},[n("el-form",{ref:"form",staticClass:"form-drawer",attrs:{model:e.form,"label-width":"90px"},nativeOn:{submit:function(e){e.preventDefault()},keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleSubmit(t)}}},[n("el-form-item",{attrs:{label:"类别",prop:"name",rules:[{required:!0,message:"请输入类别名称"},e.$tools.formRules.repeatCheck({value:e.form.name,module:"parttype",field:"name"})]}},[n("el-input",{attrs:{placeholder:"请输入类别名称"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1)],1)],1)},a=[],c=(n("b0c0"),n("96cf"),n("1da1")),i=n("5530"),u=n("128b"),o={create:{title:"新建",type:"create",submitFunc:u["a"]}},s={name:null},l={name:"DroneEdit",data:function(){return{action:o.create,form:this.$lodash.cloneDeep(s)}},watch:{"$route.query.id":{handler:function(e){this.action=e||0===e?Object(i["a"])({},o.update,{id:e}):o.create},immediate:!0}},methods:{init:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:"create"===e.action.type&&(e.form=e.$lodash.cloneDeep(s));case 1:case"end":return t.stop()}}),t)})))()},handleSubmit:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var n,r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$refs.form.validate();case 3:if(n=t.sent,n){t.next=6;break}return t.abrupt("return");case 6:return r={name:e.form.name},"update"===e.action.type&&(r.id=e.action.id),t.next=10,e.action.submitFunc(r,{loading:!0});case 10:if(a=t.sent,200===a.code){t.next=13;break}return t.abrupt("return");case 13:e.$message({message:"".concat(e.action.title,"成功！"),type:"success",containerType:"drawer",onClose:function(){e.$router.back()}}),t.next=19;break;case 16:return t.prev=16,t.t0=t["catch"](0),t.abrupt("return",t.t0);case 19:case"end":return t.stop()}}),t,null,[[0,16]])})))()}}},d=l,p=n("2877"),m=Object(p["a"])(d,r,a,!1,null,null,null);t["default"]=m.exports}}]);