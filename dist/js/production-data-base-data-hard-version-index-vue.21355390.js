(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["production-data-base-data-hard-version-index-vue"],{b7d4:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("page-list",{attrs:{"search-form":e.searchForm,"table-data":e.listsData.data,"total-count":e.listsData.count,"router-name":"production_data_base_data_hard_version"},on:{"list-search":e.getList},scopedSlots:e._u([{key:"search-form",fn:function(){return[a("el-form-item",{attrs:{prop:"model_id"}},[a("select-remote",{attrs:{"label-key":"code","api-key-obj":{type:"hardVersion",funcName:"remoteModelSelect"},placeholder:"型号",clearable:""},model:{value:e.searchForm.model_id,callback:function(t){e.$set(e.searchForm,"model_id",t)},expression:"searchForm.model_id"}})],1),a("el-form-item",{attrs:{prop:"factory_id"}},[a("select-remote",{attrs:{"api-key-obj":{type:"hardVersion",funcName:"remoteFactorySelect"},placeholder:"原厂",clearable:""},model:{value:e.searchForm.factory_id,callback:function(t){e.$set(e.searchForm,"factory_id",t)},expression:"searchForm.factory_id"}})],1),a("el-form-item",{attrs:{prop:"type_id"}},[a("select-remote",{attrs:{"api-key-obj":{type:"hardVersion",funcName:"remoteTypeSelect"},placeholder:"类别",clearable:""},model:{value:e.searchForm.type_id,callback:function(t){e.$set(e.searchForm,"type_id",t)},expression:"searchForm.type_id"}})],1)]},proxy:!0},{key:"operate-btns",fn:function(){return[a("button-sc",{directives:[{name:"has",rawName:"v-has",value:"production_data_base_data_model_create",expression:"'production_data_base_data_model_create'"}],attrs:{type:"operate"},on:{click:function(t){return e.$router.push({name:"production_data_base_data_hard_version_create"})}}},[e._v(" 新增 + ")])]},proxy:!0},{key:"table",fn:function(){return[a("el-table-column",{attrs:{prop:"type",label:"类别",width:"150",fixed:"left"}}),a("el-table-column",{attrs:{prop:"factory",label:"原厂",width:"150"}}),a("el-table-column",{attrs:{prop:"model",label:"型号",width:"150"}}),a("el-table-column",{attrs:{prop:"version",label:"硬件版本",width:"120"}}),a("el-table-column",{attrs:{prop:"comment",label:"备注",width:"180"}}),a("el-table-column",{attrs:{prop:"create_time",label:"创建时间",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e._f("momentFormat")(t.row.create_time,"s"))+" ")]}}])}),a("el-table-column",{attrs:{prop:"update_time",label:"修改时间","min-width":"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e._f("momentFormat")(t.row.create_time,"s"))+" ")]}}])}),a("el-table-column",{attrs:{label:"操作",width:"90",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("button-tooltip-icon-operation",{directives:[{name:"has",rawName:"v-has",value:"production_data_base_data_hard_version_delete",expression:"'production_data_base_data_hard_version_delete'"}],attrs:{type:"delete"},on:{click:function(a){return e.deleteItem(t.row)}}})]}}])})]},proxy:!0}])},[a("router-view")],1)},o=[],n=a("5530"),s=(a("96cf"),a("1da1")),l=a("6773"),c={name:"HardVersionIndex",data:function(){return{searchForm:{model_id:null,type_id:null,factory_id:null},pageObj:{page_no:1,page_size:10},listsData:{count:0,data:[]},api:{deleteItem:l["deleteItem"],search:l["search"]}}},methods:{getList:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.pageObj=e||t.pageObj,a.next=3,Object(l["search"])(Object(n["a"])({},t.searchForm,{},t.pageObj),{loading:!0});case 3:if(r=a.sent,200==r.code){a.next=6;break}return a.abrupt("return");case 6:t.listsData=r.content;case 7:case"end":return a.stop()}}),a)})))()},deleteItem:function(e){this.$listDeleteItem({vm:this,row:e,api:l["deleteItem"],message:"是否删除版本号为".concat(e.version,"的硬件版本？"),successMessage:"删除".concat(e.version,"成功!"),successCallback:this.getList,needAlertWarning:!0})}}},i=c,d=a("2877"),u=Object(d["a"])(i,r,o,!1,null,null,null);t["default"]=u.exports}}]);