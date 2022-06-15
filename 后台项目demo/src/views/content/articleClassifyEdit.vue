<template>
	<div class="container" style="min-width: 1100px;">
		
		<h3 v-if="this.form.id == ''">新增文章分类</h3>
		<h3 v-else>编辑文章分类</h3>
		
		<el-form ref="form" :model="form" label-width="100px" style="margin-top: 20px;">
			
			<el-form-item label="父级分类：" v-if="$route.params.pid != 0">
				<el-cascader
					:options="lists"
					v-model="form.parents" 
					change-on-select>
				</el-cascader>
			</el-form-item>
			
			<el-form-item label="分类名称：">
				<el-input v-model="form.name" style="width: 220px"></el-input>
			</el-form-item>
			
			<el-form-item>
				<el-button type="primary" @click="create" v-if="this.form.id == ''">保存</el-button>
				<el-button type="primary" @click="edit" v-else>修改</el-button>
				<el-button @click="$router.push('/content/articleClassify')">取消</el-button>
			</el-form-item>

		</el-form>
		
	</div>
</template>

<script>
	import { articleCategoryCreate, articleCategoryUpdate, articleCategoryIndex, articleCategoryIndexTree, articleCategoryShowAllParent } from '@/api/content'
	
	export default {
		name: 'articleClassifyEdit',
		components: {
			
		},
		data() {
			return {
				form: {
					name: '',
					id: '',
					parentid: '',
					parents: [],
					site_id: 1// 默认传1
				},
				lists: []
			}
		},
		created() {
			if ( this.$route.params.pid == 0 ) {
				this.form.id = this.$route.params.id || '';
				this.form.name = this.$route.params.name || '';
				return;
			}
			articleCategoryIndexTree().then(res => {
				this.lists = res.data.data;
				let rename = lists => {
					for (let i = 0; i < lists.length; i++) {
						lists[i].label = lists[i].name;
						lists[i].value = lists[i].id;	
						if ( lists[i].children != '' ) {
							rename(lists[i].children);
						} else {
							delete lists[i].children;
						}
					}
				}
				rename(this.lists);
			})
			if ( this.$route.params.id !== undefined ) {//修改
				this.form.id = this.$route.params.id;
				this.form.name = this.$route.params.name;
			}
			articleCategoryShowAllParent({'id': this.$route.params.pid}).then(res => {
				res.data.data.reverse().map(item => {
					this.form.parents.push(item.id);
				})
			})
		},
		methods: {
			create() {
				if ( this.form.id == '' ) {
					delete this.form.id;
				}
				this.form.parentid = this.form.parents.slice(-1)[0] || '0';
				// delete this.form.parents;
				articleCategoryCreate(this.form).then(res => {
					if ( res.data.code == 0 ) {
						this.$message.success(res.data.message);
						this.$router.push('/content/articleClassify');
					} else {
						this.$set( this.form,"id","");
						this.$message.error(res.data.message);
					}
				})
			},
			edit() {
				this.form.parentid = this.form.parents.slice(-1)[0] || 0;
				articleCategoryUpdate(this.form).then(res => {
					if ( res.data.code == 0 ) {
						this.$message.success(res.data.message);
						this.$router.push('/content/articleClassify');
					} else {
						this.$message.error(res.data.message);
					}
				})
			}
		}
	}
</script>

<style>
</style>