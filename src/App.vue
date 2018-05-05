<template>
	<div id="app">
		<vue-header></vue-header>
		<div :class="{'body': true, 'noHead': !$store.state.site.showHeader, 'noFoot': !$store.state.site.showFooter}">
			<router-view/>
		</div>
		<!-- <vue-footer></vue-footer> -->
	</div>
</template>

<script>
import VueHeader from "./include/vueHeader.vue";
import VueFooter from "./include/vueFooter.vue";

export default {
	components: {
		VueFooter,
		VueHeader
	},
	name: "app",
	data: function() {
		return {
			showHeader: true
		};
	},
	watch: {
		"$route.meta.title": function(v) {
			document.title = `${v} - ${this.$store.state.site.page}`;
		}
	},
	mounted: function() {
		document.title = `${this.$route.meta.title} - ${
			this.$store.state.site.page
		}`;

		this.$nextTick(function() {});
	}
};
</script>

<style>
/* @import url("/static/css/style.css");
@import url("//at.alicdn.com/t/font_626708_k7nzxp7adeptlnmi.css"); */
</style>
