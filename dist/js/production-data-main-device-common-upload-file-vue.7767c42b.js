(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["production-data-main-device-common-upload-file-vue"],{"7b06":function(t,a,o){"use strict";var l=o("f30b"),e=o.n(l);e.a},"9e8a":function(t,a,o){"use strict";o.r(a);var l=function(){var t=this,a=t.$createElement,l=t._self._c||a;return l("div",{staticClass:"upload-file"},[t._l(t.fileLists,(function(a){return l("el-row",{key:a.name,staticClass:"file-list"},[l("el-col",{attrs:{span:2}},[l("img",{attrs:{src:o("945f"),alt:"文件"}})]),l("el-col",{staticStyle:{padding:"0 4px"},attrs:{span:20}},[l("span",[t._v(t._s(a.name))])]),l("el-col",{attrs:{span:2}},[l("el-link",{attrs:{href:a.downloadUrl,underline:!1,target:"_blank"}},[l("i",{staticClass:"iconfont iconsc-icon-download color-info",staticStyle:{cursor:"pointer"}})])],1)],1)})),l("el-row",[l("el-col",{staticClass:"form-operate-text",staticStyle:{cursor:"pointer"},attrs:{span:6}},[l("el-upload",t._b({ref:"upload-file",attrs:{name:"file",action:"#","auto-upload":!1,"show-file-list":!1,"on-change":t.uploadFile}},"el-upload",t.$attrs,!1),[t._t("upload",[l("i",{staticClass:"iconfont iconsc-icon-upload color-info"}),l("span",{staticClass:"color-info"},[t._v("上传文件")])])],2)],1),t._t("other")],2)],2)},e=[],n={name:"UploadFile",props:{fileLists:{type:Array,default:function(){return[]}}},methods:{uploadFile:function(t,a){this.$emit("on-change",t,a)}}},s=n,i=(o("7b06"),o("2877")),c=Object(i["a"])(s,l,e,!1,null,"0cc8ccc0",null);a["default"]=c.exports},f30b:function(t,a,o){}}]);