(function () {
	let page = parseInt(getSearchParameter("page")) || 1;
	let search = getSearchParameter("search");
	let maxPage = Math.ceil(gitblog.articles.length / 10.0);
	if (search == "") {
		// 根据articles进行插入
		let articles;
		if (page != 1) {
			articles = gitblog.articles.slice((page - 1) * 10, (page - 1) * 10 + 10);
		} else {
			articles = gitblog.articles.slice(0, 10);
		}
		for (let article of articles) {
			insertArticle(article)
		}
	} else {
		// 根据查找数据进行插入(查找较慢所以不会增加翻页逻辑)
		for (let article of gitblog.articles) {
			fetch(gitblog.getArticle(article))
				.then(resp => resp.text())
				.then(text => {
					if (article.indexOf(search) > -1 || text.indexOf(search) > -1) {
						insertArticle(article);
					}
				});
		}
	};

	// 插入导航
	function insertArticle(article) {
		let href, background;
		if (/\.md$/.test(article)) {
			href = "?article=" + article;
		} else {
			href = article;
		}
		background = gitblog.getBackground(article)
		let vm =
			`<a href="articles/${href}">
				<div class="ratio ratio-16x9 rounded-3 mb-4 img-fluid bg-size-cover" style="background-image: url(${background});background-color: #DDD;">
					<div>
						<h1 class="col-12 bg-white bg-opacity-75 p-2 text-truncate">${article}</h1>
					</div>
				</div>
			</a>`
		$("#articles").append(vm);
	};

	// 翻页逻辑
	if (page < 2) {
		$(".pre-page").hide()
	} else {
		$(".pre-page").bind("click", function () {
			if (page > 2) {
				location = location.href.replace(/page=\d*/, "page=" + (page - 1));
			} else {
				location = location.href.replace(/\?page=\d+/, "");
			}
		})
	}
	if (maxPage == page || maxPage < 2 || getSearchParameter("search") != "") {
		$(".next-page").hide()
	} else {
		$(".next-page").bind("click", function () {
			if (page > 1) {
				location = location.href.replace(/page=\d*/, "page=" + (page + 1));
			} else {
				location = location.href + "?page=2";
			}
		})
	}
}())
