<template>

	<div class="container newcon">
		<div class="ui-box">
			<el-table border ref="multipleTable" :data="soldoutGoods" tooltip-effect="dark" style="width: 100%" >
				
			    <el-table-column type="selection" width="55">
			    </el-table-column>
			    
			    <el-table-column prop="goods_name" label="商品名" width="120">
			    </el-table-column>
			    
			    <el-table-column prop="shop_price" label="价格" show-overflow-tooltip>
			    </el-table-column>
			    
			    <el-table-column prop="last_update" label="创建时间" show-overflow-tooltip>
			    </el-table-column>
			    
			    <el-table-column prop="address" label="管理" show-overflow-tooltip>
			      <template slot-scope="scope">
			        <el-button size="mini" type="danger">删除</el-button>
			      </template>
			    </el-table-column>
			    
			</el-table>
		</div>
		<div class="ui-box clearfix">
			<div class="pull-left">
				<el-button size="small" plain>修改模板</el-button>
				<el-button size="small" plain>删除</el-button>
				<el-button size="small" plain>更多</el-button>
			</div>
			<div class="pull-right">
				<el-pagination
				  background
				  @size-change="handleSizeChange"
    			  @current-change="handleCurrentChange"
			      :current-page="page.current_page"
			      :page-sizes="[6, 20, 40, 50]"
			      :page-size="page.num"
			      layout="total, sizes, prev, pager, next, jumper"
			      :total="page.total_num">
			    </el-pagination>
			</div>
		</div>
	</div>

</template>

<script>
	
	import { goodsIndex,deleteGoods } from '@/api/goods'
	import { toDate } from '@/utils/toDate'
	
	export default {
		name:'soldout',
		data (){
			return {
				size: 6,
				currentPage: 1,
				soldoutGoods:[],
				page:{},
			}
		},
		created (){
			this.fetchData()
		},
		methods:{
			fetchData() {
		    	let search = {
		    		'in_stock':0,
		    		'page':this.currentPage ,
		    		'per-page':this.size 
		    	}
		      	goodsIndex(search).then(response => {
		      		//console.log(response);
		      		this.soldoutGoods = response.data.data ;
			        for (let i = 0; i < this.soldoutGoods.length; i++) {
						this.soldoutGoods[i].last_update = toDate(this.soldoutGoods[i].last_update);
					}
			        this.page=response.data.page_info ;
		      	})
		    },
		    handleSizeChange: function (size) {
		        this.size = size;
		        this.fetchData();
		    },
		    handleCurrentChange: function(currentPage){
		        this.currentPage = currentPage;
		        this.fetchData();
		    }
		}
	}
	
</script>

<style>
</style>