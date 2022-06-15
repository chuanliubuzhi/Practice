<template>
	<div>
		<div class="container" style="min-width: 950px;">
			<h3>文章搜索</h3>
			<el-form inline :model="form" style="margin-top: 20px;">
				<el-form-item label="全部分类：">
					<el-cascader
						style="width: 240px;"
						:options="typeLists"
						v-model="form.parents" 
						placeholder="请选择文章分类"
						change-on-select>
						<!-- clearable
						@change="handleChange"> -->
					</el-cascader>
				</el-form-item>
				
				<el-form-item>
					<el-button type="primary" @click="fetchData">查询</el-button>
					<el-button  @click="clearForm">清空</el-button>
				</el-form-item>
			
			</el-form>
		</div>
		
		<div class="container" style="margin-top: 20px;">
			<h3>文章列表</h3>
			<div style="margin-top: 10px;">
				<el-button type="primary" @click="$router.push('/content/articleEdit')">新增文章</el-button>
				<!-- selection-change为当选择项发生变化时会触发该事件 -->

				<el-table
					ref="multipleTable"
					:data="lists"
					tooltip-effect="dark"
					style="width: 100%;margin-top: 10px;"
					@selection-change="handleSelectionChange"
					border>
					
					<el-table-column
						type="selection"
						width="55">
					</el-table-column>
					
					<el-table-column
						prop="id"
						label="编号">
					</el-table-column>
					
					<el-table-column
						label="图片">
						<template slot-scope="scope">
							<img :src="scope.row.thumb" width='50' height='50'/>
						</template>
					</el-table-column>
					
					<el-table-column
						prop="cat_name"
						label="分类">
					</el-table-column>

					<el-table-column
						prop="title"
						label="标题">
					</el-table-column>

					<el-table-column
						prop="created_time"
						label="创建时间"
						width="160">
					</el-table-column>
					
					<el-table-column
						align="center"
						label="操作">
						<template slot-scope="scope">
							<el-button type="text" @click="edit(scope.row)">编辑</el-button>
							<el-button type="text" @click="deleteThis(scope.row)">删除</el-button>
						</template>
					</el-table-column>
					
				</el-table>
			</div>
			
			<div class="clearfix" style="margin-top: 10px;" v-if="page.num != 0">
				<el-button type = "danger" size="small" @click="deleteGrop()">删除</el-button>
				
				<el-pagination
					class="pull-right"
					background
					layout="prev, pager, next" 
					:page-size="page.total_page"
					:total="page.total_num"
					:current-page="page.current_page"
					@current-change="handleCurrentChange">
				</el-pagination>
			</div>
			
		</div>
	</div>
</template>

<script>
	import { articleIndex, articleDelete, articleCategoryIndex, articleIndexByCat, articleCategoryIndexTree } from '@/api/content'
	import { toDate } from '@/utils/toDate'
	
	export default {
		data() {
			return {
				form: {
					'per-page':5,
					page: '',
					cat_id: '',
					parents: [],
				},
				lists: [],
				page: {},
				typeLists: [],//全部分类
				multipleSelection: [],//多选数组
				// clearable: true, // 可清空选择器
			}
		},
		created() {
			this.fetchData();
			// 树形结构
			articleCategoryIndexTree().then(res => {
				this.typeLists = res.data.data;
				let rename = typeLists => {
					for (let i = 0; i < typeLists.length; i++) {
						typeLists[i].label = typeLists[i].name;
						typeLists[i].value = typeLists[i].id;	
						if ( typeLists[i].children != '' ) {
							rename(typeLists[i].children);
						} else {
							delete typeLists[i].children;
						}
					}
				}
				rename(this.typeLists);
			})
		},
		methods: {
			fetchData() {
				if ( this.form.parents.length == 0 ) {//当查询参数都为空时，查询全部
					articleIndex(this.form).then(res => {
						this.lists = res.data.data;
						this.page = res.data.page_info;
						this.lists.forEach(list => {
							list.created_time = toDate(list.created_at);
						});
					});
				} else {//否则按参数查询
					this.form.cat_id = this.form.parents.slice(-1)[0];
					articleIndexByCat( this.form ).then(res => {
						if (Object.keys(res.data.data).length === 0) {
							this.$message.error('未查询到数据！');
							this.lists = [];
							this.page = {
								current_page: 1,
								total_page: 0,
								total_num: 0
							};
						} else {
							this.$message.success('查询成功');
							this.lists = res.data.data;
							this.page = res.data.page_info;
							this.lists.forEach(list => {
								list.created_time = toDate(list.created_at);
							});
						}
						
					});
				}
			},
			// 所选即所查
			// handleChange(value) {
			// 	console.log(value);
			// 	if (value.length == 0) {
			// 		articleIndex(this.form).then(res => {
			// 			this.lists = res.data.data;
			// 			this.page = res.data.page_info;
			// 			this.lists.forEach(list => {
			// 				list.created_time = toDate(list.created_at);
			// 			});
			// 		});
			// 	} else {
			// 		let params = {
			// 				'per-page': 5,
			// 				'cat_id': value[value.length-1],
			// 				// 'name': this.form.name,
			// 			}
			// 		articleIndexByCat( params ).then(res => {
			// 			if (Object.keys(res.data.data).length == 0) {
			// 				this.$message.error('未查询到数据！');
			// 				this.lists = [];
			// 				this.page = {
			// 					current_page: 1,
			// 					total_page: 0,
			// 					total_num: 0
			// 				};
			// 			} else {
			// 				this.$message.success('查询成功');
			// 				this.lists = res.data.data;
			// 				this.page = res.data.page_info;
			// 				this.lists.forEach(list => {
			// 					list.created_time = toDate(list.created_at);
			// 				});
			// 			}
						
			// 		});
			// 	}
			// },
			clearForm() {
				this.form.parents = [];
				this.fetchData();
			},
			handleCurrentChange(currentPage) {
				this.form.page = currentPage;
				this.fetchData();
			},
			edit(row) {
				this.$router.push({
					name: 'articleEdit',
					params: {
						'id': row.id,
						'cat_id': row.cat_id
					}
				})
			},
			// 删除单条文章
			deleteThis(row) {
				this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					articleDelete(row.id).then(res => {
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
					this.$confirm('此操作将永久删除' + this.multipleSelection.length + '篇文章，是否继续？','提示',{
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						for (let i = 0 ; i < this.multipleSelection.length ; i++) {
							articleDelete(this.multipleSelection[i].id).then(res => {
								this.$message.success('删除了' + this.multipleSelection.length + '篇文章');
								this.fetchData();	
							}).catch(res => {
								this.$message.error('删除失败！');
								this.$refs.multipleTable.clearSelection();
							});
						}
					}).catch(() =>{
						this.$refs.multipleTable.clearSelection();
						this.$message('已取消操作！');
					});
				} else {
					this.$refs.multipleTable.clearSelection();
					this.$message('请选择要删除的文章！');
				}
			},
			handleSelectionChange (val) {
				this.multipleSelection = val;
			}
		}
	}
</script>

<style>
.el-cascader-menu{
	min-width: 220px;
}
</style>