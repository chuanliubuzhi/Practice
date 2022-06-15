<template>

	<div class="">

		<div class="third-menu">
			<ul class="clearfix">
				<li v-for="(list,index) in lists" :key="index" @click="toggle(index)" v-if="index < 3">
					<router-link :class="{active:index == num}" :to="list.path">
						{{list.name}}
					</router-link>
				</li>
			</ul>
		</div>

		<transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>

	</div>

</template>

<script type="text/javascript">
	export default {
		name: 'express',
		data() {
			return {
				num: 0,
				lists: [{
						name: '物流公司管理',
						path: '/setting/express/shipping'
					},
					{
						name: '物流模板',
						path: '/setting/express/freight'
					},
					{
						name: '新建物流模板',
						path: '/setting/express/create'
					}
				]
			}
		},
		methods: {
			toggle(number) {
				this.num = number;
			}
		}
	}
</script>

<style type="text/css">

</style>