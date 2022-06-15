<template>
	<div class="container newcon">
		<div class="ui-box clearfix">

			<div class="pull-left">
				<push-image @onSuccess='fetchData'></push-image>
			</div>

			<div class="pull-right">

				<el-select
					v-model="value"
					placeholder="请选择"
					style="width:120px"
					@change="fetchData('reset')">
					<el-option
						v-for="(option,index) in options"
						:key="option.catid"
						:label="option.name"
						:value="option.catid">
					</el-option>
				</el-select>

				<el-input v-model="input" placeholder="请输入内容" style="width:120px"></el-input>

				<el-button type="primary" icon="el-icon-search" @click="fetchData('reset')">搜索</el-button>

			</div>

		</div>

		<div class="ui-box">
			<el-table
				border
				ref="multipleTable"
				:data="lists"
				tooltip-effect="dark"
				style="width: 100%">

				<el-table-column type="selection" width="55">
				</el-table-column>

				<el-table-column label="预览" width="120">
					<template slot-scope="scope">
						<img :src="scope.row.img" style="width: 100px;height: 100px;" />
					</template>
				</el-table-column>

				<el-table-column label="文件名">

					<template slot-scope="scope">
						<div v-if="!scope.row.isUpdateName" @click="updateName(scope.row, $event)">
							<span>{{scope.row.filename}}</span>
							<i class="el-icon-edit el-input__icon"></i>
						</div>
						<el-input
							v-model="scope.row.filename"
							placeholder="请输入内容"
							v-else
							@blur="handleUpdate(scope.row, scope.row.filename)">
						</el-input>
					</template>

				</el-table-column>

				<el-table-column prop="date" label="发布时间">
				</el-table-column>

				<el-table-column label="管理">
					<template slot-scope="scope">
						<el-button type="text" icon="el-icon-delete" @click="deleteThis(scope.row.aid)">删除</el-button>
						<el-button type="text" icon="el-icon-setting" @click="updateThis(scope.row)">设置分组</el-button>
					</template>
				</el-table-column>

			</el-table>
		</div>
		<!--分页-->
		<div class="ui-box clearfix">
			<div class="pull-right">
				<el-pagination
					background
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="page.current_page"
					:page-size="10"
					layout="prev, pager, next"
					:total="page.total_num"
					v-if="page.total_num != undefined">
				</el-pagination>
			</div>
		</div>
		<!--设置分组对话框-->
		<el-dialog title="设置分组" :visible.sync="dialogTableVisible" width="30%">
			<el-table :data="dialogTable">
				<el-table-column property="name" label="分组" width="150"></el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button type="text"
							icon="el-icon-setting"
							@click="handleUpdate(scope.row)"
							v-if="dialog.catid != scope.row.catid">选择该分组</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-dialog>

	</div>
</template>

<script>
	import pushImage from '@/components/imageUpload/pushImage'
	import { getImage,getImageByGroup,getGroup,deleteImage,updateImage } from '@/api/setting'
	import { toDate } from '@/utils/toDate'

	export default {
		name: 'setImage',
		components: {
			pushImage
		},
		created() {
			this.fetchData();
			getGroup().then(res => {
				this.options = res.data.data;
				this.options.unshift({catid: '',name: '全部分组'});
				this.dialogTable = this.options.slice(1);
			})
		},
		data() {
			return {
				size: 10,
				currentPage: 1,
				lists: [],
				page: {},
				options: [],
				value: '',
				input: '',
				dialogTableVisible: false,
				dialog: {
					aid: "",
					name: "",
					catid: ""
				},
				dialogTable: []
			}
		},
		methods: {
			fetchData(arg) {
				if ( arg == 'reset' ) {
					this.currentPage = 1;
				}
				if ( this.value == '' ) {
					getImage(this.size, this.currentPage).then(response => {
						this.lists = [];
						this.page = {};
						if ( response.data.code == 0 ) {
							this.lists = response.data.data;
							this.page = response.data.page_info;
							for(let i = 0; i < this.lists.length; i++) {
								this.lists[i].date = toDate(this.lists[i].uploadtime);
								this.lists[i].img = "http://upload.ixn123.com/" + this.lists[i].filepath + "&oss-process=h_100,w_100";
								this.lists[i].isUpdateName = false;
							}
						}
					})
				} else {
					getImageByGroup(this.value,this.size, this.currentPage,this.input).then(response => {
						this.lists = [];
						this.page = {};
						if ( response.data.code == 0 ) {
							this.lists = response.data.data;
							this.page = response.data.page_info;
							for(let i = 0; i < this.lists.length; i++) {
								this.lists[i].date = toDate(this.lists[i].uploadtime);
								this.lists[i].img = "http://upload.ixn123.com/" + this.lists[i].filepath + "&oss-process=h_100,w_100";
								this.lists[i].isUpdateName = false;
							}
						}

					})
				}
			},
			handleSizeChange: function (size) {
				this.size = size;
				this.fetchData();
			},
			handleCurrentChange: function (currentPage) {
				this.currentPage = currentPage;
				this.fetchData();
			},
			deleteThis: function (aid) {
				this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deleteImage(aid).then(res => {
						this.fetchData();
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			updateThis: function (row) {
				this.dialogTableVisible = true;
				this.dialog.aid = row.aid;
				this.dialog.name = row.filename;
				this.dialog.catid = row.catid;
			},
			handleUpdate: function (row, name) {
				if ( name ) {
					this.dialog.name = name;
				}
				this.dialog.catid = row.catid;
				updateImage(this.dialog).then(res => {
					if ( res.data.code == 0 ) {
						this.$message.success(res.data.message);
					} else {
						this.$message.error(res.data.message);
					}
					this.dialogTableVisible = false;
					this.fetchData();
				})
			},
			updateName: function (row,event) {
				row.isUpdateName = true;
				row.filename = row.filename + " ";
				row.filename = row.filename.slice(0,-1);
				this.dialog.aid = row.aid;
				this.dialog.name = row.filename;
				this.dialog.catid = row.catid;
			}
		}
	}
</script>

<style>
	.pt15 {
		padding-top: 15px;
	}
	.mr15 {
		margin-right: 15px;
	}
</style>
