<template>
	<div class="main">

		<b-row>
			<b-col>
				<b-card title="插件管理">
					<p class="card-text">
						爱淘客网络平台是基于electron-vue创建的桌面应用系统；开发者可以创建插件收取服务费；使用者可以购买需要的插件一键使用。
					</p>
					<b-button-group>
						<b-dropdown class="download" right split text="下载最新版本" to="/download/" variant="outline-primary">
							<b-dropdown-item to="/download/ataoke.exe">Windows</b-dropdown-item>
							<b-dropdown-item to="/download/ataoke.dmg">Mac OS</b-dropdown-item>
							<b-dropdown-item to="/download/ataoke">Linux</b-dropdown-item>
						</b-dropdown>
					</b-button-group>
				</b-card>
			</b-col>
		</b-row>

		<b-row>
			<b-col>
				<h2>平台更新日志</h2>
			</b-col>
		</b-row>

		<b-row>
			<b-col>
				<ul class="commits">
					<li v-for="plugin in plugins" :key="plugin.sha">
						<div>
							{{plugin}}
						</div>
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
			plugins: []
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

div.card > div.card-body > h4 {
	font-size: 30px;
	margin-bottom: 20px;
}

div.card > div.card-body > p.card-text {
	color: #333;
	margin-bottom: 20px;
}

div.card > div.card-body > h1 {
	font-size: 16px;
}

ul.commits {
	background: #fff;
}

ul.commits > li > div {
	border: 1px solid #4898f8;
	margin-bottom: 10px;
	background: #fff;
	border-radius: 5px;
	overflow: hidden;
	display: flex;
	display: -webkit-flex;
}

ul.commits > li > div > h3 {
	color: #fff;
	font-weight: bold;
	display: inline-block;
	font-size: 14px;
	background: #4898f8;
	padding: 5px 5px 5px 50px;
	position: relative;
	/* border-radius: 5px; */
	margin: 0;
	min-width: 150px;
}

ul.commits > li > div > h3 > p {
	padding-top: 10px;
	margin: 0;
}

ul.commits > li > div > h3 > p > a {
	color: rgb(242, 242, 242);
	font-weight: 100;
}

ul.commits > li > div > h3 > img {
	position: absolute;
	top: 5px;
	left: 5px;
	width: 40px;
	height: 40px;
	margin-right: 10px;
	border-radius: 3px;
	background: #fff;
}

ul.commits > li > div > div.commit {
	position: relative;
	padding: 5px;
	font-size: 14px;
	-webkit-flex: 1;
	flex: 1;
}

ul.commits > li > div > div.commit > span {
	position: absolute;
	top: 5px;
	right: 5px;
	font-size: 12px;
	font-weight: 100;
	color: #333;
}

ul.commits > li > div > div.commit > span > i {
	margin: 0 5px 0 10px;
	font-size: 12px;
	font-weight: bold;
	color: #4898f8;
}

ul.files {
	padding-top: 5px;
}

ul.files > h3 {
	margin-bottom: 5px;
	font-size: 12px;
	font-weight: 100;
	color: #ccc;
}

ul.files > li {
	padding: 5px;
	border-radius: 3px;
	color: #333;
	margin-bottom: 5px;
}

ul.files > li.added {
	background: rgb(220, 255, 220);
}

ul.files > li.removed {
	background: rgb(255, 218, 218);
}

ul.files > li.modified {
	background: rgb(255, 241, 220);
}

ul.files > li > span {
	float: right;
	background: #fff;
	padding: 0 5px;
	border-radius: 3px;
	font-weight: bold;
}

ul.files > li.added > span {
	color: rgb(0, 134, 0);
}

ul.files > li.removed > span {
	color: rgb(138, 0, 0);
}

ul.files > li.modified > span {
	color: rgb(134, 81, 0);
}
</style>
