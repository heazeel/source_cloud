(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["production-data-main-device-hstation-look-vue"],{4645:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("dialog-sc",{attrs:{"read-only":"",title:"人工站查看"},on:{cancel:function(e){return t.$router.back()},open:t.getInfo}},[r("look-page-form",{attrs:{"label-width":"80px",form:t.form,"form-arr":t.formArr}}),r("set-tarmacs",{staticStyle:{"margin-top":"24px"},attrs:{"read-only":"",form:t.form,type:"ustation"}})],1)},a=[],o=(r("d3b7"),r("96cf"),r("1da1")),c=r("3d4f"),i=r("4c6b"),u=[{label:"产品编号",key:"code",unit:""},{label:"产品状态",key:"status",unit:"",dataArr:i["g"]},{label:"所属企业",key:"company",unit:""}],s={name:"UstationLook",components:{"set-tarmacs":function(){return r.e("production-data-main-device-common-set-tarmacs-vue").then(r.bind(null,"32bc"))}},data:function(){return{form:{tarmacs:[]},formArr:u}},methods:{getInfo:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(c["detailSearch"])({id:t.$route.query.id},{loading:!0});case 2:if(r=e.sent,200===r.code){e.next=6;break}return t.form={tarmacs:[]},e.abrupt("return");case 6:t.form=r.content;case 7:case"end":return e.stop()}}),e)})))()}}},l=s,m=r("2877"),d=Object(m["a"])(l,n,a,!1,null,null,null);e["default"]=d.exports}}]);