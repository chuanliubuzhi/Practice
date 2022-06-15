<template>
	<div class="container" style="min-width: 1100px;">
		
		<h3 v-if="this.form.id == ''">新增文章</h3>
		<h3 v-else>编辑文章</h3>
		
		<el-form ref="form" :model="form" label-width="80px" style="margin-top: 20px;">
		
		<el-form-item label="文章分类">
				<el-cascader
					:options="lists"
					v-model="form.parents"
					placeholder="请选择文章分类"
					change-on-select>
				</el-cascader>
		</el-form-item>
		
		<el-form-item label="标题">
			<el-input v-model="form.title"></el-input>
		</el-form-item>
		<el-form-item label="作者">
			<el-input v-model="form.author"></el-input>
		</el-form-item>
		<!-- <el-form-item label="备注">
			<el-input v-model="form.remark"></el-input>
		</el-form-item> -->
		
		<el-form-item label="图片">
			<div style="display: inline-block;vertical-align: middle;">
				<img v-show="form.thumb != ''" :src="form.thumb" style="width: 100px;height: 100px;margin: 10px;border: 1px solid #CCC;"/>
			</div>
			<push-image @selected="getImage" style="display: inline-block;vertical-align: middle;"></push-image>
		</el-form-item>
		
        <!-- 编辑器 -->
		<el-form-item label="内容">
			<!-- <v-vueQuillEditor ref="quillEditor"></v-vueQuillEditor> -->
            <myeditor @getContent="fetchContent" :content="form.content"></myeditor>
		</el-form-item>
		
		<el-form-item>
			<el-button type="primary" @click="create" v-if="this.form.id == ''">保存</el-button>
			<el-button type="primary" @click="edit" v-else>修改</el-button>
			<el-button @click="$router.push('/content/articleLists')">取 消</el-button>
		</el-form-item>

		</el-form>
		
	</div>
</template>

<script>
    // import vueQuillEditor from '@/components/vueQuillEditor'
    import myeditor from '@/components/myeditor.vue'
	import pushImage from '@/components/imageUpload/pushImage'
	import { articleCategoryIndex, articleCategoryCreate, articleCreate, articleView, articleUpdate, articleCategoryIndexTree, articleCategoryShowAllParent } from '@/api/english'
	
	export default {
		name: 'articleEdit',
		components: {
            // 'v-vueQuillEditor': vueQuillEditor,
            pushImage,
            myeditor
		},
		data() {
			return {
				form: {
					id: '',
					cat_id:'',
					parents:[],
					title: '',
					thumb: '',
					author: '',
					content: '',
				},
				lists: [],//全部分类
				
			}
		},
		created() {
			// 树形结构
			articleCategoryIndexTree().then(res => {
				this.lists = res.data.data;
				let rename = lists => {
					for (let i = 0; i< lists.length; i++) {
						lists[i].label = lists[i].name;
						lists[i].value = lists[i].id;
						if ( lists[i].children != '') {
							rename( lists[i].children );
						} else {
							delete lists[i].children;
						}
					}
				}
				rename (this.lists);
			});
			// 修改
			if ( this.$route.params.id != undefined ) {
				this.form.id = this.$route.params.id;
				articleView( this.$route.params.id ).then(res => {
					this.form.title = res.data.data[0].title;
					this.form.author = res.data.data[0].author;
                    this.form.thumb = res.data.data[0].thumb;
                    this.form.content = res.data.data[0].content ; 
                    // console.log(this.form.content)                   
                    // this.$refs.quillEditor.content = res.data.data[0].content ;//内容返回到文本编辑器
                    this.form.id = res.data.data[0].id;
                    this.form.cat_id = res.data.data[0].cat_id;
				})
			};
			
			articleCategoryShowAllParent({'id': this.$route.params.cat_id}).then(res => {
				res.data.data.reverse().map(item => {
					this.form.parents.push(item.id);
				})
			})
		},
		
		methods: {
            fetchContent(content) {
 				this.form.content = content;
			},
			getImage(index) {
				this.form.thumb = index[0].img;
			},
			create() {
				if ( this.form.id == '' ) {
					delete this.form.id;
				}
				// this.form.content = this.$refs.quillEditor.content;//获取文本编辑器中的内容
				this.form.cat_id = this.form.parents.slice(-1).toString();
				articleCreate( this.form ).then(res => {
					if ( res.data.code == 0 ) {
						this.$message.success(res.data.message);
						this.$router.push('/content/articleLists');
					} else {
						this.$set( this.form,"id","");
						this.$message.error(res.data.message);
					}
				})

			},
			edit() {
                // console.log(this.form.content)
                // this.form.content = this.$refs.quillEditor.content;//获取文本编辑器中的内容
				this.form.cat_id = this.form.parents.slice(-1).toString();
				articleUpdate(this.form).then(res => {
					if ( res.data.code == 0 ) {
						this.$message.success(res.data.message);
						this.$router.push('/content/articleLists');
					} else {
						this.$message.error(res.data.message);
					}
				})
            },
		}
	}
</script>

<style>
</style>