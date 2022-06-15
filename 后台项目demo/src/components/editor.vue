<template>
  <div>
    <script 
    	id="editor" 
    	type="text/plain" 
    	style="width:1024px;height:500px;">
   	</script>
  </div>
</template>

<script>
const UE = require('UE');// eslint-disable-line

export default {
  name: 'UE',
  props: ['content'],
  data() {
      return {
      	editor: null,
      }
  },
  mounted() {
      const _this = this;
      this.editor = UE.getEditor('editor', this.config); // 初始化UE
      this.editor.addListener("ready", function () {
        _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
      });
    },
  methods: {
    getEditor() {
    	this.$emit('getContent',this.editor.getContent());
    },
    setEditor() {
    	let that = this;
    	this.editor.ready(function () {
    		setTimeout(function() {
    			that.editor.setContent(that.content);
    		},200)
    	})
    }
  },
  mounted() {
    this.editor = UE.getEditor('editor');
    // var ue = UE.getEditor('editor');
    // UE.Editor.prototype._bkGetActionUrl=UE.Editor.prototype.getActionUrl;
    // UE.Editor.prototype.getActionUrl=function(action){
    //     if (action == 'uploadimage'){
    //         return 'http://api.xn.demo-xn.itdongli.com/attachment/upload/uploadimageforueditor';    /* 这里填上你自己的上传图片的action */
    //     }else{
    //         return this._bkGetActionUrl.call(this, action);
    //     }
    // };
    this.setEditor();
    this.editor.addListener('contentChange', this.getEditor);
  },
  destroyed() {
    this.editor.destroy();
  },
};
</script>

<style>

</style>