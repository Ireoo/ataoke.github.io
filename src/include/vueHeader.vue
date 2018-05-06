<template>
	<div class="header" v-if="$store.state.site.showHeader">
		<div class="main-header">
			<div>
				<ul>
					<li>
						<router-link to="/" class="logo">
							<i class="iconfont icon-taobao"></i>
							<span>{{$store.state.site.title}}</span>
						</router-link>

						<router-link to="/plugins">
							<span>插件</span>
						</router-link>
					</li>
				</ul>
				<br />
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
	height: 60px;
}

div.header > div.main-header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 60px;
	background: RGBA(0, 0, 0, 0.8);
	color: #fff;
	text-align: left;
	padding: 5px;
	z-index: 1;
}

div.header > div.main-header > div {
	padding: 0 5px;
	max-width: 900px;
	margin: auto;
	line-height: 50px;
}

div.header > div.main-header > div > ul {
	line-height: 50px;
	/* width: 50%; */
	display: inline-block;
	list-style-type: none;
	padding: 0;
	margin: 0;
}

div.header > div.main-header > div > ul.left {
	float: left;
}

div.header > div.main-header > div > ul.right {
	text-align: right;
	float: right;
}

div.header > div.main-header > div > ul > li {
	display: inline-block;
	line-height: 50px;
	margin: 0 10px;
	display: flex; /*Flex布局*/
	display: -webkit-flex; /* Safari */
	align-items: center; /*指定垂直居中*/
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
	margin-right: 20px;
}

div.header > div.main-header > div > ul > li > a:hover {
	color: #4898f8;
	text-decoration: none;
}

div.header > div.main-header > div > ul > li > a > i {
	margin-right: 5px;
}

div.header > div.main-header > div > ul > li > a > span {
	font-size: 14px;
	font-weight: bold;
}

div.header > div.main-header > div > ul > li > a.logo > i {
	font-size: 30px;
	color: #999;
}

br {
	clear: both;
}
</style>
