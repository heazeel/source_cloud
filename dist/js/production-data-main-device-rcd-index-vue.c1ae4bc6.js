(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["production-data-main-device-rcd-index-vue"],{"3fd9":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("page-list",{attrs:{"search-form":e.searchForm,"table-data":e.listsData.data,"total-count":e.listsData.count,"router-name":"production_data_main_device_rcd"},on:{"list-search":e.getList},scopedSlots:e._u([{key:"search-form",fn:function(){return[a("el-form-item",{attrs:{prop:"no"}},[a("el-input",{directives:[{name:"input-number-prevent-wheel",rawName:"v-input-number-prevent-wheel"}],attrs:{type:"number",clearable:"",placeholder:"序号"},model:{value:e.searchForm.no,callback:function(t){e.$set(e.searchForm,"no",t)},expression:"searchForm.no"}})],1),a("el-form-item",{attrs:{prop:"code"}},[a("el-input",{attrs:{clearable:"",placeholder:"产品编号"},model:{value:e.searchForm.code,callback:function(t){e.$set(e.searchForm,"code",t)},expression:"searchForm.code"}})],1),a("el-form-item",{attrs:{prop:"company_id"}},[a("select-remote",{attrs:{placeholder:"企业",clearable:"","api-key-obj":{type:"delivery",funcName:"remoteSelectSearch"}},model:{value:e.searchForm.company_id,callback:function(t){e.$set(e.searchForm,"company_id",t)},expression:"searchForm.company_id"}})],1)]},proxy:!0},{key:"operate-btns",fn:function(){return[a("button-sc",{directives:[{name:"has",rawName:"v-has",value:"production_data_main_device_rcd_create",expression:"'production_data_main_device_rcd_create'"}],attrs:{type:"operate"},on:{click:function(t){return e.$router.push({name:"production_data_main_device_rcd_create"})}}},[e._v(" 新增 + ")])]},proxy:!0},{key:"table",fn:function(){return[a("el-table-column",{attrs:{fixed:"",prop:"no",width:"80",label:"序号"}}),a("el-table-column",{attrs:{prop:"code",width:"130",label:"产品编号"}}),a("el-table-column",{attrs:{prop:"company",width:"180",label:"所属企业"}}),a("el-table-column",{attrs:{prop:"delivery_time","min-width":"120",label:"交付日期"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e._f("momentFormat")(t.row.delivery_time,"s","YYYY-MM-DD"))+" ")]}}])}),a("el-table-column",{attrs:{fixed:"right",width:"150",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("button-tooltip-icon-operation",{directives:[{name:"has",rawName:"v-has",value:"production_data_main_device_rcd_look",expression:"'production_data_main_device_rcd_look'"}],attrs:{type:"look"},on:{click:function(a){return e.$router.push({name:"production_data_main_device_rcd_look",query:{id:t.row.id}})}}}),a("button-tooltip-icon-operation",{directives:[{name:"has",rawName:"v-has",value:"production_data_main_device_rcd_update",expression:"'production_data_main_device_rcd_update'"}],attrs:{type:"update"},on:{click:function(a){return e.$router.push({name:"production_data_main_device_rcd_update",query:{id:t.row.id,status:t.row.status}})}}}),a("button-tooltip-icon",{directives:[{name:"has",rawName:"v-has",value:"production_data_main_device_rcd_delivery",expression:"'production_data_main_device_rcd_delivery'"}],attrs:{"icon-title":"交付","icon-class":"iconsc-icon-deliver"},on:{click:function(a){return e.$router.push({name:"production_data_main_device_rcd_delivery",query:{device_type:"h-uap",device_id:t.row.id}})}}}),a("button-tooltip-icon",{directives:[{name:"has",rawName:"v-has",value:"production_data_main_device_rcd_maintain_record",expression:"'production_data_main_device_rcd_maintain_record'"}],attrs:{"icon-title":"维护","icon-class":"iconsc-icon-maintain"},on:{click:function(a){return e.$router.push({name:"production_data_main_device_rcd_maintain_record",query:{device_type:"h-uap",device_id:t.row.id}})}}}),a("button-tooltip-icon-operation",{directives:[{name:"has",rawName:"v-has",value:"production_data_main_device_rcd_delete",expression:"'production_data_main_device_rcd_delete'"}],attrs:{type:"delete"},on:{click:function(a){return e.deleteItem(t.row)}}})]}}])})]},proxy:!0}])},[a("router-view")],1)},o=[],n=a("5530"),c=(a("96cf"),a("1da1")),i=a("e3b9"),d={name:"RcdIndex",data:function(){return{searchForm:{no:null,code:null,company_id:null},pageObj:{page_no:1,page_size:10},listsData:{count:0,data:[]}}},methods:{getList:function(e){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function a(){var r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.pageObj=e||t.pageObj,a.next=3,Object(i["search"])(Object(n["a"])({},t.searchForm,{},t.pageObj),{loading:!0});case 3:if(r=a.sent,200==r.code){a.next=6;break}return a.abrupt("return");case 6:t.listsData=r.content;case 7:case"end":return a.stop()}}),a)})))()},deleteItem:function(e){this.$listDeleteItem({vm:this,row:e,api:i["deleteItem"],message:"是否确认删除".concat(e.code,"的导控器？"),successMessage:"删除".concat(e.code,"成功!"),successCallback:this.getList})}}},s=d,u=a("2877"),l=Object(u["a"])(s,r,o,!1,null,null,null);t["default"]=l.exports}}]);