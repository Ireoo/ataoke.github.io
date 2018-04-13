<template>
	<div class="main">

		<b-row>
			<b-col>
				<b-card title="插件管理">
					<p class="card-text">
						爱淘客网络平台是基于electron-vue创建的桌面应用系统；开发者可以创建插件收取服务费；使用者可以购买需要的插件一键使用。
					</p>
				</b-card>
			</b-col>
		</b-row>

		<b-row>
			<b-col cols="3" class="lists">
				<h2>类型</h2>
				<ul>
					<li v-for="category in categorys" :key="category">{{category}}</li>
				</ul>
				<h2>关键字</h2>
				<ul>
					<li v-for="keyword in keywords" :key="keyword">{{keyword}}</li>
				</ul>
			</b-col>
			<b-col>
				<ul class="plugins">
					<li v-for="plugin in plugins" :key="plugin.sha">
						<img :src="plugin.readme.icon" /> {{plugin.readme.name}}
						<span>{{plugin.readme.description}}</span>
						<!-- <div>{{plugin}}</div> -->
					</li>
				</ul>
			</b-col>
		</b-row>
	</div>
</template>

<script>
const moment = require("moment");
const YAML = require("js-yaml");

export default {
	name: "Plugin",
	title: "插件管理",
	data: function() {
		return {
			plugins: [],
			categorys: [],
			keywords: []
		};
	},
	filters: {
		timer: function(v) {
			return moment(v).format("MM-DD");
		}
	},
	mounted: function() {
		this.$http(
			"https://api.github.com/repos/ataoke/ataoke.github.io/contents/plugins?ref=master"
		).then(res => {
			console.log(res.data);
			this.plugins = res.data.map(v => {
				v.readme = {};
				return v;
			});
			this.plugins.map(v => {
				this.$http(
					`https://raw.githubusercontent.com/ataoke/ataoke.github.io/master/${
						v.path
					}/readme.yml`
				).then(r => {
					console.log(r.data);
					try {
						v.readme = YAML.load(r.data);
						v.readme.keywords.map(k => {
							this.keywords.push(k);
						});
						this.categorys.push(v.readme.category);
					} catch (e) {
						console.log(e);
					}
				});
			});
		});
	},
	methods: {}
};
</script>

<style scoped>
div.card {
	border: none;
	margin-bottom: 30px;
}

div.card > div.card-body {
	padding: 0;
}

div.lists h2 {
	font-size: 14px;
	font-weight: bold;
}

div.lists ul li {
	padding: 5px;
	background: #ccc;
	border-radius: 3px;
	margin-bottom: 5px;
}

ul.plugins > li {
	padding: 5px;
	font-size: 14px;
	font-weight: bold;
	border: 1px solid #fff;
	border-radius: 3px;
}

ul.plugins > li:hover {
	border: 1px solid #4898f8;
	color: #4898f8;
	cursor: pointer;
}

ul.plugins > li > img {
	width: 50px;
	height: 50px;
	margin-right: 10px;
}

ul.plugins > li > span {
	font-weight: normal;
	padding-left: 10px;
	color: #777;
}
</style>
