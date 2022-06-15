<template>

	<div class="">

		<div class="third-menu">
			<ul class="clearfix">
				<li v-for="(list,index) in lists" :key="index" @click="toggle(index)" v-if="index < 3">
					<router-link :class="{active:index == num}" :to=" list.path">
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
		name: 'file',
		data() {
			return {
				num: 0,
				lists: [{
						name: '图片',
						path: '/setting/file/setImage'
					},
					{
						name: '分组管理',
						path: '/setting/file/setGroup'
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