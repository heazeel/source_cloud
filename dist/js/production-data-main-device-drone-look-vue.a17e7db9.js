(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["production-data-main-device-drone-look-vue"],{d809:function(e,n,t){"use strict";t.r(n);var r=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("dialog-sc",{attrs:{"read-only":"",title:"无人机查看"},on:{cancel:function(n){return e.$router.back()},open:e.getInfo}},[t("look-page-form",{attrs:{"label-width":"60px",form:e.form,"form-arr":e.formArr}})],1)},o=[],a=(t("96cf"),t("1da1")),l=t("4c6b"),c=t("c415"),i=[{label:"序号",key:"no",unit:""},{label:"编号",key:"code",unit:""},{label:"所属企业",key:"company",unit:"",col:24},{label:"型号名称",key:"model",unit:"",col:24},{label:"产品状态",key:"status",unit:"",col:24,dataArr:l["g"]},{label:"内部型号",key:"internal_model",unit:"",col:24},{label:"固件版本",key:"version_no",unit:"",col:24},{label:"IMEI",key:"imei",unit:"",col:24},{label:"备注",key:"comment",unit:"",col:24}],u={name:"DroneLook",data:function(){return{form:{},formArr:i}},methods:{getInfo:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function n(){var t;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,Object(c["detailSearch"])({id:e.$route.query.id},{loading:!0});case 2:if(t=n.sent,200===t.code){n.next=6;break}return e.form={},n.abrupt("return");case 6:e.form=t.content;case 7:case"end":return n.stop()}}),n)})))()}}},d=u,s=t("2877"),f=Object(s["a"])(d,r,o,!1,null,null,null);n["default"]=f.exports}}]);