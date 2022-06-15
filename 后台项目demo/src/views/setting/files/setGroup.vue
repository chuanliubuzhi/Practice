<template>
	<div class="container newcon">

		<div class="ui-box">
			<el-button 
				type="primary" 
				icon="el-icon-circle-plus" 
				@click="create" 
				:disabled="isCreated">新建分组</el-button>
		</div>

		<div class="ui-box">
			<el-table :data="lists" style="width: 100%">
				<el-table-column label="分组名称" width="180">
					<template slot-scope="scope">
						<el-input v-model="scope.row.name" placeholder="请输入内容"></el-input>
					</template>
				</el-table-column>
				<el-table-column label="排序" width="180">
					<template slot-scope="scope">
						<el-input v-if="scope.row.isNew != true" v-model="scope.row.catid" placeholder="请输入内容" disabled></el-input>
					</template>
				</el-table-column>
				<el-table-column label="管理">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" @click="handleSave(scope.$index, scope.row)" v-if="scope.row.isNew == true">保存</el-button>
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)" v-else>修改</el-button>
						<el-button size="mini" type="danger" @click="handleCancel(scope.$index, scope.row)" v-if="scope.row.isNew == true">取消</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" v-else>删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		
		
	</div>

</template>

<script>
	import { getGroup,createGroup,changeGroup,deleteGroup } from '@/api/setting'
	
	export default {
		name: 'setGroup',
		data() {
			return {
				isCreated: false,
				lists: [],
				
			}
		},
		created() {
			this.getData();
		},
		methods: {
			getData() {
				getGroup().then(res => {
					this.lists = res.data.data;
				})
			},
			handleSave(index, row) {
				createGroup(this.lists[index].name,this.lists[index].catid).then(res => {
					if ( res.data.code == 0 ) {
						this.isCreated = false;
						this.getData();
					}else {
						this.$message.error('创建失败！');
					}
				})
			},
			handleEdit(index, row) {
				changeGroup(this.lists[index].name,this.lists[index].catid).then(res => {
					this.getData();
				})
			},
			handleCancel(index, row) {
				this.lists.pop();
				this.isCreated = false;
			},
			handleDelete(index, row) {
				this.$confirm('此操作将永久删除该分组, 是否继续?', '提示', {
			        confirmButtonText: '确定',
			        cancelButtonText: '取消',
			        type: 'warning'
		        }).then(() => {
		        	deleteGroup(this.lists[index].catid).then(res => {
						this.getData();
					});
		        	this.$message({
				        type: 'success',
				        message: '删除成功!'
		        	});
		        }).catch(() => {
		        	this.$message({
		        		type: 'info',
		        		message: '已取消删除'
		        	});          
		        });
			},
			create() {
				this.isCreated = true;
				this.lists.push({
					'name': '',
					'catid': '',
					'isNew': true
				});
			}
		}
	}

</script>

<style>

</style>