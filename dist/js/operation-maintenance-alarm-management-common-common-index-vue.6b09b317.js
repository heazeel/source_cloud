(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["operation-maintenance-alarm-management-common-common-index-vue"],{"41aa":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("page-list",{attrs:{"search-form":e.searchForm,"table-data":e.listsData.data,"total-count":e.listsData.count,"router-name":"operation_maintenance_alarm_management_"+e.deviceType},on:{"list-search":e.getList},scopedSlots:e._u([{key:"search-form",fn:function(){return[n("el-form-item",{attrs:{prop:"no"}},[n("el-input",{directives:[{name:"input-number-prevent-wheel",rawName:"v-input-number-prevent-wheel"}],attrs:{type:"number",clearable:"",placeholder:"告警编号"},model:{value:e.searchForm.no,callback:function(t){e.$set(e.searchForm,"no",t)},expression:"searchForm.no"}})],1),n("el-form-item",{attrs:{prop:"name_en"}},[n("el-input",{directives:[{name:"input-number-prevent-wheel",rawName:"v-input-number-prevent-wheel"}],attrs:{clearable:"",placeholder:"告警名称（英）"},model:{value:e.searchForm.name_en,callback:function(t){e.$set(e.searchForm,"name_en",t)},expression:"searchForm.name_en"}})],1)]},proxy:!0},{key:"operate-btns",fn:function(){return[n("button-sc",{directives:[{name:"has",rawName:"v-has",value:"operation_maintenance_alarm_management_"+e.deviceType+"_create",expression:"`operation_maintenance_alarm_management_${deviceType}_create`"}],attrs:{type:"operate"},on:{click:function(t){return e.$router.push({name:"operation_maintenance_alarm_management_"+e.deviceType+"_create"})}}},[e._v(" 新增 + ")])]},proxy:!0},{key:"table",fn:function(){return[n("el-table-column",{attrs:{fixed:"",prop:"no",width:"100",label:"编号"}}),n("el-table-column",{attrs:{prop:"name",width:"200",label:"告警名称"}}),n("el-table-column",{attrs:{prop:"name_en",width:"250",label:"告警名称（英）"}}),n("el-table-column",{attrs:{prop:"level",width:"120",label:"响应等级"}}),n("el-table-column",{attrs:{prop:"tips",width:"300",label:"建议操作"}}),n("el-table-column",{attrs:{width:"120",label:"是否允许忽略"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e._f("findSelectedText")(t.row.ignored,e.ALARM_IGNORED))+" ")]}}])}),n("el-table-column",{attrs:{prop:"comment","min-width":"300",label:"备注"}}),n("el-table-column",{attrs:{prop:"disabled",label:"状态",fixed:"right",width:"70"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-switch",{attrs:{disabled:!e.$tools.checkPermission("operation_maintenance_alarm_management_"+e.deviceType+"_status"),"active-value":0,"inactive-value":1,"validate-event":""},on:{change:function(n){return e.statusUpdate(n,t.row)}},model:{value:t.row.disabled,callback:function(n){e.$set(t.row,"disabled",n)},expression:"scope.row.disabled"}})]}}])}),n("el-table-column",{attrs:{fixed:"right",width:"90",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("button-tooltip-icon-operation",{directives:[{name:"has",rawName:"v-has",value:"operation_maintenance_alarm_management_"+e.deviceType+"_update",expression:"`operation_maintenance_alarm_management_${deviceType}_update`"}],attrs:{type:"update"},on:{click:function(n){return e.$router.push({name:"operation_maintenance_alarm_management_"+e.deviceType+"_update",query:{id:t.row.id}})}}})]}}])})]},proxy:!0}])},[n("router-view")],1)},r=[],o=(n("4160"),n("b0c0"),n("a9e3"),n("159b"),n("5530")),c=(n("96cf"),n("1da1")),i=n("4c6b"),s=n("ef37"),l={name:"AlarmManagementIndex",props:{deviceType:{type:String,default:function(){return""}}},data:function(){return{searchForm:{device_type:null,no:null,name_en:null},pageObj:{page_no:1,page_size:10},listsData:{count:0,data:[]},ALARM_IGNORED:i["b"]}},created:function(){this.searchForm.device_type=this.$tools.deviceTypeNameConversion(this.deviceType)},methods:{getList:function(e){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function n(){var a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.pageObj=e||t.pageObj,n.next=3,Object(s["c"])(Object(o["a"])({},t.searchForm,{},t.pageObj),{loading:!0});case 3:if(a=n.sent,200==a.code){n.next=6;break}return n.abrupt("return");case 6:t.listsData.data=[],a.content.roles.forEach((function(e){e.device_type===t.$tools.deviceTypeNameConversion(t.deviceType)&&t.listsData.data.push(e)})),t.listsData.count=t.listsData.data.length;case 9:case"end":return n.stop()}}),n)})))()},statusUpdate:function(e,t){var n=this;return Object(c["a"])(regeneratorRuntime.mark((function a(){var r,o,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:r=[{name:"启用",text:"是否确认启用 ".concat(t.no," 告警？")},{name:"禁用",text:"是否确认禁用 ".concat(t.no," 告警？")}],o=Number(!t.disabled),t.disabled=o,i=n,n.$confirm(r[e].text,"".concat(r[e].name,"告警"),{confirmButtonText:"确认",cancelButtonText:"取消",beforeClose:function(){var n=Object(c["a"])(regeneratorRuntime.mark((function n(a,r,o){var c;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if("confirm"!==a){n.next=9;break}return n.next=3,Object(s["d"])({id:t.id,no:t.no,name:t.name,name_en:t.name_en,alarm_type:t.alarm_type,level:t.level,ignored:t.ignored,disabled:e,comment:t.comment},{loading:!0});case 3:if(c=n.sent,200==c.code){n.next=6;break}return n.abrupt("return");case 6:this.$message({type:"success",message:"操作成功!",containerType:"message-box",onClose:function(){i.getList(),o()}}),n.next=10;break;case 9:o();case 10:case"end":return n.stop()}}),n,this)})));function a(e,t,a){return n.apply(this,arguments)}return a}()}).catch((function(e){}));case 5:case"end":return a.stop()}}),a)})))()}}},u=l,m=n("2877"),p=Object(m["a"])(u,a,r,!1,null,null,null);t["default"]=p.exports},ef37:function(e,t,n){"use strict";n.d(t,"c",(function(){return r})),n.d(t,"b",(function(){return o})),n.d(t,"a",(function(){return c})),n.d(t,"e",(function(){return i})),n.d(t,"d",(function(){return s}));var a=n("0d5e"),r=function(e,t){return Object(a["get"])("/dev/alarm/search",e,t)},o=function(e,t){return Object(a["get"])("/dev/alarm/detail/search",e,t)},c=function(e,t){return Object(a["post"])("/dev/alarm/create",e,t)},i=function(e,t){return Object(a["post"])("/dev/alarm/update",e,t)},s=function(e,t){return Object(a["post"])("/dev/alarm/update",e,t)}}}]);