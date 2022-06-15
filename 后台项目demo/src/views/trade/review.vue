<template>
	<div class="container">
		<el-tabs v-model="activeName">
			<el-tab-pane label="全部评价" name="first">
				<all-review></all-review>
			</el-tab-pane>
			<el-tab-pane label="好评" name="second">
				<good-review></good-review>
			</el-tab-pane>
			<el-tab-pane label="中评" name="third">
				<common-review></common-review>
			</el-tab-pane>
			<el-tab-pane label="差评" name="fourth">
				<bad-review></bad-review>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script type="text/javascript">
	import allReview from  './components/review/all-review'
	import goodReview from  './components/review/good-review'
	import commonReview from  './components/review/common-review'
	import badReview from  './components/review/bad-review'
	
	export default {
		name: 'review',
		components: { allReview, goodReview, commonReview, badReview },
		data() {
			return {
				activeName: 'first'
			}
		}
	}
</script>

<style type="text/css">

</style>