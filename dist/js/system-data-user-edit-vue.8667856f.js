(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["system-data-user-edit-vue"],{"8c6e":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("drawer-right",{staticClass:"role-edit",attrs:{title:"用户"+e.action.title,width:"600px","submit-func":e.handleSubmit},on:{open:e.init,cancel:function(t){return e.$router.back()}}},[r("el-form",{ref:"form",staticClass:"form-drawer",attrs:{rules:e.rules,model:e.form,"label-width":"120px"},nativeOn:{submit:function(e){e.preventDefault()},keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleSubmit(t)}}},[r("el-form-item",{staticClass:"block",attrs:{label:"账号",prop:"username",rules:[{required:!0,message:"请输入账号"},e.$tools.formRules.username,e.$tools.formRules.repeatCheck({value:e.form.name,id:e.form.id,module:"user",field:"username"})]}},[r("el-input",{attrs:{placeholder:"请输入3-20位，字母与数字组合的字符"},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}})],1),r("el-form-item",{staticClass:"block",attrs:{label:"姓名",prop:"name"}},[r("el-input",{attrs:{placeholder:"请输入真实姓名"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),r("el-form-item",{staticClass:"block",attrs:{label:"手机号",prop:"phone",rules:[{required:!0,message:"请输入手机号"},e.$tools.formRules.phone,e.$tools.formRules.repeatCheck({value:e.form.name,id:e.form.id,module:"user",field:"phone"})]}},[r("el-input",{attrs:{placeholder:"请输入11位手机号"},model:{value:e.form.phone,callback:function(t){e.$set(e.form,"phone",t)},expression:"form.phone"}})],1),r("el-form-item",{staticClass:"block",attrs:{label:"角色",prop:"role_ids"}},[r("select-remote",{attrs:{multiple:"",label:e.form.role_names,"api-key-obj":{type:"role",funcName:"remoteSelectSearch"}},model:{value:e.form.role_ids,callback:function(t){e.$set(e.form,"role_ids",t)},expression:"form.role_ids"}})],1)],1)],1)},a=[],o=(r("d81d"),r("b0c0"),r("96cf"),r("1da1")),s=r("5530"),l=r("c24f"),i={username:"",name:"",phone:"",roles:[],role_ids:[],role_names:[]},u={create:{title:"新建",type:"create",submitFunc:l["create"]},update:{title:"修改",type:"update",submitFunc:l["update"]}},c={name:"UserEdit",data:function(){return{action:u.create,form:this.$lodash.cloneDeep(i),rules:{name:[{required:!0,message:"请输入姓名"},this.$tools.formRules.name],role_ids:[{required:!0,message:"请选择角色"}]}}},watch:{"$route.query.id":{handler:function(e){this.action=e||0===e?Object(s["a"])({},u.update,{id:e}):u.create},immediate:!0}},methods:{init:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if("create"!==e.action.type){t.next=4;break}e.form=e.$lodash.cloneDeep(i),t.next=14;break;case 4:if("update"!==e.action.type){t.next=14;break}return t.next=7,Object(l["detailSearch"])({id:e.action.id},{loading:!0});case 7:if(r=t.sent,200===r.code){t.next=11;break}return e.form=e.$lodash.cloneDeep(i),t.abrupt("return");case 11:r.content.role_ids=r.content.roles.map((function(e){return e.id})),r.content.role_names=r.content.roles.map((function(e){return e.name})),e.form=r.content;case 14:case"end":return t.stop()}}),t)})))()},handleSubmit:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r,n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$refs.form.validate();case 3:if(r=t.sent,r){t.next=6;break}return t.abrupt("return");case 6:return n={username:e.form.username,name:e.form.name,phone:e.form.phone,role_ids:JSON.stringify(e.form.role_ids)},"update"===e.action.type&&(n.id=e.action.id),t.next=10,e.action.submitFunc(n,{loading:!0});case 10:if(a=t.sent,200===a.code){t.next=13;break}return t.abrupt("return");case 13:e.$message({message:"".concat(e.action.title,"成功！"),type:"success",containerType:"drawer",onClose:function(){e.$router.back()}}),t.next=19;break;case 16:return t.prev=16,t.t0=t["catch"](0),t.abrupt("return",t.t0);case 19:case"end":return t.stop()}}),t,null,[[0,16]])})))()}}},m=c,d=r("2877"),f=Object(d["a"])(m,n,a,!1,null,null,null);t["default"]=f.exports}}]);