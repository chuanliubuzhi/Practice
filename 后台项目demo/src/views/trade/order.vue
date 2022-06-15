<template>
	
	<div>

		<div class="third-menu">
			<ul class="clearfix">
				<li v-for="(list,index) in lists" :key="index" @click="toggle(index)">
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

<script>
	export default {
		name: 'order',
		data() {
			return {
				num: 0,
				lists: [
					{
						name: '堂食订单',
						path: '/trade/order/forHere'
					},
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

<style>

</style>