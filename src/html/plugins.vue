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
				<h2 v-if="categorys.length > 0">类型</h2>
				<ul v-if="categorys.length > 0">
					<li v-for="category in categorys" :key="category.title" :class="{on: category.show}" @click="category.show=!category.show">{{category.title}}
						<span>{{category.count}}</span>
					</li>
				</ul>
				<h2 v-if="keywords.length > 0">关键字</h2>
				<ul v-if="keywords.length > 0">
					<li v-for="keyword in keywords" :key="keyword.title" :class="{on: keyword.show}" @click="keyword.show=!keyword.show">{{keyword.title}}
						<span>{{keyword.count}}</span>
					</li>
				</ul>
			</b-col>
			<b-col>
				<ul class="plugins">
					<li v-for="plugin in pluginsFilter" :key="plugin.sha">
						<img :src="plugin.icon" :alt="plugin.readme.name" /> {{plugin.readme.name}}
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
	computed: {
		pluginsFilter: function() {
			let plugins = [];
			// console.log(this.plugins);
			if (this.plugins.length > 0) {
				plugins = this.plugins.filter(v => {
					let isKeywords = false;
					if (v.readme.keywords) {
						v.readme.keywords.forEach(keyword => {
							if (
								this.$has(this.keywords, {
									title: keyword,
									show: true
								})
							)
								isKeywords = true;
						});
					}
					// console.log(isKeywords);
					if (
						v.readme.category &&
						(this.$has(this.categorys, {
							title: v.readme.category,
							show: true
						}) ||
							isKeywords)
					) {
						return true;
					} else {
						return false;
					}
				});
			}
			// console.log(plugins);
			return plugins;
		}
	},

	mounted: function() {
		this.$http(
			"https://api.github.com/repos/ataoke/plugins/contents?ref=master"
		).then(res => {
			// console.log(res.data);
			this.plugins = res.data
				.filter(v => v.download_url === null)
				.map(v => {
					v.readme = {};
					v.icon = `https://raw.githubusercontent.com/ataoke/plugins/master/${
						v.path
					}/favicon.ico`;
					return v;
				});
			this.plugins.map(v => {
				this.$http(
					`https://raw.githubusercontent.com/ataoke/plugins/master/${
						v.path
					}/readme.yml`
				).then(r => {
					// console.log(r.data);
					try {
						v.readme = YAML.load(r.data);
						v.readme.keywords.map(k => {
							if (this.$has(this.keywords, { title: k })) {
								this.keywords.map(keyword => {
									if (keyword.title === k) keyword.count++;
								});
							} else {
								this.keywords.push({
									title: k,
									show: true,
									count: 1
								});
							}
						});
						if (
							this.$has(this.categorys, {
								title: v.readme.category
							})
						) {
							this.categorys.map(category => {
								if (category.title === v.readme.category)
									category.count++;
							});
						} else {
							this.categorys.push({
								title: v.readme.category,
								show: true,
								count: 1
							});
						}
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
	background: rgb(242, 242, 242);
	border-radius: 3px;
	margin-bottom: 5px;
	color: #4898f8;
	font-weight: bold;
	cursor: pointer;
}

div.lists ul li.on {
	color: #fff;
	background: #4898f8;
	font-weight: normal;
}

div.lists ul li span {
	float: right;
	background: #4898f8;
	color: #fff;
	padding: 0 5px;
	border-radius: 3px;
	font-weight: bold;
}

div.lists ul li.on span {
	background: #fff;
	color: #4898f8;
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
	/* background: #ccc; */
	border-radius: 3px;
	border: none;
	overflow: hidden;
}

ul.plugins > li > i.img {
	width: 50px;
	height: 50px;
	margin-right: 10px;
	background: #ccc;
	border-radius: 25px;
	border: none;
	overflow: hidden;
}

ul.plugins > li > span {
	font-weight: normal;
	padding-left: 10px;
	color: #777;
}

@media (max-width: 600px) {
	.row {
		display: block;
	}

	.col-3 {
		display: block;
		flex: none;
		max-width: 100%;
	}
}
</style>
