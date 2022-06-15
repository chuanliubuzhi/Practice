<template>

	<div class="container">
		<div class="ui-box">
			<el-form ref="form" :model="list" label-width="100px">

				<el-form-item label="站点名称：">
					<el-input v-model="list.name" placeholder="请输入内容" style="width: 200px"></el-input>
				</el-form-item>

				<el-form-item label="店铺认证：">
					<span v-if="list.state == 0">已认证</span>
					<span v-else>
						<span>未认证</span>
						<el-button type="text">立即认证</el-button>
					</span>
					
				</el-form-item>
				
				<el-form-item label="营业执照：">
					<span v-if="list.image == ''">未上传</span>
					<img v-else :src="list.image" style="width:50px;height:50px;border:1px solid #CCC" />
				</el-form-item>

				<el-form-item label="创建时间：">
					<span>{{list.time}}</span>
				</el-form-item>

				<el-form-item label="店铺Logo：">
					<img :src="list.logo" style="width:100px;height:100px;border:1px solid #CCC;vertical-align: middle;" />
					<push-image 
						style="display: inline-block;vertical-align: middle;" 
						@selected="changeLogo" 
						imageNumber="1"></push-image>
				</el-form-item>

				<el-form-item label="店铺简介：">
					<el-input type="textarea" v-model="list.description" style="width:300px"></el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="onSubmit">保存</el-button>
					<el-button @click="onCancel">取消</el-button>
				</el-form-item>

			</el-form>
		</div>
	</div>

</template>

<script>
	import { toDate } from '@/utils/toDate'
	import { getStore, setStore } from '@/api/setting'
	import pushImage from '@/components/imageUpload/pushImage'

	export default {
		name: 'store',
		components: {
			pushImage
		},
		data() {
			return {
				list: {},
			}
		},
		created() {
			this.getData();
			
		},
		methods: {
			getData() {
				getStore().then(res => {
					this.list = res.data.data;
					this.list.time = toDate(this.list.created_at);
				})
			},
			onSubmit() {
				let data = {
					logo: this.list.logo,
					name: this.list.name,
					description: this.list.description
				}
				setStore(data).then(res => {
					if(res.data.code == 0) {
						this.$message.success('保存成功！');
					} else {
						this.$message.error('保存失败！');
					}
				})
			},
			onCancel() {
				this.getData();
			},
			changeLogo: function (images) {
				this.list.logo = images[0].img;
			}
		}
	}
</script>

<style>

</style>