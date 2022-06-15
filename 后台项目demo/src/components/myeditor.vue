<template>
<div class="wrap publish-box ">
  <div class="publish-box-wrap">
      <el-form label-position="left" label-width="140px" ref="publishModal">
        <div class="public-aticle-box">
          <div class="publish-toolbar" id="publishToolbar">

            <div class='tooltip' title="撤销" v-bind:class="[toolStates.undo == 1 ? 'tool-bar-selected' : '', toolStates.undo == -1 ? 'tool-bar-disabled' : '' ]">
              <i class="public-icon icon-701bianjiqi_chexiao" @click="execCommand('undo')">
              </i>
            </div>

            <!-- <el-tooltip transition='none' manual='true' content="撤销" placement="top" effect="light" v-bind:class="[toolStates.undo == 1 ? 'tool-bar-selected' : '', toolStates.undo == -1 ? 'tool-bar-disabled' : '' ]">
              <div class="public-icon icon-701bianjiqi_chexiao" @click="execCommand('undo')">
              </div>
            </el-tooltip> -->

            <div class='tooltip' title="重做" v-bind:class="[toolStates.redo == 1 ? 'tool-bar-selected' : '', toolStates.redo == -1 ? 'tool-bar-disabled' : '' ]">
              <i class="public-icon icon-702bianjiqi_zhongzuo" @click="execCommand('redo')">
              </i>
            </div>

            <!-- 标题 -->
            <div class='tooltip' title="标题" v-bind:class="[toolStates.Paragraph == 1 ? 'tool-bar-selected' : '', toolStates.Paragraph == -1 ? 'tool-bar-disabled' : '' ]">
              <i class="public-icon icon-725bianjiqi_biaoti" v-on:click="header()">
                                
              </i>
            </div>

            <div class='tooltip' title="加粗" v-bind:class="[toolStates.bold == 1 ? 'tool-bar-selected' : '', toolStates.bold == -1 ? 'tool-bar-disabled' : '' ]">
              <i class="public-icon icon-bold" v-on:click="execCommand('bold')">
              </i>
            </div>

            <div class='tooltip' title="斜体" v-bind:class="[toolStates.italic == 1 ? 'tool-bar-selected' : '', toolStates.bold == -1 ? 'tool-bar-disabled' : '' ]">
              <i class="public-icon icon-italic" v-on:click="execCommand('italic')">
              </i>
            </div>						

            <div class='tooltip' title="下划线" v-bind:class="[toolStates.underline == 1 ? 'tool-bar-selected' : '', toolStates.bold == -1 ? 'tool-bar-disabled' : '' ]">
              <i class="public-icon icon-underline" v-on:click="execCommand('underline')">
              </i>
            </div>

            <div class='tooltip' title="字符边框" v-bind:class="[toolStates.fontborder == 1 ? 'tool-bar-selected' : '', toolStates.bold == -1 ? 'tool-bar-disabled' : '' ]">
              <i class="public-icon icon-706bianjiqi_azifubiankuang" v-on:click="execCommand('fontborder')">
              </i>
            </div>

            <div class='tooltip' title="删除线" v-bind:class="[toolStates.strikethrough == 1 ? 'tool-bar-selected' : '', toolStates.bold == -1 ? 'tool-bar-disabled' : '' ]">
              <i class="public-icon icon-707bianjiqi_shanchuxian" v-on:click="execCommand('strikethrough')">
              </i>
            </div>

            <!-- 下角标 -->
            <div class='tooltip' title="下标" v-bind:class="[toolStates.subscript == 1 ? 'tool-bar-selected' : '', toolStates.bold == -1 ? 'tool-bar-disabled' : '' ]">
                <i class="public-icon icon-709bianjiqi_xiabiao" v-on:click="execCommand('subscript')">							
                </i>
            </div>

            <!-- 上标 -->
            <div class='tooltip' title="上标" v-bind:class="[toolStates.superscript == 1 ? 'tool-bar-selected' : '', toolStates.bold == -1 ? 'tool-bar-disabled' : '' ]">
                <i class="public-icon icon-708bianjiqi_shangbiao" v-on:click="execCommand('superscript')">							
                </i>
            </div>

            <div class='tooltip' title="清除格式" v-bind:class="[toolStates.removeformat == 1 ? 'tool-bar-selected' : '', toolStates.bold == -1 ? 'tool-bar-disabled' : '' ]">
                <i class="public-icon icon-710bianjiqi_qingchugeshi" v-on:click="execCommand('removeformat','strong','color','width')">
                </i>
            </div>

            <div class='tooltip' title="格式刷" v-bind:class="[toolStates.formatmatch == 1 ? 'tool-bar-selected' : '', toolStates.bold == -1 ? 'tool-bar-disabled' : '' ]">
                <i class="public-icon icon-711bianjiqi_geshishua" v-on:click="execCommand('formatmatch')">
                </i>
            </div>

            <!-- 自动排版 -->
            <!-- 引用 -->
            <div class='tooltip' title="引用"  v-bind:class="[toolStates.blockquote == 1 ? 'tool-bar-selected' : '', toolStates.bold == -1 ? 'tool-bar-disabled' : '' ]">
                <i class="public-icon icon-713bianjiqi_yinyong" v-on:click="execCommand('blockquote')">							
                </i>
            </div>
            
            <div class='tooltip' title="纯文本粘贴" v-bind:class="[toolStates.pasteplain == 1 ? 'tool-bar-selected' : '', toolStates.bold == -1 ? 'tool-bar-disabled' : '' ]">
                <i class="public-icon icon-714bianjiqi_chunwenbenniantie" v-on:click="execCommand('pasteplain')">
                </i>
            </div>

            <!-- <el-tooltip transition='linear' content="字体颜色" placement="top" effect="light" v-bind:class="[toolStates.forecolor == 1 ? 'tool-bar-selected' : '', toolStates.bold == -1 ? 'tool-bar-disabled' : '' ]">
                <div class="public-icon icon-716bianjiqi_zitiyanse" v-on:click="changecolor()">
                </div>
            </el-tooltip> -->


            <el-color-picker v-model="fontColor" v-on:change="changecolor()"  size="small">
            </el-color-picker>
          
            <!-- 清空文档 --><!-- dialog提示 -->
            <div class='tooltip' title="清空" effect="light" v-bind:class="[toolStates.cleardoc == 1 ? 'tool-bar-selected' : '', toolStates.bold == -1 ? 'tool-bar-disabled' : '' ]">
              <i class="public-icon icon-721bianjiqi_qingkongwendang" v-on:click="execCommand('cleardoc')"></i>
            </div>

            <div class='tooltip' title="无序列表" v-bind:class="[toolStates.insertunorderedlist == 1 ? 'tool-bar-selected' : '', toolStates.insertunorderedlist == -1 ? 'tool-bar-disabled' : '' ]">
              <i class="public-icon icon-719bianjiqi_wuxuliebiao" v-on:click="execCommand('insertunorderedlist')">
              </i>
            </div>
            <div class='tooltip' title="有序列表" v-bind:class="[toolStates.insertorderedlist == 1 ? 'tool-bar-selected' : '', toolStates.insertorderedlist == -1 ? 'tool-bar-disabled' : '' ]">
              <i class="public-icon icon-718bianjiqi_youxuliebiao" v-on:click="execCommand('insertorderedlist','decimal')">
              </i>
            </div>
            <!-- <div class="public-separator"></div> -->

            <el-tooltip content="插入图片" placement="top" effect="light" v-bind:class="[toolStates.insertImage == 1 ? 'tool-bar-selected' : '', toolStates.insertImage == -1 ? 'tool-bar-disabled' : '' ]">
              <div class="public-icon icon-745bianjiqi_tupianshangchuan" @click="ueInsertImage()">
              </div>
            </el-tooltip>
                        
            <!-- <el-tooltip content="插入视频" placement="top" effect="light" v-bind:class="[toolStates.insertvideo == 1 ? 'tool-bar-selected' : '', toolStates.insertvideo == -1 ? 'tool-bar-disabled' : '' ]">
              <div class="public-icon icon-748bianjiqi_shipin" @click="ueUploadVideo()">
              </div>
            </el-tooltip> -->
          </div>
          <div ref="editor">
          </div>
        </div>
      </el-form>
  </div>


    <!-- <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList2"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload> -->

    <el-dialog title="上传图片" :visible.sync="dialogImageVisible" v-model="dialogImageVisible" class="image-picker-dialog">
        <div class="picker-dialog-content">
            <div class="image-picker" v-show="firstImageUpload">
                <div>
                <i></i>
                <upload :onSuccess="onSuccess">
                    <el-button type="primary">点击选择图片</el-button>
                </upload>
                <span>支持绝大多数图片格式，单张图片最大支持5MB</span>
                </div>
            </div>
            <div class="public-article-pic-content" v-show="!firstImageUpload">
                <div class="public-article-img" v-for="image in uploadImageList">
                <img :src="image.url" alt="上传图片" />
                <div class="pic-choose">
                    <i class="el-icon-check" style="color:#fff;"></i>
                </div>
                </div>
                <upload :onSuccess="onSuccess" >
                    <div class="image-add">
                    </div>
                </upload>
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="usInsertMImage()">确 定</el-button>
            <el-button @click="dialogImageVisible = false">取 消</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
/* eslint-disable */

import '../../static/neditor/neditor.config';
// import '../../static/neditor/i18n/zh-cn/zh-cn.js'
import '../../static/neditor/neditor.all'
// import $ from 'jquery'
import upload from '@/components/Upload';


export default {
  name: 'home-publish',
  components: {
    upload
  },
  data() {
    return {
      fontColor: '#000',
      imgUrl: '',
    //   "&oss-process=h_100,w_100"
    //   suffix: '?imageView2/2/w/750',
      id: Math.random(10) + 'ueditorId',
      firstImageUpload: true,
      uploadImageList: [],
      innerHTML: '',
      publishModal: {
        content: this.content,
        images: []
      },
    //   工具烂的状态
      toolStates: {
        bold: 0,
        italic: 0,
        underline: 0,
        fontborder: 0,
        strikethrough: 0,
        removeformat: 0,
        subscript: 0,
        blockquote: 0,
        superscript: 0,
        formatmatch: 0,
        pasteplain: 0,
        forecolor: 0,
        cleardoc: 0,
        Paragraph: 0,
        underline: 0,
        insertImage: 0,
        insertvideo: 0,
        insertunorderedlist: 0,
        insertorderedlist: 0,
        undo: 0,
        redo: 0,
        removeFormate: 0
      },
    // 编辑器的初始化
      config: {
        toolbars: [
          []
        ],
        initialFrameWidth: null,
        initialFrameHeight: 400,
      },
      dialogImageVisible: false
    };
  },
  props: ['content'],
  mounted() {
    let that = this 
    this.$nextTick(function () {
      this.$refs.editor.id = this.id;

      this.editor = UE.getEditor(this.id, this.config);

    
      this.editor.ready(function () {

        setTimeout(function() {
            that.editor.setContent(that.content);
        },200)
        
        this.editor.addListener('contentChange', function () {
          const wordCount = this.editor.getContentLength(true);
          this.publishModal.content = this.editor.getContent();
          const plainTxt = this.editor.getPlainTxt();
        //   console.log(this.editor.getContent())
          this.$emit('getContent',this.editor.getContent());
         }.bind(this));

        this.editor.addListener('selectionchange', function () {
          const stateList = Object.keys(this.toolStates);
          var i = -1;
          while (i++ < stateList.length - 1) {
            this.toolStates[stateList[i]] = this.editor.queryCommandState(stateList[i]);
            if (stateList[i] === 'Paragraph') {
              if (this.editor.queryCommandValue(stateList[i]) == 'h3') {
                        this.toolStates[stateList[i]] = 1;
                    } else {
                        this.toolStates[stateList[i]] = 0;
                    }
            }
          }
        }.bind(this));

        this.$emit('ready', this.editor);
      }.bind(this));
    });

  },
  created() {
    if (window.addEventListener) {
      window.addEventListener('scroll', self.toolbarScroll, false);
    } else if (window.attachEvent) {
      window.attachEvent('onscroll', self.toolbarScroll);
    } else {
      window['onscroll'] = self.toolbarScroll;
    }
  },
  computed: {
    // editorContent: {
    //   get: function () {
    //     return this.editor.getContent();
    //   },
    //   set: function (content) {
    //     this.editor.setContent(content);
    //   }
    // }
  },
  methods: {
    //   选择图片
    selectImg() {
        let dialog = this.editor.getDialog("insertimage");
        dialog.title = '多图上传';
        dialog.render();
        dialog.open();
    },
    toolbarScroll: function () {
      let IO = document.getElementById('publishToolbar'),
        Y = IO,
        H = 0,
        IE6;
      if (IO) {
        while (Y) {
          H += Y.offsetTop;
          Y = Y.offsetParent
        };
        const d = document,
          s = Math.max(d.documentElement.scrollTop, document.body.scrollTop);
        if (s > 230 && s < 780) {
          IO.style.cssText = 'top:0px;position:fixed;';
        } else {
          IO.style.cssText = '';
        }
      }
    },
    changecolor: function () {
      // console.log(this.fontColor)
      this.editor.execCommand('forecolor',this.fontColor);
    },
    execCommand: function (name) {
      if (name == 'blockquote') {
        this.editor.execCommand(name,{
           style: "color: red;"
        });
        return
            }
      this.editor.execCommand(name);
    },
    // 标题
    header () {
        if (this.toolStates.Paragraph) {
            this.editor.execCommand('Paragraph', 'p');
        } else {
            this.editor.execCommand('Paragraph', 'h3');
        }
    },
    // 显示图片dialog
    ueInsertImage: function () {
      this.dialogImageVisible = true;
      this.firstImageUpload = true;
      this.uploadImageList = [];
    },
    // 插入图片
    usInsertMImage: function () {
      let imageHtml = '';
      for (const i in this.uploadImageList) {
        imageHtml += '<p><img class="mu-ue-image" src="' + this.uploadImageList[i].url + '" data-src="' + this.uploadImageList[i].url + '"><br></p>';
        this.publishModal.images.push(this.uploadImageList[i]);
      }
      this.editor.execCommand('inserthtml', imageHtml);
      this.dialogImageVisible = false;
    },
    // 图片上传成功
    onSuccess(url, file) {
      this.firstImageUpload = false;
      const im = {};
      im.src = file.files[0].name;
      im.url = url;
      im.remark = '';
      this.uploadImageList.push(im);
    }
  }
};
</script>
<style type="text/css">
.publish-box {
  margin-right: 40px;
  width: 900px;
}

.publish-box #edui1_imagescale,.publish-box .edui-editor-imagescale{display:none !important;}

.publish-box-wrap {
  position: relative;
}

.publish-box-wrap .tab-link {
  position: absolute;
  right: 0;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #65ABEC;
  letter-spacing: 0;
  top: 10px;
  z-index: 10;
}

.public-aticle-box {
  border: 1px solid #E7E7E7;
  margin-bottom: 20px;
  position: relative;
}


#editor {
  border: 1px solid #CCC;
  width: 1000px
}

#editor_toolbar_box {
  background: #F0F0EE;
  padding: 2px;
}

#editor_iframe_holder {
  border-top: 1px solid #CCC;
  border-bottom: 1px solid #CCC;
}

.publish-box .edui-editor-toolbarbox {
  display: none;
}

.publish-box .edui-default .edui-editor {
  border: none;
}

.publish-box .edui-editor-bottomContainer {
  display: none;
}

.publish-box .restore-alert .is-customed {
  color: #4e7dd2;
}

.publish-box .image-picker-dialog .el-dialog {
  width: 675px;
}

.publish-box .el-dialog__wrapper .picker-dialog-content {
  border: 2px dashed #b5b5b5;
  padding: 15px;
  box-sizing: border-box
}

.publish-box .image-picker-dialog .public-article-pic-content .upload-wrap {
  float: left;
}

.publish-toolbar {
  background: #eee none repeat scroll 0 0;
  border-bottom: 1px solid #e9e9e9;
  border-radius: 0;
  box-shadow: none;
  padding: 5px 10px 5px 20px;
  z-index: 1000;
  width: 900px;
  box-sizing: border-box;
}
.publish-toolbar .tooltip {
    display: inline-block;
}
.publish-box .video-upload-box {
  border: 1px solid #e9e9e9;
  padding: 10px;
}

.publish-box .video-upload-box .el-form-item__content{
  margin-left: 0px!important;
}

.publish-box .is-saved {
  float: right;
  margin-top: 7px;
  margin-right: 10px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #999999;
  letter-spacing: 0;
}

.publish-toolbar .tool-bar-selected {
  height: 30px;
  background-color: #fff;
}

.publish-toolbar .public-icon {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  width: 30px;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  -moz-osx-font-smoothing: grayscale;
  font-family: "iconfont" !important;
  font-size: 20px;
  color: #999;
  font-style: normal;
  text-align: center;
}


.publish-toolbar .public-icon::before {
  margin: 6px;
}

.publish-toolbar .tool-bar-disabled .public-icon {
  color: #DDD;
}
.el-color-picker {
    position: relative;
    top: 7px;
}

.publish-toolbar .public-icon{
  cursor: pointer;
}
.publish-toolbar .public-icon:hover{
  background-color: rgba(0, 0, 0, 0.2)
}

.public-separator {
  vertical-align: top;
  width: 1px;
  height: 22px;
  margin: 5px 20px 0;
  background: #D8D8D8;
  display: inline-block;
}

.front-cover-box {
  margin-top: -30px;
}

.front-cover-main {
  position: relative;
  display: block;
  margin-top: 16px;
  padding-top: 20px;
  border-top: 1px solid #e9e9e9;
}

.simple-modal .front-cover-cur {
  left: 100.016px;
}

.three-modal .front-cover-cur {
  left: 255.016px;
}

.front-cover-cur {
  position: absolute;
  top: -8px;
  width: 12px;
  height: 8px;
  background-repeat: no-repeat;
  background-color: #fff;
}

.front-cover-upload {
  float: left;
}

.front-cover-wrap {
  width: 202px;
  height: 131px;
  float: left;
  border-radius: 4px;
  margin-right: 20px;
  background-position: center;
  position: relative;
  background-color: #f0f1f3;
  background-repeat: no-repeat;
}

.video-progress-box {
  width: 90%;
}

.video-progress-box .el-progress-bar__inner {
  background-color: #FFA7D3;
}

.video-progress-text {
  margin-bottom: 16px;
}

.video-progress-text .video-n {
  display: inline-block;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #323232;
  letter-spacing: 0;
}

.video-progress-text .video-h {
  display: inline-block;
  float: right;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #999999;
  letter-spacing: 0;
}

.video-progress-box .video-progress-bar {
  position: relative;
}

.video-progress-box .video-progress-bar i {
  width: 16px;
  height: 16px;
  background-repeat: no-repeat;
  /* background-image: url(../../assets/images/tag-close.png); */
  /*display: block;*/
  top: 0;
  position: absolute;
  right: -38px;
}

.front-cover-upload .front-cover-img {
  background-position: center;
  position: relative;
  float: left;
  width: 202px;
  height: 131px;
  /*margin-right: 20px;*/
  /*background-color: #f0f1f3;*/
  cursor: pointer;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.front-cover-upload .front-cover-img:hover .cover-img-modify {
  display: inline-block;
}

.front-cover-upload .front-cover-img .cover-img-modify {
  background: rgba(0, 0, 0, 0.7) none repeat scroll 0 0;
  bottom: 0;
  color: #fff;
  cursor: pointer;
  display: none;
  height: 40px;
  left: 0;
  line-height: 40px;
  position: absolute;
  right: 0;
  text-align: center;
  width: 100%;
}

.image-add {
  width: 110px;
  height: 110px;
  position: relative;
  float: left;
  margin: 5px;
  cursor: pointer;
  background: #F7F7F7;
  border: 1px solid #E7E7E7;
  background-repeat: no-repeat;
  /* background-image: url(../../assets/images/picutre_add.png); */
  background-position: center;
}

.publish-box .video-cover-dialog .upload-wrap {
  display: inline-block;
}

.publish-box .video-cover-dialog .el-dialog__footer {
  text-align: center;
}

.publish-box .picker-dialog-content {
  width: 100%;
  min-height: 320px;
  max-height: 400px;
  text-align: center;
  vertical-align: bottom;
  margin: auto;
  /*border: 2px dashed #B5B5B5;*/
}

.picker-dialog-content .image-picker>div,
.picker-dialog-content .video-picker>div {
  display: block;
  text-align: center;
  margin: 60px auto;
}

.image-picker>div>i {
  /* background-image: url(../../assets/images/add-pic.png); */
  background-repeat: no-repeat;
  width: 70px;
  height: 70px;
  margin: auto;
  display: block;
}

.video-picker>div>i {
  /* background-image: url(../../assets/images/add-video.png); */
  background-repeat: no-repeat;
  width: 70px;
  height: 70px;
  margin: auto;
  display: block;
}

.picker-dialog-content .el-button {
  display: block;
  margin: 20px auto;
}

.image-picker>div>span,
.video-picker>div>span {
  font-size: 12px;
  color: #999999;
  letter-spacing: 0;
}


.publish-box .iphone-frame-dialog .el-dialog {
  background-color: rgba(0, 0, 0, 0);
  width: 500px;
  height: 800px;
  box-shadow: none;
  top: 5%!important;
}

.mu-ue-image-tips:empty:before {
  content: "attr(placeholder)";
  color: red;
}

.mu-ue-image-tips:focus:before {
  content: none;
}

.public-article-pic .el-dialog {
  width: 654px;
}

.public-article-pic .el-dialog .el-dialog__body {
  padding-left: 0;
  padding-right: 0;
}

.public-article-pic-content {
  overflow-x: hidden;
  max-height: 382px;
  overflow-y: auto;
}

.public-article-img {
  float: left;
  margin: 5px;
  position: relative;
  cursor: pointer;
}

.public-article-img .pic-choose {
  background: #FF74B9;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  position: absolute;
  right: 15px;
  bottom: 15px;
  text-align: center;
  line-height: 25px;
}

.public-article-img .el-icon-check {
  color: #fff;
}

.public-article-img img {
  width: 110px;
  height: 110px;
}


</style>
