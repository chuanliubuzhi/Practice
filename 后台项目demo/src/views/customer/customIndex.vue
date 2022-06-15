<template>
	<div class="container" style="min-width: 970px;">
		<div class="box">
			<el-form inline ref="form" :model="form" label-width="100px">
				
				<el-form-item label="姓名：">
					<el-input v-model="form.username" class="widthFix"></el-input>
				</el-form-item>

				<el-form-item label="手机号码：">
					<el-input v-model="form.mobile" class="widthFix"></el-input>
				</el-form-item>
			
				<!-- <el-form-item label="微信昵称：">
					<el-input v-model="form.wechat" class="widthFix"></el-input>
				</el-form-item> -->

				<el-form-item style="margin-left:30px;">
					<el-button type="primary" @click='fetchData'>筛选</el-button>
					<el-button type="text" @click='clearForm'>清空筛选条件</el-button>
				</el-form-item>

			</el-form>
		</div>

		<div style="margin-top: 20px;">
			<el-button type="primary" @click="$router.push('/customer/editCustom')">新增用户</el-button>
			<el-table
				style="width: 100%"
				highlight-current-row 
				:data="lists"
				ref="multipleTable"
				@selection-change="handleSelectionChange">

				<el-table-column
					type="selection"
					width="55">
				</el-table-column>

				<el-table-column
					prop="username"
					label="姓名">
				</el-table-column>

				<el-table-column
					prop="mobile"
					label="手机号码">
				</el-table-column>

				<!-- <el-table-column
					prop="wechat"
					label="微信号/微信昵称">
				</el-table-column> -->

				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button type="primary" @click="edit(scope.row)">编辑</el-button>
						<el-button type="danger" @click="deleteThis(scope.row)">删除</el-button>
					</template>
				</el-table-column>

			</el-table>
		</div>

		<div class="clearfix" style="margin-top: 10px;">
			<el-button type = "danger" size="small" @click="deleteGrop()">删除</el-button>
			
			<el-pagination
				class="pull-right"
				background
      			layout="prev, pager, next"
				
				@current-change="handleCurrentChange"
				:page-size="page.total_page"
				:total="page.total_num">
			</el-pagination>
		</div>

	</div>
</template>

<script>
  import { customIndex, deleteCustom, editCustom } from '@/api/customer'
	export default {
		name:'customer',
		data () {
		  	return {
				//表单
				form: {
					page: '',
					id: '',
					username:'',
					mobile:'',
				},
				//表格数据
				lists:[],
				//多选数组
				multipleSelection: [],
				page: {},
	  		}
	  	},
		created(){
			this.fetchData();
		},
		methods : {
			//筛选(分页)
		    fetchData(){
				let data = {
					'page': this.form.page,
					'per-page': 5,
					'username': this.form.username,
					'mobile': this.form.mobile,
				}
				customIndex(data).then(res => {
					if(res.data.code == 1){
						this.$message.error('未查询到数据！');
						this.lists = [];
						this.page = {
							current_page: 0,
							num: 0,
							total_num: 0
						};
					} else {
						this.lists = res.data.data;
						this.page = res.data.page_info;
					}
				});
			},

			handleCurrentChange (currentPage) {
				this.form.page = currentPage;
				this.fetchData();
			},
			
			//清空筛选条件
			clearForm () {
				this.form.username = '';
				this.form.mobile = '';
				this.fetchData();
			},
			//修改用户信息
			edit(row) {
				this.$router.push({
					name: 'editCustom',
					params: {
						'id': row.id
					}
				})
			},
			//单条删除
			deleteThis(row) {
				this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deleteCustom(row.id).then(res => {
						if ( res.data.code == 0 ) {
							this.$message.success(res.data.message);
							this.fetchData();
						} else {
							this.$message.error(res.data.message);
						}
					})
				}).catch(() => {
					this.$message.info('已取消删除');
				});
			},
			//删除一个或多个文章
			deleteGrop () {
				if(this.multipleSelection.length > 0){
					this.$confirm('此操作将永久删除' + this.multipleSelection.length + '个用户，是否继续？','提示',{
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						for (let i = 0 ; i < this.multipleSelection.length ; i++) {
							deleteCustom(this.multipleSelection[i].id).then(res => {
								this.$message.success('删除了' + this.multipleSelection.length + '个用户');
								this.fetchData();
							}).catch(res => {
								this.$message.error('删除失败！');
							});
						}
					}).catch(() =>{
						//this.$refs.multipleSelection.clearSelection();
						this.multipleSelection = [];
						this.$message('已取消操作！');
					});
				} else {
					this.multipleSelection = [];
					this.$message('请选择要删除的用户！');
				}
			},
			handleSelectionChange (val) {
				this.multipleSelection = val;
			}
	    }
	};

</script>

<style scoped>
	.box {
		background-color: #F2F2F2;
		padding: 20px;
		margin-top: 20px;
	}
	.widthFix {
		width: 200px !important;
	}
</style>