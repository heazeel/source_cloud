(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["production-data-main-device-common-maintain-record-vue"],{"07ac":function(e,t,i){var n=i("23e7"),a=i("6f53").values;n({target:"Object",stat:!0},{values:function(e){return a(e)}})},"08a9":function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("transition",{attrs:{name:"viewer-fade"}},[i("div",{ref:"el-image-viewer__wrapper",staticClass:"el-image-viewer__wrapper",style:{"z-index":e.zIndex},attrs:{tabindex:"-1"}},[i("div",{staticClass:"el-image-viewer__mask"}),i("span",{staticClass:"el-image-viewer__btn el-image-viewer__close",on:{click:e.hide}},[i("i",{staticClass:"el-icon-circle-close"})]),e.isSingle?e._e():[i("span",{staticClass:"el-image-viewer__btn el-image-viewer__prev",class:{"is-disabled":!e.infinite&&e.isFirst},on:{click:e.prev}},[i("i",{staticClass:"el-icon-arrow-left"})]),i("span",{staticClass:"el-image-viewer__btn el-image-viewer__next",class:{"is-disabled":!e.infinite&&e.isLast},on:{click:e.next}},[i("i",{staticClass:"el-icon-arrow-right"})])],i("div",{staticClass:"el-image-viewer__btn el-image-viewer__actions"},[i("div",{staticClass:"el-image-viewer__actions__inner"},[i("i",{staticClass:"el-icon-zoom-out",on:{click:function(t){return e.handleActions("zoomOut")}}}),i("i",{staticClass:"el-icon-zoom-in",on:{click:function(t){return e.handleActions("zoomIn")}}}),i("i",{staticClass:"el-image-viewer__actions__divider"}),i("i",{class:e.mode.icon,on:{click:e.toggleMode}}),i("i",{staticClass:"el-image-viewer__actions__divider"}),i("i",{staticClass:"el-icon-refresh-left",on:{click:function(t){return e.handleActions("anticlocelise")}}}),i("i",{staticClass:"el-icon-refresh-right",on:{click:function(t){return e.handleActions("clocelise")}}})])]),i("div",{staticClass:"el-image-viewer__canvas"},e._l(e.urlList,(function(t,n){return n===e.index?i("img",{key:t,ref:"img",refInFor:!0,staticClass:"el-image-viewer__img",style:e.imgStyle,attrs:{src:e.currentImg},on:{load:e.handleImgLoad,error:e.handleImgError,mousedown:e.handleMouseDown}}):e._e()})),0)],2)])},a=[],r=(i("99af"),i("c975"),i("a9e3"),i("b680"),i("b64b"),i("07ac"),i("5530")),s=i("526f"),o=i("6bd7"),l={CONTAIN:{name:"contain",icon:"el-icon-full-screen"},ORIGINAL:{name:"original",icon:"el-icon-c-scale-to-original"}},c=Object(o["b"])()?"DOMMouseScroll":"mousewheel",u={name:"elImageViewer",props:{urlList:{type:Array,default:function(){return[]}},zIndex:{type:Number,default:2e3},onSwitch:{type:Function,default:function(){}},onClose:{type:Function,default:function(){}},initialIndex:{type:Number,default:0}},data:function(){return{index:this.initialIndex,isShow:!1,infinite:!0,loading:!1,mode:l.CONTAIN,transform:{scale:1,deg:0,offsetX:0,offsetY:0,enableTransition:!1}}},computed:{isSingle:function(){return this.urlList.length<=1},isFirst:function(){return 0===this.index},isLast:function(){return this.index===this.urlList.length-1},currentImg:function(){return this.urlList[this.index]},imgStyle:function(){var e=this.transform,t=e.scale,i=e.deg,n=e.offsetX,a=e.offsetY,r=e.enableTransition,s={transform:"scale(".concat(t,") rotate(").concat(i,"deg)"),transition:r?"transform .3s":"","margin-left":"".concat(n,"px"),"margin-top":"".concat(a,"px")};return this.mode===l.CONTAIN&&(s.maxWidth=s.maxHeight="100%"),s}},watch:{index:{handler:function(e){this.reset(),this.onSwitch(e)}},currentImg:function(e){var t=this;this.$nextTick((function(e){var i=t.$refs.img[0];i.complete||(t.loading=!0)}))}},methods:{hide:function(){this.deviceSupportUninstall(),this.onClose()},deviceSupportInstall:function(){var e=this;this._keyDownHandler=Object(o["c"])((function(t){var i=t.keyCode;switch(i){case 27:e.hide();break;case 32:e.toggleMode();break;case 37:e.prev();break;case 38:e.handleActions("zoomIn");break;case 39:e.next();break;case 40:e.handleActions("zoomOut");break}})),this._mouseWheelHandler=Object(o["c"])((function(t){var i=t.wheelDelta?t.wheelDelta:-t.detail;i>0?e.handleActions("zoomIn",{zoomRate:.015,enableTransition:!1}):e.handleActions("zoomOut",{zoomRate:.015,enableTransition:!1})})),Object(s["e"])(document,"keydown",this._keyDownHandler),Object(s["e"])(document,c,this._mouseWheelHandler)},deviceSupportUninstall:function(){Object(s["d"])(document,"keydown",this._keyDownHandler),Object(s["d"])(document,c,this._mouseWheelHandler),this._keyDownHandler=null,this._mouseWheelHandler=null},handleImgLoad:function(e){this.loading=!1},handleImgError:function(e){this.loading=!1,e.target.alt="加载失败"},handleMouseDown:function(e){var t=this;if(!this.loading&&0===e.button){var i=this.transform,n=i.offsetX,a=i.offsetY,r=e.pageX,l=e.pageY;this._dragHandler=Object(o["c"])((function(e){t.transform.offsetX=n+e.pageX-r,t.transform.offsetY=a+e.pageY-l})),Object(s["e"])(document,"mousemove",this._dragHandler),Object(s["e"])(document,"mouseup",(function(e){Object(s["d"])(document,"mousemove",t._dragHandler)})),e.preventDefault()}},reset:function(){this.transform={scale:1,deg:0,offsetX:0,offsetY:0,enableTransition:!1}},toggleMode:function(){if(!this.loading){var e=Object.keys(l),t=Object.values(l),i=t.indexOf(this.mode),n=(i+1)%e.length;this.mode=l[e[n]],this.reset()}},prev:function(){if(!this.isFirst||this.infinite){var e=this.urlList.length;this.index=(this.index-1+e)%e}},next:function(){if(!this.isLast||this.infinite){var e=this.urlList.length;this.index=(this.index+1)%e}},handleActions:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!this.loading){var i=Object(r["a"])({zoomRate:.2,rotateDeg:90,enableTransition:!0},t),n=i.zoomRate,a=i.rotateDeg,s=i.enableTransition,o=this.transform;switch(e){case"zoomOut":o.scale>.2&&(o.scale=parseFloat((o.scale-n).toFixed(3)));break;case"zoomIn":o.scale=parseFloat((o.scale+n).toFixed(3));break;case"clocelise":o.deg+=a;break;case"anticlocelise":o.deg-=a;break}o.enableTransition=s}}},mounted:function(){this.deviceSupportInstall(),this.$refs["el-image-viewer__wrapper"].focus()}},m=u,d=i("2877"),f=Object(d["a"])(m,n,a,!1,null,null,null);t["a"]=f.exports},"3cdd":function(e,t,i){},"6f53":function(e,t,i){var n=i("83ab"),a=i("df75"),r=i("fc6a"),s=i("d1e7").f,o=function(e){return function(t){var i,o=r(t),l=a(o),c=l.length,u=0,m=[];while(c>u)i=l[u++],n&&!s.call(o,i)||m.push(e?[i,o[i]]:o[i]);return m}};e.exports={entries:o(!0),values:o(!1)}},"71b8":function(e,t,i){"use strict";var n=i("3cdd"),a=i.n(n);a.a},"857a":function(e,t,i){var n=i("1d80"),a=/"/g;e.exports=function(e,t,i,r){var s=String(n(e)),o="<"+t;return""!==i&&(o+=" "+i+'="'+String(r).replace(a,"&quot;")+'"'),o+">"+s+"</"+t+">"}},9911:function(e,t,i){"use strict";var n=i("23e7"),a=i("857a"),r=i("af03");n({target:"String",proto:!0,forced:r("link")},{link:function(e){return a(this,"a","href",e)}})},af03:function(e,t,i){var n=i("d039");e.exports=function(e){return n((function(){var t=""[e]('"');return t!==t.toLowerCase()||t.split('"').length>3}))}},e78e:function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("dialog-sc",{ref:"maintain-record",staticClass:"maintain-record",attrs:{title:"维护信息"},on:{open:e.init,cancel:function(t){return e.$router.back()},submit:e.handleSubmit}},[i("el-form",{ref:"form",staticClass:"form-dialog",attrs:{model:e.form,rules:e.rules,"label-width":"80px"}},[i("el-form-item",{attrs:{prop:"maintain_time",label:"日期"}},[i("el-date-picker",{attrs:{type:"date","value-format":"timestamp",editable:!1,"picker-options":e.pickerOptions,placeholder:"选择日期"},model:{value:e.form.maintain_time,callback:function(t){e.$set(e.form,"maintain_time",t)},expression:"form.maintain_time"}})],1),i("el-form-item",{attrs:{prop:"uid",label:"维护人"}},[e._v(" "+e._s(e.form.name)+" ")]),i("el-form-item",{staticClass:"block",attrs:{prop:"explanation",label:"说明"}},[i("el-input",{attrs:{type:"textarea",placeholder:"请输入说明"},model:{value:e.form.explanation,callback:function(t){e.$set(e.form,"explanation",t)},expression:"form.explanation"}})],1),i("el-form-item",{staticClass:"block",attrs:{label:"图片"}},[i("el-upload",{class:{"limit-hide":3==e.imgs.length},attrs:{action:"#","list-type":"picture-card","auto-upload":!1,"on-change":e.handleImgChange,"file-list":e.imgs,accept:".jpeg,.jpg,.png"},scopedSlots:e._u([{key:"file",fn:function(t){var n=t.file;return i("div",{},[i("img",{staticClass:"el-upload-list__item-thumbnail",attrs:{src:n.url,alt:""}}),i("span",{staticClass:"el-upload-list__item-actions"},[i("span",{staticClass:"el-upload-list__item-preview",on:{click:function(t){e.previewImg={visible:!0,urls:[n.url]}}}},[i("i",{staticClass:"el-icon-zoom-in"})]),i("span",{staticClass:"el-upload-list__item-delete",on:{click:function(t){return e.handleRemove(n)}}},[i("i",{staticClass:"el-icon-delete"})])])])}}])},[i("i",{staticClass:"el-icon-plus",attrs:{slot:"trigger"},slot:"trigger"})]),i("el-image-viewer",{directives:[{name:"show",rawName:"v-show",value:e.previewImg.visible,expression:"previewImg.visible"}],attrs:{"on-close":function(){return e.previewImg.visible=!1},"url-list":e.previewImg.urls}})],1)],1),i("el-table",{staticClass:"gray-secondary-table",staticStyle:{width:"100%"},attrs:{data:e.recordList,height:"290"}},[i("el-table-column",{attrs:{prop:"maintain_time",label:"日期",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e._f("momentFormat")(t.row.maintain_time,"s","YYYY-MM-DD"))+" ")]}}])}),i("el-table-column",{attrs:{prop:"name",label:"维护人",width:"100"}}),i("el-table-column",{attrs:{prop:"explanation",label:"说明"}}),i("el-table-column",{attrs:{label:"图片",width:"240"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.img1?i("el-image",{staticClass:"small-img",attrs:{src:t.row.img1,"preview-src-list":[t.row.img1]}}):e._e(),t.row.img2?i("el-image",{staticClass:"small-img",attrs:{src:t.row.img2,"preview-src-list":[t.row.img2]}}):e._e(),t.row.img3?i("el-image",{staticClass:"small-img",attrs:{src:t.row.img3,"preview-src-list":[t.row.img3]}}):e._e()]}}])})],1)],1)},a=[],r=(i("c740"),i("4160"),i("a434"),i("b0c0"),i("9911"),i("159b"),i("96cf"),i("1da1")),s=i("08a9"),o=i("0d5e"),l=function(e,t){return Object(o["get"])("/dev/maintain_record/search",e,t)},c=function(e,t){return Object(o["post"])("/dev/maintain_record/create",e,t)},u=i("2934"),m={maintain_time:null,uid:null,name:null,explanation:null,img1:null,img2:null,img3:null},d={name:"MaintainRecord",components:{"el-image-viewer":s["a"]},data:function(){return{form:this.$lodash.cloneDeep(m),rules:{maintain_time:[{required:!0,message:"请选择时间"}],explanation:[{required:!0,message:"请输入说明内容"}]},recordList:[],imgs:[],previewImg:{visible:!1,urls:[]},pickerOptions:{disabledDate:function(e){return e.getTime()>Date.now()||e.getTime()<Date.now()-6048e5}}}},created:function(){this.form.name=localStorage.getItem("name"),this.form.uid=localStorage.getItem("uid")},methods:{init:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,l({device_id:e.$route.query.device_id,device_type:e.$route.query.device_type},{loading:!0});case 2:if(i=t.sent,200===i.code){t.next=6;break}return e.recordList=[],t.abrupt("return");case 6:e.recordList=i.content;case 7:case"end":return t.stop()}}),t)})))()},handleSubmit:function(){var e=this;this.$refs.form.validate(function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(i){var n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(i){t.next=2;break}return t.abrupt("return");case 2:return n={maintain_time:parseInt(e.form.maintain_time/1e3),uid:e.form.uid,name:e.form.name,explanation:e.form.explanation,device_id:e.$route.query.device_id,device_type:e.$route.query.device_type},e.imgs.forEach((function(e,t){n["img".concat(t+1)]=e.url})),t.next=7,c(n,{loading:!0});case 7:if(a=t.sent,200===a.code){t.next=10;break}return t.abrupt("return");case 10:e.$message({message:"维护信息提交成功！",type:"success",containerType:"dialog",onClose:function(){e.$router.back()}});case 11:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},handleImgChange:function(e,t){var i=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=new FormData,n.append("image",e.raw),t.next=4,Object(u["imageUpload"])(n);case 4:if(a=t.sent,200===a.code){t.next=7;break}return t.abrupt("return");case 7:i.imgs.push({url:a.content.link});case 10:case"end":return t.stop()}}),t)})))()},handleRemove:function(e){var t=this.imgs.findIndex((function(t){return t.uid==e.uid}));this.imgs.splice(t,1)}}},f=d,g=(i("71b8"),i("2877")),p=Object(g["a"])(f,n,a,!1,null,null,null);t["default"]=p.exports}}]);