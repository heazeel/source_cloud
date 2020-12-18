(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["production-data-model-drone-alarm-vue"],{"4d5f":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("dialog-sc",{ref:"drone-alarm",staticClass:"drone-alarm",attrs:{title:"无人机告警配置"},on:{open:e.init,cancel:function(t){return e.$router.back()},submit:e.handleSubmit}},[a("el-table",{ref:"multipleTable",staticClass:"gray-primary-table",staticStyle:{width:"100%"},attrs:{size:"middle",height:"648",data:e.alarms,"row-style":e.disabledRowStyle}},[a("el-table-column",{attrs:{width:"90",label:"是否显示"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.status?a("span",{staticClass:"disabled-span"}):a("el-checkbox",{attrs:{checked:Boolean(t.row.if_show)},on:{change:function(a){return e.handleSelect(a,t.$index,t.row)}}})]}}])}),a("el-table-column",{attrs:{prop:"name",label:"告警名称"}}),a("el-table-column",{attrs:{prop:"name_en",width:"206",label:"告警名称(英文)"}}),a("el-table-column",{attrs:{prop:"alarm_type",width:"90",label:"告警类型"}}),a("el-table-column",{attrs:{prop:"level",width:"90",label:"响应等级"}}),a("el-table-column",{attrs:{prop:"ignored",width:"130",label:"是否允许忽略"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.ignored?"是":"否")+" ")]}}])})],1)],1)},n=[],l=(a("d81d"),a("96cf"),a("1da1")),o=a("c415"),s={name:"DroneAlarm",data:function(){return{alarms:[]}},methods:{init:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(o["alarmSearch"])({id:e.$route.query.id},{isLoading:!0});case 2:if(a=t.sent,200===a.code){t.next=6;break}return e.alarms=[],t.abrupt("return");case 6:e.alarms=a.content;case 7:case"end":return t.stop()}}),t)})))()},handleSubmit:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=e.alarms.map((function(e){return{alarm_id:e.alarm_id,if_show:e.if_show}})),t.next=3,Object(o["alarmUpdate"])({id:e.$route.query.id,alarms:JSON.stringify(a)},{isLoading:!0});case 3:if(r=t.sent,200===r.code){t.next=6;break}return t.abrupt("return");case 6:e.$message({message:"无人机配置告警成功！",type:"success",containerType:"dialog",onClose:function(){e.$router.back()}});case 7:case"end":return t.stop()}}),t)})))()},handleSelect:function(e,t,a){this.alarms[t].if_show=e?1:0},disabledRowStyle:function(e){var t=e.row;e.rowIndex;if(t.status)return{color:"#5C5D79",opacity:.48}}}},i=s,c=(a("a312"),a("2877")),u=Object(c["a"])(i,r,n,!1,null,"124b3929",null);t["default"]=u.exports},a312:function(e,t,a){"use strict";var r=a("a339"),n=a.n(r);n.a},a339:function(e,t,a){}}]);