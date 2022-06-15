<template>
	<div class="container">
		
		<el-button type="primary" size="mini" @click="createType">新建桌位类型</el-button>
		
		<el-table
			:data="lists"
			tooltip-effect="dark"
			style="width: 100%;margin-top: 10px;">
			
			<el-table-column 
				prop="type" 
				label="桌位类型">
			</el-table-column>
			
			<el-table-column
				label="操作"
				show-overflow-tooltip>
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
  
	</div>
</template>

<script>
	import {  } from '@/api/food'
	
	export default {
		name:'tables',
		data () {
			return {
				lists: [
					{
		        		type: '小桌（1-2）人',
		        	}
				],
			}
		},
		created () {
			
		},
		methods: {
			createType: function () {
				
			},
			handleEdit: function () {
				
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>