<template>
	<div class="container">
		<div class="clearfix ui-box">
			<div class="pull-right">
				<el-dropdown>
					<span class="el-dropdown-link">
				    下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
				  </span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="a">黄金糕</el-dropdown-item>
						<el-dropdown-item command="b">狮子头</el-dropdown-item>
						<el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
		<div class="ui-box">
			<el-table border ref="multipleTable" tooltip-effect="dark" style="width: 100%" :data="lists">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="goods_id" label="商品信息" width="120">
				</el-table-column>
				<el-table-column prop="username" label="会员信息" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="add_time" label="评价时间" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="goods_rank" label="商品评分">
				</el-table-column>
				<el-table-column prop="content" label="评价内容" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="address" label="操作" show-overflow-tooltip>
					<template slot-scope="scope">
						<el-button size="mini">编辑</el-button>
						<el-button size="mini" type="primary">推广</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="ui-box clearfix">
			<div class="pull-left">
				<el-button size="small" plain>修改模板</el-button>
				<el-button size="small" plain>改分组</el-button>
				<el-button size="small" plain>下架</el-button>
				<el-button size="small" plain>删除</el-button>
				<el-button size="small" plain>更多</el-button>
			</div>
			<div class="pull-right">
				<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.current_page" :page-sizes="[10, 20, 40, 100]" :page-size="page.num" layout="prev, pager, next" :total="page.total_num">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import { reviewIndex } from '@/api/trade'

	export default {
		name: 'all-review',
		data() {
			return {
				size: 10,
				currentPage: 1,
				lists: [],
				page: {}
			}
		},
		created() {
			this.fetchData();
		},
		methods: {
			fetchData() {
				reviewIndex(this.currentPage, this.size).then(response => {
					this.lists = response.data.data;
					this.page = response.data.page_info;
				})
			},
			handleSizeChange: function(size) {
				this.size = size;
				reviewIndex(this.currentPage, this.size).then(response => {
					this.lists = response.data.data;
					this.page = response.data.page_info;
				})
			},
			handleCurrentChange: function(currentPage) {
				this.currentPage = currentPage;
				reviewIndex(this.currentPage, this.size).then(response => {
					this.lists = response.data.data;
					this.page = response.data.page_info;
				})
			}
		}
	}
</script>

<style>
	
</style>