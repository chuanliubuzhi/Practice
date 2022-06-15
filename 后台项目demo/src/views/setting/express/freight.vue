<template>
	<div class="container newcon">
		<div class="ui-box">
			<el-button @click='create' type="primary">新建运费模板</el-button>
		</div>
		<div class="ui-box">
			<el-table :data="lists" style="width: 100%">
				<el-table-column prop="shipping_area_name" label="模板名称">
				</el-table-column>
				<el-table-column prop="shipping_area_id" label="可配送区域">
				</el-table-column>
				<el-table-column prop="config.first_weight" label="首重（Kg）">
				</el-table-column>
				<el-table-column prop="config.money" label="运费（元）">
				</el-table-column>
				<el-table-column prop="config.second_weight" label="续重（Kg）">
				</el-table-column>
				<el-table-column prop="config.add_money" label="续费（元）">
				</el-table-column>
				<el-table-column prop="address" label="操作">
					<template slot-scope="scope">
						<el-button size="mini" type="primary">修改</el-button>
						<el-button size="mini" type="danger">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	import { getTemplate } from '@/api/trade'

	export default {
		name: 'freight',
		created() {
			getTemplate().then(response => {
				this.lists = response.data.data;
			})
		},
		data() {
			return {
				lists: [],
			}
		},
		methods: {
			create() {
				this.$router.push('/trade/express/create');
			}
		}
	}
</script>

<style>

</style>