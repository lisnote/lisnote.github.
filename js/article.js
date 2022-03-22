(function () {
	// 插入文章到#article
	let article = decodeURI(/.*?article=(.*\.md)/.exec(location.href)[1]);
	$("title").html(article)
	fetch(lispress.getArticle(article))
		.then(res => res.text())
		.then(text => {
			if (text.indexOf("---") == 0) {
				text = text.replace(/---(.*\r?\n)*?---/, "")
			}
			$("#article").html(marked.parse(text));
			hljs.highlightAll();
			parseChapters()
		});

	// 生成目录到#chapters
	function parseChapters() {
		for (let i of $("h1,h2,h3,h4,h5,h6")) {
			str = "";
			switch (i.tagName) {
				case "H6":
					str += "&emsp;";
				case "H5":
					str += "&emsp;";
				case "H4":
					str += "&emsp;";
				case "H3":
					str += "&emsp;";
				case "H2":
					str += "&emsp;";
			}
			$("#chapters").append("<a href='#" + i.id + "' class='text-decoration-none text-black'>" +
				str + i.innerText + "<a><br>")
		}
	}

	// Gitlk 模块
	if (githubConfig.username!= "" && githubConfig.clientID != "") {
		var gitalk = new Gitalk({
			clientID: githubConfig.clientID,
			clientSecret: githubConfig.clientSecret,
			repo: githubConfig.username + '.github.io',
			owner: githubConfig.username,
			admin: [githubConfig.username],
			id: article.substring(0, 49), // Ensure uniqueness and length less than 50
			distractionFreeMode: false // Facebook-like distraction free mode
		})
		gitalk.render('gitalk-container')
	}
}())
