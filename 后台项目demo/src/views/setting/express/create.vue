<template>
	<div class="container newcon">
		<div class="ui-box">
			<el-form ref="form" :model="form" label-width="100px">
				<el-form-item label="模板名称:">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="计费方式:">
					<el-radio-group v-model="form.radio">
						<el-radio label="按重量"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="配送区域:">
					<el-table border :data="tableData" style="width: 100%">
						<el-table-column prop="date" label="可配送区域">
							<template slot-scope="scope">
								<span>{{ getName }}</span>
								<el-popover ref="popover" placement="top" width="160" v-model="visible2">
									<p>确定删除吗？</p>
									<div style="text-align: right; margin: 0">
										<el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
										<el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
									</div>
								</el-popover>
								<div class="pull-right">
									<el-button type="text" @click="dialogTableVisible = true" size="small">编辑</el-button>
									<el-button v-popover:popover type="text" size="small">删除</el-button>
								</div>
								<!--对话框-->
								<el-dialog title="选择可配送区域" :visible.sync="dialogTableVisible">
									<!--穿梭框-->
									<el-transfer v-model="transfer" :data="data" :titles="['可选省、市、区', '已选省、市、区']"></el-transfer>
									<div slot="footer" class="dialog-footer">
										<el-button type="primary" @click="dialogTableVisible = false">完 成</el-button>
									</div>
								</el-dialog>

							</template>
						</el-table-column>

						<el-table-column prop="" label="首重（Kg）">
							<template slot-scope="scope">
								<el-input v-model="input.firstWeight" placeholder="0" inline class="width"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="name" label="运费（元）">
							<template slot-scope="scope">
								<el-input v-model="input.firstPrice" placeholder="0.00" inline class="width"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="name" label="续重（Kg）">
							<template slot-scope="scope">
								<el-input v-model="input.addWeight" placeholder="0" inline class="width"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="name" label="续费（元）">
							<template slot-scope="scope">
								<el-input v-model="input.addPrice" placeholder="0.00" inline class="width"></el-input>
							</template>
						</el-table-column>
					</el-table>
				</el-form-item>
				<el-form-item>
					<el-button type="text" size="small" @click="dialogTableVisible = true">指定可配送区域和运费</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">保存</el-button>
					<el-button @click="back">返回</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import { getProvince } from '@/api/trade'
	import { addTemplate } from '@/api/trade'

	export default {
		name: 'create',
		created() {
			//			addTemplate().then(response => {
			//				console.log(response)
			//			})
		},
		data() {
			//获取省级数据
			const generateData = _ => {
				let data = [];
				getProvince().then(response => {
					let lists = response.data.data;
					for(let i = 0; i < lists.length; i++) {
						data.push({
							key: lists[i].id,
							label: lists[i].name
						});
					}
				})
				return data;
			};
			return {
				data: generateData(),
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					radio: '按重量',
					desc: '',
				},
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}],
				//表单输入框
				input: {
					firstWeight: '',
					firstPrice: '',
					addWeight: '',
					addPrice: ''
				},
				visible2: false, //删除按钮弹出框
				dialogTableVisible: false, //对话框可见状态
				transfer: [], //穿梭框选中状态的ID
			}
		},
		computed: {
			getName: function() {
				let str = "";
				for(let i = 0; i < this.transfer.length; i++) {
					for(let j = 0; j < this.data.length; j++) {
						if(this.transfer[i] === this.data[j].key) {
							str += this.data[j].label + "，";
						}
					}
				}
				str = str.slice(0, -1); //去掉最后一个逗号
				return str;
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			back() {
				this.$router.push('/trade/express/freight');
			}
		}
	}
</script>

<style>
	.width {
		width: 60px;
	}
	
	.el-transfer {
		width: 500px;
		margin: 0 auto;
	}
</style>