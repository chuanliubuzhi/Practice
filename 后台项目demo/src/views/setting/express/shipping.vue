<template>
	<div class="goods-list container newcon">
		<div class="clearfix ui-box">
			<el-form inline ref="form" :model="form" label-width="80px">
				<el-form-item label="公司代码">
					<el-input v-model="form.code"></el-input>
				</el-form-item>
				<el-form-item label="公司名称">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="业务描述">
					<el-input v-model="form.desc"></el-input>
				</el-form-item>
				<el-form-item label="保险费">
					<el-input v-model="form.insure"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">立即创建</el-button>
					<el-button>取消</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="ui-box">
			<el-table border ref="multipleTable" tooltip-effect="dark" style="width: 100%" :data="lists">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="shipping_id" label="公司编号" width="55">
				</el-table-column>
				<el-table-column prop="shipping_code" label="公司代码" width="120">
				</el-table-column>
				<el-table-column prop="shipping_name" label="公司名称" width="200">
				</el-table-column>
				<el-table-column prop="shipping_desc" label="业务描述" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="insure" label="保险" width="55">
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
		</div>
	</div>
</template>

<script>
	import { shipping } from '@/api/trade'
	import { addShipping } from '@/api/trade'

	export default {
		name: 'shipping',
		data() {
			return {
				lists: [],
				page: {},
				form: {
					code: '',
					name: '',
					desc: '',
					insure: '',
				}
			}
		},
		created() {
			this.fetchData()
		},
		methods: {
			fetchData() {
				shipping().then(response => {
					this.lists = response.data.data;
					this.page = response.data.page_info;
				})
			},
			onSubmit() {
				addShipping(this.form).then(() => {
					this.fetchData();
				});
			},
		}
	}
</script>

<style>

</style>