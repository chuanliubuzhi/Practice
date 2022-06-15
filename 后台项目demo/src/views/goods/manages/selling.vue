<template>

	<div class="goods-list container newcon">
		<div class="clearfix ui-box">
			<div class="pull-left">
				<router-link :to="{name:'create'}" class="addGoods">
					添加商品
				</router-link>
			</div>
			<div class="pull-right">
				<el-dropdown>
				  <span class="el-dropdown-link">
				    下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
				  </span>
				  <el-dropdown-menu slot="dropdown">
				    <el-dropdown-item command="a">黄金糕</el-dropdown-item>
				    <el-dropdown-item command="b">狮子头</el-dropdown-item>
				    <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
		<div class="ui-box">
			<el-table
				border
			    ref="sellingTable"
			    tooltip-effect="dark"
			    style="width: 100%"
			    :data="lists"
			    >
			    <el-table-column type="selection" width="55">
			    </el-table-column>

			    <el-table-column prop="goods_name" label="商品名" width="120" show-overflow-tooltip>
			    </el-table-column>

			    <el-table-column label="缩略图" width="120">
			    	<template slot-scope="scope">
			    		<div class="goods-img">
			    			<img :src=" scope.row.img  " />
			    		</div>
			    	</template>
			    </el-table-column>

			    <el-table-column prop="shop_price" label="价格" width="120">
			    </el-table-column>

			    <el-table-column prop="last_update" label="创建时间" show-overflow-tooltip>
			    </el-table-column>

			    <el-table-column prop="goods_sn" label="商品编号" show-overflow-tooltip>
			    </el-table-column>

			    <el-table-column prop="address" label="操作" show-overflow-tooltip>
			      	<template slot-scope="scope">
			       	 	<el-button size="mini" @click="etGoods(scope.$index,scope.row)">编辑</el-button>
			       		<el-button size="mini" type="danger" @click="delGoods(scope.$index,lists)">删除</el-button>
			      	</template>
			    </el-table-column>

			</el-table>
		</div>
		<div class="ui-box clearfix">
			<div class="pull-left">
				<el-button size="small" plain>修改模板</el-button>
				<el-button size="small" plain>下架</el-button>
				<el-button size="small" plain>删除</el-button>
				<el-button size="small" plain>更多</el-button>
			</div>
			<div class="pull-right">
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



	</div>

</template>

<script>

	import { goodsIndex,deleteGoods } from '@/api/goods'
	import { toDate } from '@/utils/toDate'

	export default {
		name:'selling',
		data (){
			return {
				visible2:false,
				size: 6,
				currentPage: 1,
				lists:[],
				page:{},
				showDialog:false,
				selectTable:{}
			}
		},
		created() {
		    this.fetchData()
		},
		methods: {
		    fetchData() {
		    	let paging = {
		    		'page':this.currentPage ,
		    		'per-page':this.size
		    	}
		      	goodsIndex(paging).then(response => {
		      		//console.log(response);
			        this.lists = response.data.data ;
			        for (let i = 0; i < this.lists.length; i++) {
						this.lists[i].last_update = toDate(this.lists[i].last_update);
						this.lists[i].img = "upload.ixn123.com/" + this.lists[i].original_img + "&oss-process=h_60,w_60";
					}
			        this.page=response.data.page_info ;
		      	})
		    },
		    /*handleSizeChange: function (size) {
		        this.size = size;
		        this.fetchData();
		    },*/
		    handleCurrentChange: function(currentPage){
		        this.currentPage = currentPage;
		        this.fetchData();
		    },
		    etGoods: function (index,row){
		    	this.$router.push({
		    		name:'goodsEdit',
		    		params:{
		    			catid:row.cat_id,
			   			goodsName:row.goods_name,
			   			goodsSn:row.goods_sn,
			   			goodsContent:row.goods_content,
			   			originalImg:row.original_img,
			   			marketPrice:row.market_price,
			   			shopPrice:row.shop_price,
			   			goodsId:row.goods_id,
			   			storeCount:row.store_count
		    		}
		    	});
		    },
		    delGoods: function (index,tbl){
		    	let goods = {
		    		'goods_id':tbl[index].goods_id
		    	}
		    	var th = this ;
		        th.$confirm('将永久删除该商品, 是否继续?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	deleteGoods(goods).then(response => {
		        		if ( response.data.code == 0 ){
		        			th.$message({
				            	type: 'success',
				            	message: '删除成功!'
				        	});
				        	tbl.splice(index, 1);
				        	//console.log(response) ;
		        		}else{
		        			th.$message({
				           	 	type: 'info',
				           	 	message: '删除失败!'
				          	});
				          	//console.log(response) ;
				          	return ;
		        		}
			      	})

		        }).catch(() => {
		          	th.$message({
		           	 	type: 'info',
		           	 	message: '已取消删除'
		          	});
		        });
		    }
		}

	}

</script>

<style lang="scss" scoped>

	.goods-img{
		padding-left: 18px;
	    padding-right: 18px;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: normal;
	    word-break: break-all;
	    box-sizing: border-box;
	    img {
	    	width: 60px;
		    height: 60px;
		    vertical-align: middle;
		    border: 1px solid rgb(244, 242, 242);
		    padding: 1px;
		    margin: 2px 0px;
		    background-color: rgb(255, 255, 255);
	    }
	}
	.addGoods{
		display: inline-block;
	    line-height: 1;
	    white-space: nowrap;
	    cursor: pointer;
	    background: #fff;
	    border: 1px solid #dcdfe6;
	    border-color: #dcdfe6;
	    color: #606266;
	    -webkit-appearance: none;
	    text-align: center;
	    box-sizing: border-box;
	    outline: none;
	    margin: 0;
	    transition: .1s;
	    font-weight: 500;
	    -moz-user-select: none;
	    -webkit-user-select: none;
	    -ms-user-select: none;
	    padding: 12px 20px;
	    font-size: 14px;
	    border-radius: 4px;
	    color: #fff;
	    background-color: #409eff;
	    border-color: #409eff;
	    &:hover{
	    	background-color: #66b1fd;
	    	border-color: #66b1fd;
	    }
	}

</style>
