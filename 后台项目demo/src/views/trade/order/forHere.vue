`<template>
	<div class="container" style="min-width: 1020px;">
		<div class="ui-box">
			<div class="bg">
				<el-form ref="form" :model="form" label-width="100px" :inline="true">
					<el-row>
						<el-col :span="8">
							<el-form-item label="商品名称:">
								<el-input v-model="form.order_name" placeholder="商品名称" class="fix-width"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="订单状态:">
								<el-select v-model="form.order_status" placeholder="选择订单状态" class="fix-width">
									<el-option label="全部" value="0"></el-option>
									<el-option label="已下单" value="1"></el-option>
									<el-option label="已付款" value="2"></el-option>
									<el-option label="已发货" value="3"></el-option>
									<el-option label="已完成" value="4"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="下单时间:">
								<el-date-picker type="daterange" placeholder="选择日期和时间" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-model="form.addTime" class="fix-width"></el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="8">
							<el-form-item label="订单号:">
								<el-input v-model="form.order_sn" placeholder="订单号" class="fix-width"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="用户ID:">
								<el-input v-model="form.user_id" placeholder="用户ID" class="fix-width"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="支付时间:">
								<el-date-picker type="daterange" placeholder="选择日期和时间" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-model="form.payTime" class="fix-width"></el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="8">
							<el-form-item label="收货人姓名:">
								<el-input v-model="form.consignee" placeholder="收货人姓名" class="fix-width"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="收货人手机:">
								<el-input v-model="form.mobile" placeholder="收货人手机" class="fix-width"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="4" :push="20">
							<el-form-item>
								<el-button type="primary" @click="onSubmit" icon="el-icon-search">筛选</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</div>
		<div class="ui-box">
			<el-tabs v-model="form.order_status" type="border-card" @tab-click="onSubmit">

				<el-tab-pane label="全部" name="0">
					<div class="ui-box">
						<el-table border ref="multipleTable" tooltip-effect="dark" style="width: 100%" :data="lists">
							<el-table-column prop="" label="商品">
							</el-table-column>
							<el-table-column prop="" label="单价/数量">
							</el-table-column>
							<el-table-column prop="" label="售后">
							</el-table-column>
							<el-table-column prop="consignee" label="买家">
							</el-table-column>
							<el-table-column prop="data" label="下单时间">
							</el-table-column>
							<el-table-column prop="paid_money" label="实付金额">
							</el-table-column>
						</el-table>
					</div>
					<div class="ui-box clearfix">
						<div class="pull-right" v-if="page.num != 0">
							<el-pagination
								background
								@current-change="handleCurrentChange"
								:current-page="page.current_page"
								:page-size="page.num"
								layout="prev, pager, next"
								:total="page.total_num">
							</el-pagination>
						</div>
					</div>
				</el-tab-pane>

				<el-tab-pane label="已下单" name="1">
					<div class="ui-box">
						<el-table border ref="multipleTable" tooltip-effect="dark" style="width: 100%" :data="lists">
							<el-table-column prop="" label="商品">
							</el-table-column>
							<el-table-column prop="" label="单价/数量">
							</el-table-column>
							<el-table-column prop="" label="售后">
							</el-table-column>
							<el-table-column prop="consignee" label="买家">
							</el-table-column>
							<el-table-column prop="data" label="下单时间">
							</el-table-column>
							<el-table-column prop="paid_money" label="实付金额">
							</el-table-column>
						</el-table>
					</div>
					<div class="ui-box clearfix">
						<div class="pull-right" v-if="page.num != 0">
							<el-pagination
								background
								@current-change="handleCurrentChange"
								:current-page="page.current_page"
								:page-size="page.num"
								layout="prev, pager, next"
								:total="page.total_num">
							</el-pagination>
						</div>
					</div>
				</el-tab-pane>

				<el-tab-pane label="已付款" name="2">
					<div class="ui-box">
						<el-table border ref="multipleTable" tooltip-effect="dark" style="width: 100%" :data="lists">
							<el-table-column prop="" label="商品">
							</el-table-column>
							<el-table-column prop="" label="单价/数量">
							</el-table-column>
							<el-table-column prop="" label="售后">
							</el-table-column>
							<el-table-column prop="consignee" label="买家">
							</el-table-column>
							<el-table-column prop="data" label="下单时间">
							</el-table-column>
							<el-table-column prop="paid_money" label="实付金额">
							</el-table-column>
						</el-table>
					</div>
					<div class="ui-box clearfix">
						<div class="pull-right" v-if="page.num != 0">
							<el-pagination
								background
								@current-change="handleCurrentChange"
								:current-page="page.current_page"
								:page-size="page.num"
								layout="prev, pager, next"
								:total="page.total_num">
							</el-pagination>
						</div>
					</div>
				</el-tab-pane>

				<el-tab-pane label="已发货" name="3">
					<div class="ui-box">
						<el-table border ref="multipleTable" tooltip-effect="dark" style="width: 100%" :data="lists">
							<el-table-column prop="" label="商品">
							</el-table-column>
							<el-table-column prop="" label="单价/数量">
							</el-table-column>
							<el-table-column prop="" label="售后">
							</el-table-column>
							<el-table-column prop="consignee" label="买家">
							</el-table-column>
							<el-table-column prop="data" label="下单时间">
							</el-table-column>
							<el-table-column prop="paid_money" label="实付金额">
							</el-table-column>
						</el-table>
					</div>
					<div class="ui-box clearfix">
						<div class="pull-right" v-if="page.num != 0">
							<el-pagination
								background
								@current-change="handleCurrentChange"
								:current-page="page.current_page"
								:page-size="page.num"
								layout="prev, pager, next"
								:total="page.total_num">
							</el-pagination>
						</div>
					</div>
				</el-tab-pane>

				<el-tab-pane label="已完成" name="4">
					<div class="ui-box">
						<el-table border ref="multipleTable" tooltip-effect="dark" style="width: 100%" :data="lists">
							<el-table-column prop="" label="商品">
							</el-table-column>
							<el-table-column prop="" label="单价/数量">
							</el-table-column>
							<el-table-column prop="" label="售后">
							</el-table-column>
							<el-table-column prop="consignee" label="买家">
							</el-table-column>
							<el-table-column prop="data" label="下单时间">
							</el-table-column>
							<el-table-column prop="paid_money" label="实付金额">
							</el-table-column>
						</el-table>
					</div>
					<div class="ui-box clearfix">
						<div class="pull-right" v-if="page.num != 0">
							<el-pagination
								background
								@current-change="handleCurrentChange"
								:current-page="page.current_page"
								:page-size="page.num"
								layout="prev, pager, next"
								:total="page.total_num">
							</el-pagination>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { orderIndex } from '@/api/trade'
	import { toDate } from '@/utils/toDate'

	export default {
		name: 'forHere',
		data() {
			return {
				form: {
					'per-page': 5,
					page: 1,
					order_name: '',
					order_sn: '',
					user_id: '',
					consignee: '',
					mobile: '',
					shipping_code: '',
					address: '',
					order_status: '0',
					shipping_status: '',
					pay_status: '',
					add_time: '',
					add_end_time: '',
					pay_time: '',
					pay_end_time: '',
					shipping_time: '',
					shipping_end_time: '',
					confirm_time: '',
					confirm_end_time: '',
					addTime: '',
					payTime: '',
					shippingTime: '',
					confirmTime: '',
				},
				lists: [],
				page: {},
			}
		},
		created() {
			this.fetchData();
		},
		methods: {
			onSubmit() {
				this.fixTime();
				this.form.page = 1;
				this.fetchData();
			},
			fixTime() {
				if ( this.form.addTime != '' ) {
					this.form.add_time = this.form.addTime[0].getTime()/1000;
					this.form.add_end_time = this.form.addTime[1].getTime()/1000;
				}
				if ( this.form.payTime != '' ) {
					this.form.pay_time = this.form.payTime[0].getTime()/1000;
					this.form.pay_end_time = this.form.payTime[1].getTime()/1000;
				}
				if ( this.form.shippingTime != '' ) {
					this.form.shipping_time = this.form.shippingTime[0].getTime()/1000;
					this.form.shipping_end_time = this.form.shippingTime[1].getTime()/1000;
				}
				if ( this.form.confirmTime != '' ) {
					this.form.confirm_time = this.form.confirmTime[0].getTime()/1000;
					this.form.confirm_end_time = this.form.confirmTime[1].getTime()/1000;
				}
			},
			fetchData() {
				orderIndex(this.form).then(response => {
					if ( response.data.code == 1 ) {
						this.$message.error('未查询到数据！');
						this.lists = [];
						this.page = {
							current_page: 0,
							num: 0,
							total_num: 0
						};
					} else {
						this.lists = response.data.data;
						this.page = response.data.page_info;
						console.log(this.page);
						for(let i = 0; i < this.lists.length; i++) {
							this.lists[i].data = toDate(this.lists[i].add_time);
						}
					}

				})
			},
			handleCurrentChange: function(currentPage) {
				this.form.page = currentPage;
				this.fetchData();
			}
		}
	}
</script>

<style type="text/css">
	.bg {
		background-color: #f2f2f2;
		padding-top: 15px;
	}

	/*强制统一表单宽度*/
	.fix-width {
		width: 220px !important;
	}
</style>