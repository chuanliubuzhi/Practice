<template>
	<div>
		
		<div class="container">
			<h3>分类列表</h3>

			<el-button style="margin-top: 10px;" size="mini" type="primary" 
			@click="$router.push({name: 'articleClassifyEdit',params: {'pid': 0}})">新增根分类</el-button>

			<el-tree 
				style="margin-top: 10px;"
				:data="lists" 
				node-key="id" 
				:expand-on-click-node="false" 
				:render-content="renderContent"
				default-expand-all>
			</el-tree>

		</div>
	</div>
</template>

<script>
	import { articleCategoryIndex, articleCategoryCreate, articleCategoryUpdate, articleCategoryDelete, articleCategoryIndexWithPid, articleCategoryIndexTree } from '@/api/content'
	
	
	export default {
		name: 'articleClassify',
		data() {
			return {
				lists: [],
				form: {
					name: '',
					parentid: ''
				}
			}
		},
		created() {
			this.fetchData();
		},
		methods: {
			fetchData() {
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
				});
			},
			append(data) {
				this.$router.push({
					name: 'articleClassifyEdit',
					params: {
						'pid': data.id
					}
				})
			},
			update(data) {
				this.$router.push({
					name: 'articleClassifyEdit',
					params: {
						'id': data.id,
						'pid': data.parentid,
						'name': data.name
					}
				})
			},
			remove(data) {
				this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					articleCategoryDelete({'id': data.id}).then(res => {
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
			renderContent(h, { node, data, store }) {
			return (
				<span style="flex: 1; display: flex; align-items: center; justify-content: flex-start; font-size: 14px;">
					<span>
						<span>{node.label}</span>
					</span>
					<span style="padding-top: 3px; margin-left: 10px;">
						<el-button style="font-size: 12px;" type="text" on-click={ () => this.append(data) }>新增</el-button>
						<el-button style="font-size: 12px;" type="text" on-click={ () => this.update(data) }>修改</el-button>
						<el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(data) }>删除</el-button>
					</span>
				</span>
				);
			}
		}
	}
</script>

<style>
</style>