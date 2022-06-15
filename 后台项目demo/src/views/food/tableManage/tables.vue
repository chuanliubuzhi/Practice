<template>
	<div class="container" ref="table">
		<el-button type="primary" size="mini" @click="create">新建桌位</el-button>
		<!-- <el-button size="mini"><a @click="changeHref" >全部下载</a></el-button> -->
		<el-table
			ref="multipleTable"
			:data="lists"
			tooltip-effect="dark"
			style="width: 100%;margin-top: 10px;">

			<el-table-column
				type="selection"
				width="55">
			</el-table-column>

			<el-table-column
				prop="name"
				label="桌位编号">
			</el-table-column>

			<el-table-column
				prop="chair"
				label="座位数">
			</el-table-column>

			<el-table-column
				label="操作"
				show-overflow-tooltip>
				<template slot-scope="scope">
					<a id="a" class="button" size="mini" @click="handleDownload(scope.$index,scope.row)" ref="download" href="#" download="">下载点餐码</a>
					<el-button size="mini" @click="edit(scope.$index,scope.row)">编辑</el-button>
					<el-button size="mini" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog
			title="提示"
			:visible.sync="dialogVisible"
			width="30%">
			<el-form :model="form">
				<el-form-item label="桌位编号：" label-width="100px">
					<el-input
						v-model="form.name"
						auto-complete="off"
						style="width: 200px;"
						pleaseholder="如001、A1"
						:rules="{ required: true, message: '请输入桌位编号', trigger: 'blur' }">
					</el-input>
				</el-form-item>
				<el-form-item label="座位数：" label-width="100px">
					<el-input-number v-model="form.chair" :min="1" :max="100"></el-input-number>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleCreate" v-if="form.table_id == ''">确 定</el-button>
				<el-button type="primary" @click="handleEdit" v-if="form.table_id != ''">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import { getTable, addTable, updataTable, deleteTable } from '@/api/food'
	import {getToken , convertImageToCanvas , scopes} from "../../../utils/auth.js"
	import "./../../../styles/index.scss"

	
	
	export default {
		name:'tables',
		data () {
			// hrefValue: ''
			// downloadValue: ''
			return {
				dialogVisible: false,
				lists: [],
				form: {
					name: "",
					chair: "",
					table_id: ""
				}
			}
		},
		created () {
			this.fetchData();	
		},
		methods: {
			
			fetchData: function () {
				getTable().then(res => {
					this.lists = res.data.data;
				})
			},
			create: function () {
				this.form.name = "";
				this.form.chair = "";
				this.form.table_id = "";
				this.dialogVisible = true;
			},
			handleCreate: function () {
				if ( this.form.name == "" ) {
					this.$message.error("请输入桌位编号");
					return this.form.name;
				}
				addTable(this.form).then(res => {
					if ( res.data.code == 0 ) {
						this.$message.success(res.data.message);
						this.dialogVisible = false;
						this.fetchData();
					} else {
						this.$message.error(res.data.message);
					}
				})
			},
			
			handleDownload: function(index,row){
				var token = getToken(),
				download = this.$refs.download,
				url="http://api.xn.demo-xn.itdongli.com/restaurant/tables/createqr?access_token="+token+"&tables="+row.id;
				download.setAttribute("download",row.id);
				download.setAttribute("href",url);
				console.log(download);
				return;
				},
			
			// handleDownload: function (index, row) {
			// 	var token = getToken(),
			// 	table = this.$refs.table,
			// 	download = this.$refs.download,
			// 	url="http://api.xn.demo-xn.itdongli.com/restaurant/tables/createqr?access_token="+ token +"&tables="+row.id;
			// 	// convertImageToCanvas(url,download);
			// },
			edit: function (row) {
				this.form.name = row.name;
				this.form.chair = row.chair;
				this.form.table_id = row.table_id;
				this.dialogVisible = true;
			},

			handleEdit: function (index,row) {
				if ( this.form.name == "" ) {
					this.$message.error("请输入桌位编号");
					return;
				}
				updataTable( this.form ).then(res => {
					if ( res.data.code == 0 ) {
						this.dialogVisible = false;
						this.$message.success(res.data.message);
						this.fetchData();
					} else {
						this.$message.error(res.data.message);
					}
				})
			},
			handleDelete: function (index,row) {
				this.$confirm('此操作将永久删除该桌子, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deleteTable( row.table_id ).then(res => {
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
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>

