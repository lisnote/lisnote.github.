(function () {
	switch (gitblog.api) {
		case "github":
			github();
			break;
		default:
			github();
	}

	function github() {
		let githubAPI = gitblog.config;
		// 获取username,若获取失败则打开开发模式
		if (githubAPI.username == "") {
			try {
				githubAPI.username = (/.*\/(.*)\.github\.io.*/.exec(location.href)[1])
			} catch (error) {
				console.error("Failed to obtain username,have you set the github.username in config.js?");
				githubAPI.username = githubAPI.devUsername;
				githubAPI.clientID = githubAPI.devClientID;
				githubAPI.clientSecret = githubAPI.devClientSecret;
				githubAPI.articles = githubAPI.devArticles;
				githubAPI.article = githubAPI.devArticle;
				githubAPI.background = githubAPI.devBackground;
			}
		};
		githubAPI.articles = githubAPI.articles.replace(/{username}/g, githubAPI.username);
		githubAPI.article = githubAPI.article.replace(/{protocol}|{host}/g, data => data == "{host}" ? location.host : location.protocol);
		githubAPI.background = githubAPI.background.replace(/{protocol}|{host}/g, data => data == "{host}" ? location.host : location.protocol);
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
		// 根据传入参数获取markdown直链
		gitblog.getArticle = function (article) {
			return githubAPI.article.replace(/{article}/g, article);
		}
		// 根据传入参数获取背景图直链
		gitblog.getBackground = function (article) {
			return githubAPI.background.replace(/{article}/g, article);
		}
	}
}())
