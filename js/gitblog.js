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
		// 获取username,若获取失败则使用lisnote作为用户名
		if (githubAPI.username == "") {
			try {
				githubAPI.username = (/.*\/(.*)\.github\.io.*/.exec(location.href)[1])
			} catch (error) {
				console.error("Failed to obtain username,have you set the github.username in config.js?");
				// 使用开发者数据
				githubAPI.username = "lisnote"
			}
		};
		// 准备常用数据
		githubAPI.articles =`https://api.github.com/repos/${githubAPI.username}/${githubAPI.username}.github.io/contents/articles`
		githubAPI.article =`${location.protocol}//${location.host}/articles/{article}`
		githubAPI.background =`${location.protocol}//${location.host}/articles/assets/{article}/background.jpg`
		githubAPI.avatar = `https://avatars.githubusercontent.com/${githubAPI.username}`
		// 实现gitblog要求的三个方法
		gitblog.articles = articlesDecorator();
		gitblog.getArticle = getArticle;
		gitblog.getBackground = getBackground;
		// 替换id为avatar的元素的src属性值为githubAPI.avatar
		$(()=>{
			console.log($("#avatar"));
			$("#avatar").attr("src",githubAPI.avatar)
		})


		// 根据传入参数获取markdown直链
		function getArticle(article) {
			return githubAPI.article.replace(/{article}/g, article);
		}
		// 根据传入参数获取背景图直链
		function getBackground(article) {
			return githubAPI.background.replace(/{article}/g, article);
		}
		// 解析articles文件目录为数组并返回,忽略assets/和index.html
		function articlesDecorator() {
			let articles = [];
			// 获取文章
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
			// 获取日期映射dateMap
			let dateMap = {};
			$.get({
				url: `https://api.github.com/search/code?q=date%20in:file%20user:${githubAPI.username}%20path:articles/%20language:markdown`,
				headers: {
					"Accept": "application/vnd.github.v3.text-match+json",
				},
				async: false,
				success(result) {
					result.items.forEach(element => {
						try {
							dateMap[element.name] = Number(element.text_matches[0].fragment
								.match(/\d{4}(-\d{2}){2} \d{2}(:\d{2}){2}/)[0].replace(/-| |:/g, ""))
						} catch {
							dateMap[element.name] = 0
						}
					});
				}
			})
			// 根据日期排序文章
			articles.sort((x, y) => {
				return dateMap[y] - dateMap[x];
			})
			return articles;
		}
	}
}())