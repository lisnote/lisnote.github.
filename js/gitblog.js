"use strict";
(function() {
	switch (gitblog.api) {
		case "github":
			github();
			break;
		default:
			github();
	}

	function github() {
		let githubAPI = gitblog.github;
		// 设置username
		if (githubAPI.username == "") {
			githubAPI.username = /.*\/(.*)\.github\.io.*/.exec(location.href)[1]
			console.log("username未设置,从链接中获取到username为", githubAPI.username);
		};
		githubAPI.articles = githubAPI.articles.replaceAll("{username}", githubAPI.username);
		githubAPI.article = githubAPI.article.replaceAll("{username}", githubAPI.username);
		githubAPI.background = githubAPI.article.replaceAll("{username}", githubAPI.username)
		// 将articles下的文件名和文件夹名转换为数组保存在gitblog.articles
		$.ajax({
			url: githubAPI.articles,
			async: false,
			headers: {
				authorization: "Basic " + btoa(githubAPI.clientID+":"+githubAPI.clientSecret),
			},
			success: function(result) {
				for (let i = 0; i < result.length; i++) {
					if (result[i].name == "assets"||result[i].name=="index.html") continue;
					gitblog.articles[gitblog.articles.length] = result[i].name;
				}
			}
		})
		// 返回String类型的文章内容
		gitblog.getArticle = function(article) {
			let str;
			$.ajax({
				async: false,
				url: githubAPI.article.replaceAll("{article}", article),
				success: function(result) {
					str = result;
				}
			})
			return str;
		}
		// 获取背景 返回背景的链接
		gitblog.getBackground = function(article) {
			return githubAPI.background.replaceAll("{article}", article);
		}
	}
}())
