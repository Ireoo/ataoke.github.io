<template>
	<div class="header" v-if="$store.state.site.showHeader">
		<div class="main-header">
			<div>
				<ul class="left">
					<li class="logo">
						<router-link to="/">
							<i class="iconfont icon-wangluo"></i>
							<span v-text="$store.state.site.name"></span>
						</router-link>
					</li>
				</ul>

			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "vue-header",
	data: function() {
		return {
			QRcodeShow: false
		};
	},
	mounted: function() {
		this.$nextTick(function() {
			// this.site.name = "123";
		});
	}
};
</script>

<style scoped>
div.header {
	height: 40px;
}

div.header > div.main-header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 40px;
	background: RGBA(0, 0, 0, 0.8);
	color: #fff;
	text-align: left;
	line-height: 40px;
	padding: 5px;
	z-index: 1;
}

div.header > div.main-header > div {
	padding: 0 5px;
	max-width: 900px;
	margin: auto;
}

div.header > div.main-header > div > ul {
	line-height: 30px;
	width: 50%;
	display: inline-block;
	list-style-type: none;
	padding: 0;
}

div.header > div.main-header > div > ul.left {
	float: left;
}

div.header > div.main-header > div > ul.right {
	text-align: right;
	float: right;
}

div.header > div.main-header > div > ul > li {
	line-height: 30px;
	display: inline-block;
	margin: 0 10px;
}

div.header > div.main-header > div > ul > li > button {
	display: flex;
	/*Flex布局*/
	display: -webkit-flex;
	/* Safari */
	align-items: center;
	/*指定垂直居中*/
}

div.header > div.main-header > div > ul > li > a {
	color: #fff;
	line-height: 30px;
}

div.header > div.main-header > div > ul > li > a:hover {
	color: #ff7272;
}

div.header > div.main-header > div > ul > li.logo > a:hover {
	text-decoration: none;
}

div.header > div.main-header > div > ul > li > a > i,
div.header > div.main-header > div > ul > li > a > svg,
div.header > div.main-header > div > ul > li > a > img {
	margin-right: 5px;
}

div.header > div.main-header > div > ul > li.logo > a > i,
div.header > div.main-header > div > ul > li.logo > a > svg,
div.header > div.main-header > div > ul > li.logo > a > img {
	font-size: 20px;
	color: #ff0000;
}

div.header > div.main-header > div > ul > li.logo > a > span {
	font-size: 14px;
}

div.header > div.main-header > div > ul > li.logo > a > span:hover {
	color: red;
}
</style>
