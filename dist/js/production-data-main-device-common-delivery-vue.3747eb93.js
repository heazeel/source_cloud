(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["production-data-main-device-common-delivery-vue"],{d62c:function(e,r,t){"use strict";t.r(r);var a=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("dialog-sc",{ref:"delivery",staticClass:"delivery",attrs:{size:"small",title:"交付"},on:{cancel:function(r){return e.$router.back()},submit:e.handleSubmit}},[t("el-form",{ref:"form",staticClass:"form-dialog",attrs:{model:e.form,rules:e.rules,"label-width":"100px"}},[t("el-form-item",{staticClass:"block",attrs:{prop:"company_id",label:"所属企业"}},[t("select-remote",{attrs:{placeholder:"企业","api-key-obj":{type:"delivery",funcName:"remoteSelectSearch"}},model:{value:e.form.company_id,callback:function(r){e.$set(e.form,"company_id",r)},expression:"form.company_id"}})],1)],1)],1)},n=[],i=(t("a9e3"),t("96cf"),t("1da1")),o=t("05e2"),c={name:"Delivery",data:function(){return{form:{company_id:null},rules:{company_id:[{required:!0,message:"请选择企业"}]}}},methods:{handleSubmit:function(){var e=this;this.$refs.form.validate(function(){var r=Object(i["a"])(regeneratorRuntime.mark((function r(t){var a,n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(t){r.next=2;break}return r.abrupt("return");case 2:return a={device_type:e.$route.query.device_type,device_id:Number(e.$route.query.device_id),company_id:e.form.company_id},r.next=5,Object(o["update"])(a,{loading:!0});case 5:if(n=r.sent,200===n.code){r.next=8;break}return r.abrupt("return");case 8:e.$message({message:"交付成功！",type:"success",containerType:"drawer",onClose:function(){e.$router.back()}});case 9:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}())}}},s=c,u=t("2877"),l=Object(u["a"])(s,a,n,!1,null,null,null);r["default"]=l.exports}}]);