webpackJsonp([4],{HzJ8:function(t,e,s){t.exports={default:s("oMO2"),__esModule:!0}},Uady:function(t,e){},nzld:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("HzJ8"),l=s.n(a),o=s("qsHl"),i=s("TIfe"),r={name:"createGoods",computed:{showT:function(){for(var t=0;t<this.groups.length;t++)for(var e=0;e<this.groups[t].specValueLists.length;e++)return""!=this.groups[t].specValueLists[e].sValue}},data:function(){return{groups:[{value:"",specValueLists:[{sValue:"",price:null,store:null,code:""}]}],hideUploadImg:!1,activeStep:1,fnum:999,snum:999,tnum:999,lists:[],slists:[],tlists:[],fileList2:[],fname:"",sname:"",tname:"",ruleForm:{catid:null,goodsName:"",goodsImg:"",goodsDetail:"",market:null,localShop:null,stock:null,goodsCode:null,standard:0},rules:{goodsName:[{required:!0,message:"请输入商品名称",trigger:"blur"},{min:1,max:10,message:"长度在 1到 10 个字符",trigger:"blur"}],goodsImg:[{required:!0,message:"请选择商品图片",trigger:"blur"}],goodsDetail:[{required:!0,message:"请描述商品详情",trigger:"blur"}],market:[{required:!0,message:"请输入市场价",trigger:"blur"},{type:"number",message:"价格只能是数字",trigger:"blur"}],localShop:[{required:!0,message:"请输入本店价",trigger:"blur"},{type:"number",message:"价格只能是数字",trigger:"blur"}],stock:[{required:!0,message:"请输入库存",trigger:"blur"},{type:"number",message:"库存只能是数字",trigger:"blur"}],goodsCode:[{required:!0,message:"请输入商品编码",trigger:"blur"}]},upLoadData:{access_token:"",siteid:1,catid:null},options:[{value:"选项1",label:"黄金糕"}],value:"",spec:"",testValue:{},specValue:"",styleList:[]}},created:function(){this.fetchData()},methods:{fetchData:function(){var t=this;Object(o.f)().then(function(e){t.lists=e.data.data,console.log(e)})},showSecond:function(t,e,s){var a=this;Object(o.i)(t).then(function(t){a.slists=t.data.data,a.fname=e}),this.fnum=s},showThird:function(t,e,s){var a=this;Object(o.k)(t).then(function(t){a.tlists=t.data.data,a.sname=e}),this.snum=s},showTname:function(t,e,s){this.tname=e,this.ruleForm.catid=t,this.upLoadData.catid=t,this.upLoadData.access_token=Object(i.c)(),this.tnum=s},toBasic:function(){this.activeStep=2},toSub:function(){var t=this,e={cat_id:this.ruleForm.catid,goods_name:this.ruleForm.goodsName,goods_sn:this.ruleForm.goodsCode,goods_content:this.ruleForm.goodsDetail,original_img:this.ruleForm.goodsImg,market_price:this.ruleForm.market,store_count:this.ruleForm.stock,shop_price:this.ruleForm.localShop};Object(o.b)(e).then(function(e){if(0!=e.data.code)return t.$message({type:"info",message:"发布失败!"}),void console.log(e);t.$message({type:"success",message:"发布成功!"}),t.$router.push("/goods")})},showUploadImg:function(){this.hideUploadImg=!0},handleExceed:function(t,e){this.$message.warning("当前限制选择 1 个文件，本次选择了 "+t.length+" 个文件，共选择了 "+(t.length+e.length)+" 个文件")},beforeRemove:function(t,e){return this.$confirm("确定移除 "+t.name+"？")},uploadSuccess:function(t,e,s){this.ruleForm.goodsImg=t.data.filepath},querySearchAsync:function(t,e){var s=[];Object(o.g)().then(function(t){var a=!0,o=!1,i=void 0;try{for(var r,n=l()(t.data.data);!(a=(r=n.next()).done);a=!0){var c=r.value;c.value=c.name}}catch(t){o=!0,i=t}finally{try{!a&&n.return&&n.return()}finally{if(o)throw i}}s=t.data.data,e(s)}).catch(function(t){})},handleSelect:function(t){this.testValue=t},addGroups:function(){console.log(this.groups),this.groups.length>2?this.$confirm("最多选择三种规格!"):this.groups.push({value:"",specValueLists:[{sValue:""}]})},delGroups:function(t){this.groups.splice(t,1)},addSpecValue:function(t){this.groups[t].specValueLists.push({sValue:""})},delSpecValue:function(t,e){this.groups[t].specValueLists.splice(e,1)},countSum:function(t){var e=1;return this.groups.forEach(function(s,a){a>=t&&s.specValueLists.length&&(e*=s.specValueLists.length)}),e},showTd:function(t,e){return!!this.groups[t]&&e%this.countSum(t+1)==0},getSpecAttr:function(t,e){var s=this.groups[t].specValueLists,a=(this.groups[t+1]&&this.groups[t+1].specValueLists.length?e/this.countSum(t+1):e)%s.length;return"NaN"!==a.toString()&&a%1==0?s[a].sValue:""}}},n={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container newcon"},[s("div",{staticClass:"ui-box"},[s("div",{staticClass:"xn-steps"},[s("div",{staticClass:"xn-steps-item goods-ct",staticStyle:{width:"50%"}},[s("div",{staticClass:"xn-steps-step step1",class:{"cate-active":1==t.activeStep}},[t._v("\n\t\t\t\t\t1.选择商品种类\n\t\t\t\t")])]),t._v(" "),s("div",{staticClass:"xn-steps-item base-info",staticStyle:{width:"50%"}},[s("div",{staticClass:"xn-steps-step step2",class:{"info-active":2==t.activeStep}},[t._v("\n\t\t\t\t\t2.编辑商品信息\n\t\t\t\t")])])])]),t._v(" "),1==t.activeStep?s("div",[s("ul",{staticClass:"cate-list clearfix ui-box"},[s("li",{staticClass:"cate-list-li"},[s("ul",{staticClass:"cate-tree calSor"},t._l(t.lists,function(e,a){return s("li",{key:a,on:{click:function(s){t.showSecond(e.catid,e.mobile_name,a)}}},[s("a",{staticClass:"child",class:{cative:a==t.fnum}},[t._v(t._s(e.mobile_name)),s("i",{staticClass:"el-icon-arrow-right"})])])}))]),t._v(" "),s("li",{directives:[{name:"show",rawName:"v-show",value:""!=t.slists,expression:"slists !=''"}],staticClass:"cate-list-li"},[s("ul",{staticClass:"cate-tree calSor"},t._l(t.slists,function(e,a){return s("li",{key:a,on:{click:function(s){t.showThird(e.catid,e.mobile_name,a)}}},[s("a",{staticClass:"child",class:{cative:a==t.snum}},[t._v(t._s(e.mobile_name)),s("i",{staticClass:"el-icon-arrow-right"})])])}))]),t._v(" "),s("li",{directives:[{name:"show",rawName:"v-show",value:""!=t.tlists,expression:"tlists !=''"}],staticClass:"cate-list-li"},[s("ul",{staticClass:"cate-tree calSor"},t._l(t.tlists,function(e,a){return s("li",{key:a,on:{click:function(s){t.showTname(e.catid,e.mobile_name,a)}}},[s("a",{staticClass:"child",class:{cative:a==t.tnum}},[t._v(t._s(e.mobile_name))])])}))])]),t._v(" "),s("div",{staticClass:"cutChoose ui-bg"},[s("span",[t._v("您当前选择的是：")]),t._v(" "),""!==t.fname?s("span",{staticClass:"curChoose"},[t._v(t._s(t.fname)),s("i",{staticClass:"el-icon-arrow-right"})]):t._e(),t._v(" "),""!==t.sname?s("span",{staticClass:"curChoose"},[t._v(t._s(t.sname)),s("i",{staticClass:"el-icon-arrow-right"})]):t._e(),t._v(" "),""!==t.tname?s("span",{staticClass:"curChoose"},[t._v(t._s(t.tname))]):t._e()]),t._v(" "),s("div",{staticClass:"ui-box tobasic"},[s("el-button",{attrs:{type:"primary"},on:{click:function(e){t.toBasic()}}},[t._v("下一步")])],1)]):t._e(),t._v(" "),2==t.activeStep?s("div",{staticClass:"eidtorInfo"},[s("el-form",{attrs:{model:t.ruleForm,rules:t.rules,"label-position":"left","label-width":"80px"}},[s("div",{staticClass:"ui-box"},[s("p",{staticClass:"create-main"},[t._v("基本信息")]),t._v(" "),s("el-form-item",{attrs:{label:"商品名称",prop:"goodsName"}},[s("el-col",{attrs:{span:11}},[s("el-input",{model:{value:t.ruleForm.goodsName,callback:function(e){t.$set(t.ruleForm,"goodsName",e)},expression:"ruleForm.goodsName"}})],1)],1),t._v(" "),s("el-form-item",{attrs:{label:"商品主图",prop:"goodsImg"}},[s("el-col",{attrs:{span:11}},[s("el-button",{attrs:{type:"primary",icon:"el-icon-plus"},on:{click:t.showUploadImg}},[t._v("上传图片")])],1)],1),t._v(" "),""!==t.ruleForm.goodsImg?s("div",{staticClass:"thumbnail"},[s("div",{staticClass:"img-wrap"},[s("img",{attrs:{src:"http://upload.ixn123.com/"+t.ruleForm.goodsImg}})])]):t._e(),t._v(" "),s("el-form-item",{attrs:{label:"商品描述",prop:"goodsDetail"}},[s("el-col",{attrs:{span:11}},[s("el-input",{attrs:{type:"textarea"},model:{value:t.ruleForm.goodsDetail,callback:function(e){t.$set(t.ruleForm,"goodsDetail",e)},expression:"ruleForm.goodsDetail"}})],1)],1)],1),t._v(" "),s("div",{staticClass:"ui-box"},[s("p",{staticClass:"create-main"},[t._v("库存/规格")]),t._v(" "),s("el-form-item",{attrs:{label:"商品规格"}},[s("el-radio-group",{model:{value:t.ruleForm.standard,callback:function(e){t.$set(t.ruleForm,"standard",e)},expression:"ruleForm.standard"}},[s("el-radio",{attrs:{label:0}},[t._v("统一规格")]),t._v(" "),s("el-radio",{attrs:{label:1}},[t._v("多规格")])],1)],1),t._v(" "),0==t.ruleForm.standard?s("div",[s("el-form-item",{attrs:{label:"市场价",prop:"market"}},[s("el-col",{attrs:{span:5}},[s("el-input",{model:{value:t.ruleForm.market,callback:function(e){t.$set(t.ruleForm,"market",t._n(e))},expression:"ruleForm.market"}})],1)],1),t._v(" "),s("el-form-item",{attrs:{label:"本店价",prop:"localShop"}},[s("el-col",{attrs:{span:5}},[s("el-input",{model:{value:t.ruleForm.localShop,callback:function(e){t.$set(t.ruleForm,"localShop",t._n(e))},expression:"ruleForm.localShop"}})],1)],1),t._v(" "),s("el-form-item",{attrs:{label:"库存",prop:"stock"}},[s("el-col",{attrs:{span:5}},[s("el-input",{model:{value:t.ruleForm.stock,callback:function(e){t.$set(t.ruleForm,"stock",t._n(e))},expression:"ruleForm.stock"}})],1)],1),t._v(" "),s("el-form-item",{attrs:{label:"商品编码",prop:"goodsCode"}},[s("el-col",{attrs:{span:5}},[s("el-input",{model:{value:t.ruleForm.goodsCode,callback:function(e){t.$set(t.ruleForm,"goodsCode",e)},expression:"ruleForm.goodsCode"}})],1)],1)],1):t._e(),t._v(" "),1==t.ruleForm.standard?s("div",{staticClass:"setSpec"},[t._l(t.groups,function(e,a){return s("div",{key:a,staticClass:"specGroups"},[s("el-form-item",{attrs:{label:"规格名"}},[s("el-col",{attrs:{span:3}},[s("el-autocomplete",{attrs:{"fetch-suggestions":t.querySearchAsync,placeholder:"添加项目规格"},on:{select:t.handleSelect},model:{value:e.value,callback:function(s){t.$set(e,"value",s)},expression:"group.value"}})],1)],1),t._v(" "),""!==e.value?s("el-form-item",{attrs:{label:"规格值"}},[t._l(e.specValueLists,function(e,l){return s("div",{key:l,staticClass:"specValue"},[s("el-input",{model:{value:e.sValue,callback:function(s){t.$set(e,"sValue",s)},expression:"specValueList.sValue"}}),t._v(" "),s("i",{staticClass:"del-specValue el-icon-circle-close",on:{click:function(e){t.delSpecValue(a,l)}}})],1)}),t._v(" "),s("span",{staticClass:"add-specValue",on:{click:function(e){t.addSpecValue(a)}}},[t._v("添加规格值")])],2):t._e(),t._v(" "),s("span",{staticClass:"delSpec",on:{click:function(e){t.delGroups(a)}}},[s("i",{staticClass:"el-icon-circle-close"})])],1)}),t._v(" "),s("p",{staticClass:"ui-bg newSpec"},[s("el-button",{attrs:{size:"medium"},on:{click:t.addGroups}},[t._v("添加项目规格")])],1),t._v(" "),t.showT?s("div",{staticClass:"specDetail clearfix"},[s("span",{staticClass:"pull-left specDetail-title"},[t._v("规格明细")]),t._v(" "),s("table",{staticClass:"specTable",attrs:{border:"1",cellspacing:"0"}},[s("thead",[s("tr",[t._l(t.groups,function(e,a){return s("th",{key:a},[t._v("\n\t\t\t\t\t\t\t\t\t"+t._s(e.value)+"\n\t\t\t\t\t\t\t\t")])}),t._v(" "),s("th",[t._v("价格")]),t._v(" "),s("th",[t._v("库存")]),t._v(" "),s("th",[t._v("商品编码")])],2)]),t._v(" "),s("tbody",t._l(t.countSum(0),function(e,a){return s("tr",{key:a},[t._l(t.groups.length,function(e,l){return t.showTd(l,a)?s("td",{attrs:{rowspan:t.countSum(e)}},[t._v("\n\t\t\t\t\t\t\t\t\t"+t._s(t.getSpecAttr(l,a))+"\n\t\t\t\t\t\t\t\t")]):t._e()}),t._v(" "),s("td",[s("el-input")],1),t._v(" "),s("td",[s("el-input")],1),t._v(" "),s("td",[s("el-input")],1)],2)}))])]):t._e()],2):t._e()],1)]),t._v(" "),s("div",{staticClass:"ui-box tobasic"},[s("el-button",{attrs:{type:"primary"},on:{click:function(e){t.toSub()}}},[t._v("立即发布")])],1),t._v(" "),s("el-dialog",{attrs:{title:"选择图片",visible:t.hideUploadImg},on:{"update:visible":function(e){t.hideUploadImg=e}}},[s("el-upload",{ref:"newupload",attrs:{action:"http://api.xn.demo-xn.itdongli.com/attachment/upload/uploadimage","before-remove":t.beforeRemove,"list-type":"picture-card",multiple:"",accept:".jpg,.gif,.png",limit:1,data:t.upLoadData,onSuccess:t.uploadSuccess,"on-exceed":t.handleExceed}},[s("i",{staticClass:"el-icon-plus"}),t._v(" "),s("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传jpg/gif/png文件，且不超过500kb")])]),t._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(e){t.hideUploadImg=!1}}},[t._v("取 消")]),t._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:function(e){t.hideUploadImg=!1}}},[t._v("确 定")])],1)],1)],1):t._e()])},staticRenderFns:[]};var c=s("C7Lr")(r,n,!1,function(t){s("Uady")},"data-v-5ad3fdc6",null);e.default=c.exports},oMO2:function(t,e,s){s("A1pn"),s("IsPG"),t.exports=s("tcIe")},tcIe:function(t,e,s){var a=s("93K8"),l=s("YW8S");t.exports=s("AKd3").getIterator=function(t){var e=l(t);if("function"!=typeof e)throw TypeError(t+" is not iterable!");return a(e.call(t))}}});
//# sourceMappingURL=4.7b7588685bd6c22e99d0.js.map