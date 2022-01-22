(function() {
	let page = parseInt(getSearchParameter("page"));
	let articles;
	if (page > 0) {
		articles = gitblog.getArticles().slice((page - 1) * 10, (page - 1) * 10 + 10);
	} else {
		articles = gitblog.getArticles().slice(0, 10);
	}

	// 插入
	for (let i of articles) {
		let str =
			'<a href="articles/{href}"><div class="ratio ratio-16x9 rounded-3 mb-4 img-fluid bg-size-cover" style="background-image: url(articles/assets/{background}/background.jpg);"><div><h1 class="col-12 bg-white bg-opacity-75 p-2 text-truncate">{title}</h1></div></div></a>'
			.replace("{background}", i)
			.replace("{title}", i);
		if (/\.md$/.test(i)) {
			str = str.replace("{href}", "?article=" + i)
		} else {
			str = str.replace("{href}", i)
		}
		$("#articles").append(str);
	};

	// 翻页事件
	$(".pre-page").bind("click", function() {
		if (page > 2) {
			location = location.href.replace(/page=\d*/, "page=" + (page - 1));
		} else if (/page=\d+&/.test(location.href)) {
			location = location.href.replace(/page=\d+&/, "");
		} else {
			location = location.href.replace(/[\?|&]page=\d+/, "");
		}
	})
	$(".next-page").bind("click", function() {
		let maxPage = Math.ceil(gitblog.getArticles().length / 10.0);
		if (page > 1 && page < maxPage) {
			location = location.href.replace(/page=\d*/, "page=" + (page + 1));
		} else if(isNaN(page)){
			if (location.search == "") {
				location = location.href + "?page=2";
			} else {
				location = location.href + "&page=2";
			}
		}
	})
}())
