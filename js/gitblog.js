(function () {
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
			try {
				githubAPI.username = (/.*\/(.*)\.github\.io.*/.exec(location.href)[1])
			} catch (error) {
				console.error("Failed to obtain username,have you set the gitblog.github.username in config.js?");
				console.error(error)
				githubAPI.username = githubAPI.devUsername;
			}
		};
		githubAPI.articles = githubAPI.articles.replace(/{username}/g, githubAPI.username);
		githubAPI.article = githubAPI.article.replace(/{protocol}|{host}/g, data => data == "{host}" ? location.host : location.protocol);
		githubAPI.background = githubAPI.background.replace(/{username}/g, githubAPI.username)
		// 将articles下的文件名和文件夹名转换为数组保存在gitblog.articles
		if (location.pathname == "/") {
			articles = gitblog.articles;
			$.ajax({
				url: githubAPI.articles,
				async: false,
				headers: {
					authorization: "Basic " + btoa(githubAPI.clientID + ":" + githubAPI.clientSecret),
				},
				success: function (result) {
					for (let i = 0; i < result.length; i++) {
						if (result[i].name == "assets" || result[i].name == "index.html") continue;
						articles[articles.length] = result[i].name;
					}
				}
			})
		}
		// 返回String类型的文章内容
		gitblog.getArticle = function (article) {
			let articleUrl = githubAPI.article.replace(/{article}/g, article);
			return $.ajax({
				async: false,
				url: articleUrl
			}).responseText;
		}
		// 获取背景 返回背景的链接
		gitblog.getBackground = function (article) {
			return githubAPI.background.replace(/{article}/g, article);
		}
	}
}())
