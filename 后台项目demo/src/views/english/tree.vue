<template>
	
	<ul>
		<li 
			v-for="(list, index) in message" 
			v-if="list.parentid == pid" 
			:key="index" 
			style="margin-left: 50px;line-height: 2;font-size: 16px;">
			<div>
				<p style="display: inline-block;">
					<i class="el-icon el-icon-plus" style="margin-right: 10px;"></i>
					{{ list.name }}
				</p>
				<el-button type="text" @click="createThis(list.id)">添加</el-button>
				<el-button type="text" @click="updateThis(list.id,list.parentid, list.name)">修改</el-button>
				<el-button type="text" @click="deleteThis(list.id)">删除</el-button>
			</div>
			
			<el-dialog :title="title" :visible.sync="dialogFormVisible" width="30%">
				
				<el-form :model="form" label-width="100px">
					<el-form-item label="分类名称：">
						<el-input v-model="form.name" auto-complete="off"></el-input>
					</el-form-item>
				</el-form>
				
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="handleCreate" v-if="form.id == undefined">确 定</el-button>
					<el-button type="primary" @click="handleUpdate" v-else>确 定</el-button>
				</div>
				
			</el-dialog>
			
			<tree 
				:message="message" 
				:pid="list.id" 
				@fetchData="fetchData">
			</tree>
			
		</li>
	</ul>
	
</template>

<script>
	import { articleCategoryIndex, articleCategoryCreate, articleCategoryUpdate, articleCategoryDelete } from '@/api/english'
	import tree from '@/views/english/tree'
	
	export default {
		name: 'tree',
		components: {
			tree
		},
		props: ['message', 'pid'],
		data() {
			return {
				dialogFormVisible: false,
				form: {
					id: '',
					parentid: '',
					name: ''
				},
				title: '',
			}
		},
		created() {
			
		},
		methods: {
			createThis(pid) {
				this.title = "新建分类";
				delete this.form.id;
				this.form.parentid = pid;
				this.dialogFormVisible = true;
			},
			updateThis(id,pid,name) {
				this.title = "修改分类"
				this.form.id = id;
				this.form.parentid = pid;
				this.form.name = name;
				this.dialogFormVisible = true;
			},
			deleteThis(id) {
				this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					articleCategoryDelete({'id': id}).then(res => {
						if ( res.data.code == 0 ) {
							this.$message.success(res.data.message);
							this.fetchData();
						} else {
							this.$message.error(res.data.message);
						}
					})
				}).catch(() => {
					
				})
			},
			handleCreate() {
				articleCategoryCreate(this.form).then(res => {
					if ( res.data.code == 0) {
						this.$message.success(res.data.message);
						this.dialogFormVisible = false;
						this.fetchData();
					} else {
						this.$message.error(res.data.message);
					}
				})
			},
			handleUpdate() {
				articleCategoryUpdate(this.form).then(res => {
					if ( res.data.code == 0) {
						this.$message.success(res.data.message);
						this.dialogFormVisible = false;
						this.fetchData();
					} else {
						this.$message.error(res.data.message);
					}
				})
			},
			fetchData() {
				this.$emit('fetchData');
			}
		}
	}
</script>

<style>
</style>