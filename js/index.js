(function() {
	let page = parseInt(getSearchParameter("page"));
	let search = getSearchParameter("search")
	let maxPage = Math.ceil(gitblog.getArticles().length / 10.0);
	let articles;
	if (search == "") {
		if (page > 0) {
			articles = gitblog.getArticles().slice((page - 1) * 10, (page - 1) * 10 + 10);
		} else {
			articles = gitblog.getArticles().slice(0, 10);
		}
	} else {
		articles = [];
		for (let i of gitblog.getArticles()) {
			let index = gitblog.getArticle(i).indexOf(search);
			if (index > -1) {
				articles.push(i);
			}
		}
	};

	// 插入
	for (let i of articles) {
		let str =
			'<a href="articles/{href}"><div class="ratio ratio-16x9 rounded-3 mb-4 img-fluid bg-size-cover" style="background-image: url(articles/assets/{background}/background.jpg);background-color: #DDD;"><div><h1 class="col-12 bg-white bg-opacity-75 p-2 text-truncate">{title}</h1></div></div></a>'
			.replace("{background}", i)
			.replace("{title}", i);
		if (/\.md$/.test(i)) {
			str = str.replace("{href}", "?article=" + i)
		} else {
			str = str.replace("{href}", i)
		}
		$("#articles").append(str);
	};

	// 翻页
	if (isNaN(page)) {
		$(".pre-page").hide()
	}
	if (maxPage == page || maxPage < 2) {
		$(".next-page").hide()
	}
	$(".pre-page").bind("click", function() {
		if (page > 2) {
			location = location.href.replace(/page=\d*/, "page=" + (page - 1));
		} else if (/page=\d+&/.test(location.href)) {
			location = location.href.replace(/page=\d+&/, "");
		} else if (/[\?|&]page=\d+/.test(location.href)) {
			location = location.href.replace(/[\?|&]page=\d+/, "");
		}
	})
	$(".next-page").bind("click", function() {
		if (page > 1 && page < maxPage) {
			location = location.href.replace(/page=\d*/, "page=" + (page + 1));
		} else if (isNaN(page) && maxPage > 1) {
			if (location.search == "") {
				location = location.href + "?page=2";
			} else {
				location = location.href + "&page=2";
			}
		}
	})
}())
