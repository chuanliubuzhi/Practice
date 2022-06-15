<template>
	<div class="container">
		
		<el-button type="primary" size="mini" @click="create">新建打印机</el-button>
		
		<el-table
			ref="multipleTable"
			:data="lists"
			tooltip-effect="dark"
			style="width: 100%;margin-top: 10px;">
			
			<el-table-column 
				prop="Brand" 
				label="设备品牌">
			</el-table-column>
			
			<el-table-column
				prop="name"
				label="设备名称">
			</el-table-column>
			
			<el-table-column
				prop="eq_number"
				label="设备编号">
			</el-table-column>
			
			<el-table-column
				prop="eq_key"
				label="设备密钥">
			</el-table-column>
			
			<el-table-column
				prop="print_num"
				label="打印数量">
			</el-table-column>
			
			<el-table-column
				prop="Print_for"
				label="打印支持"
				width="250">
			</el-table-column>
			
			<el-table-column
				prop="Print_show"
				label="打印显示"
				width="150">
			</el-table-column>
			
			<el-table-column
				label="操作"
				show-overflow-tooltip
				width="150">
				<template slot-scope="scope">
					<el-button size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
  		
		<el-dialog
			title="编辑打印机信息"
			:visible.sync="dialogVisible"
			width="50%">
			<el-form :model="form" label-width="100px">
			
				<el-form-item label="设备品牌：">
					<el-radio-group v-model="form.brand">
						<el-radio label="1">易联云</el-radio>
					</el-radio-group>
				</el-form-item>
				
				<el-form-item label="设备名称：">
					<el-input 
						v-model="form.name" 
						auto-complete="off" 
						style="width: 200px;"
						placeholder="输入名称，如厨房打印机">
					</el-input>
				</el-form-item>
				
				<el-form-item label="设备号码：">
					<el-input 
						v-model="form.eq_number" 
						auto-complete="off" 
						style="width: 200px;"
						placeholder="输入设备底部的机器号">
					</el-input>
				</el-form-item>
				
				<el-form-item label="设备密钥：">
					<el-input 
						v-model="form.eq_key" 
						auto-complete="off" 
						style="width: 200px;"
						placeholder="输入密钥">
					</el-input>
				</el-form-item>
				
				<el-form-item label="打印数量：">
					<el-radio-group v-model="form.print_num">
						<el-radio label="1">1张</el-radio>
						<el-radio label="2">2张</el-radio>
						<el-radio label="3">3张</el-radio>
						<el-radio label="4">4张</el-radio>
					</el-radio-group>
				</el-form-item>
				
				<el-form-item label="打印显示：">
					<el-radio-group v-model="form.print_show">
						<el-radio label="1">按下单顺序打印菜品</el-radio>
						<el-radio label="2">按商品分组打印菜品</el-radio>
					</el-radio-group>
				</el-form-item>
				
				<el-form-item label="打印支持：" prop="type">
					<el-checkbox-group v-model="form.print_for">
						<el-checkbox label="1" name="type">外卖订单</el-checkbox>
						<el-checkbox label="2" name="type">堂食订单</el-checkbox>
						<el-checkbox label="3" name="type">扫码买单订单</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				
			</el-form>
			
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleCreate" v-if="form.id == ''">确 定</el-button>
				<el-button type="primary" @click="handleEdit" v-if="form.id != ''">确 定</el-button>
			</span>
			
		</el-dialog>
		
	</div>
</template>

<script>
	import { fetchPrinter, createPrinter, updatePrinter, deletePrinter, test } from '@/api/setting'
	
	export default {
		name:'printer',
		data () {
			return {
				dialogVisible: false,
				lists: [],
				form: {
					"id": "",
					"brand": "1",
					"name": "",
					"eq_number": "",
					"eq_key": "",
					"status": "",
					"print_num": "1",
					"print_for": [],
					"print_show": "1"
				}
			}
		},
		created () {
			this.fetchData();
		},
		methods: {
			fetchData: function () {
				fetchPrinter().then(res => {
					this.lists = this.handleData(res.data.data);
				})
			},
			create: function () {
				this.dialogVisible = true;
				this.form.id = "";
				this.form.brand = "1";
				this.form.name = "";
				this.form.eq_number = "";
				this.form.eq_key = "";
				this.form.status = "";
				this.form.print_num = "1";
				this.form.print_for = ["1","2","3"];
				this.form.print_show = "1";
			},
			handleCreate: function () {
				createPrinter(this.form).then(res => {
					if ( res.data.code == 0 ) {
						this.$message.success(res.data.message);
						this.dialogVisible = false;
						this.fetchData();
					} else {
						this.$message.error(res.data.message);
					}
				})
			},
			edit: function (index, row) {
				this.dialogVisible = true;
				this.form.id = row.id;
				this.form.brand = row.brand.toString();
				this.form.name = row.name;
				this.form.eq_number = row.eq_number;
				this.form.eq_key = row.eq_key;
				this.form.status = row.status;
				this.form.print_num = row.print_num.toString();
				this.form.print_for = row.print_for;
				this.form.print_show = row.print_show.toString();
			},
			handleEdit: function (index, row) {
				updatePrinter( this.form ).then(res => {
					if ( res.data.code == 0 ) {
						this.dialogVisible = false;
						this.$message.success(res.data.message);
						this.fetchData();
					} else {
						this.$message.error(res.data.message);
					}
				})
			},
			handleDelete: function (index, row) {
				this.$confirm('此操作将永久删除该打印机, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
					}).then(() => {
						deletePrinter( row.id ).then(res => {
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
			handleData: function (data) {
				for (let i = 0; i < data.length; i++) {
					//设备品牌
					if ( data[i].brand == 1 ) {
						data[i].Brand = "易联云";
					}
					//打印显示
					if ( data[i].print_show == 1 ) {
						data[i].Print_show = "按下单顺序打印菜品";
					} else if ( data[i].print_show == 2 ) {
						data[i].Print_show = "按商品分组打印菜品";
					}
					//打印支持
					let temp = [];
					if ( data[i].print_for.includes("1") ) {
						temp.push("外卖订单");
					}
					if ( data[i].print_for.includes("2") ) {
						temp.push("堂食订单");
					}
					if ( data[i].print_for.includes("3") ) {
						temp.push("扫码买单订单");
					}
					data[i].Print_for = temp.join("，");
				}
				return data;
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>