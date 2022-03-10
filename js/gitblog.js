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
				// 使用开发者数据
				developmentMode();
			}
		};
		// 将占位符号替换为有效数据
		githubAPI.articles = githubAPI.articles.replace(/{username}/g, githubAPI.username);
		githubAPI.article = githubAPI.article.replace(/{protocol}|{host}/g, data => data == "{host}" ? location.host : location.protocol);
		githubAPI.background = githubAPI.background.replace(/{protocol}|{host}/g, data => data == "{host}" ? location.host : location.protocol);
		// 实现gitblog要求的三个方法
		gitblog.articles = articlesDecorator();
		gitblog.getArticle = getArticle;
		gitblog.getBackground = getBackground;


		// 根据传入参数获取markdown直链
		function getArticle(article) {
			return githubAPI.article.replace(/{article}/g, article);
		}
		// 根据传入参数获取背景图直链
		function getBackground(article) {
			return githubAPI.background.replace(/{article}/g, article);
		}
		// 使用开发者数据
		function developmentMode() {
			githubAPI.username = githubAPI.devUsername;
			githubAPI.clientID = githubAPI.devClientID;
			githubAPI.clientSecret = githubAPI.devClientSecret;
			githubAPI.articles = githubAPI.devArticles;
			githubAPI.article = githubAPI.devArticle;
			githubAPI.background = githubAPI.devBackground;
		}
		// 解析articles文件目录为数组并返回,忽略assets/和index.html
		function articlesDecorator() {
			let articles = [];
			if (location.pathname == "/") {
				$.ajax({
					url: githubAPI.articles,
					async: false,
					headers: {
						authorization: "Basic " + btoa(githubAPI.clientID + ":" + githubAPI.clientSecret),
					},
					success: function (result) {
						for (let i = 0; i < result.length; i++) {
							if (result[i].name == "assets" || result[i].name == "index.html") continue;
							articles.push(result[i].name);
						}
					}
				})
			}
			// 获取日期数据dateMap
			let dateMap = JSON.parse(localStorage.getItem(githubAPI.username)) || {};
			// dateMap完整性检查
			if (dateMapCheck()) {
				articles.sort((x, y) => {
					return dateMap[y] - dateMap[x];
				})
			} else {
				initDateMap()
				return ["初始化,请稍等..."]
			}
			return articles;


			// dateMap完整性检查
			function dateMapCheck() {
				for (let obj of articles) {
					if (!(obj in dateMap)) {
						return false;
					}
				}
				return true;
			}
			// dateMap初始化
			async function initDateMap() {
				for (let article of articles) {
					fetch(getArticle(article), {
						headers: { "Range": "bytes=0-500" }
					})
						.then(resp => resp.text())
						.then(text => {
							let date;
							try {
								date = text.match(/date: (\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/)[1];
								date = date.replace(/-| |:/g, "")
							} catch (error) {
								date = 19700101000000;
								console.log(error);
							}
							dateMap[article] = date;
							if (Object.getOwnPropertyNames(dateMap).length == articles.length) {
								localStorage.setItem(githubAPI.username, JSON.stringify(dateMap));
								location.reload()
							}
						})
				}
			}
		}
	}
}())