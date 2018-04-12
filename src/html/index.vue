<template>
	<div class="main">
		<b-row>
			<b-col>
				<h1>更新日志</h1>
			</b-col>
		</b-row>

		<b-row>
			<b-col>
				<ul class="commits">
					<li v-for="commit in commits" :key="commit.sha">
						<div>
							<h2>
								<img :src="commit.author.avatar_url" /> {{commit.commit.author.name}}
								<br>
								<p>
									<a :href="commit.author.html_url" target="_blank">@{{commit.author.login}}</a>
								</p>
							</h2>
							<div class="commit">{{commit.commit.message}}
								<span>
									<i class="iconfont icon-shijian1"></i>{{commit.commit.committer.date | timer}}
									<i class="iconfont icon-wenjian"></i>{{commit.files.length}}</span>
								<ul class="files">
									<li v-for="file in commit.files" :key="file.sha" :class="file.status">{{file.filename}}
										<span>{{file.status.replace(/\b(\w)(\w*)/g, function($0, $1, $2) { return $1.toUpperCase() + $2.toLowerCase(); })}}
										</span>
									</li>
								</ul>
							</div>
						</div>
					</li>
				</ul>
			</b-col>
		</b-row>
	</div>
</template>

<script>
import VueList from "../include/vueList.vue";
const moment = require("moment");

export default {
	components: { VueList },
	name: "Index",
	title: "首页",
	data: function() {
		return {
			commits: []
		};
	},
	filters: {
		timer: function(v) {
			return moment(v).format("MM-DD");
		}
	},
	mounted: function() {
		this.$http(
			"https://api.github.com/repos/ataoke/ataoke.github.io/commits"
		).then(res => {
			this.commits = res.data.map(v => {
				v.files = [];
				return v;
			});
			this.commits.map(v => {
				this.$http(v.url).then(r => {
					v.files = r.data.files;
				});
			});
		});
	},
	methods: {}
};
</script>

<style scoped>
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

ul.commits > li > div > h2 {
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

ul.commits > li > div > h2 > p {
	padding-top: 10px;
	margin: 0;
}

ul.commits > li > div > h2 > p > a {
	color: rgb(242, 242, 242);
	font-weight: 100;
}

ul.commits > li > div > h2 > img {
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
