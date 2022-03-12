(function () {
	let page = parseInt(getSearchParameter("page")) || 1;
	let search = getSearchParameter("search");
	let articles;
	if (search == "") {
		// 根据原始articles进行插入
		articles = gitblog.articles;
		insertArticles(articles)
	} else {
		// 根据查找到的文章进行插入
		let promises = [];
		articles = [];
		for (let article of gitblog.articles) {
			let promise = fetch(gitblog.getArticle(article))
				.then(resp => resp.text())
				.then(text => {
					if (article.indexOf(search) > -1 || text.indexOf(search) > -1) {
						articles.push(article);
					}
				});
			promises.push(promise)
		}
		Promise.all(promises).then(() => {
			insertArticles(articles);
			console.log("articles");
		})
	};

	// 插入文章
	function insertArticles(articles) {
		if (page != 1) {
			articles = articles.slice((page - 1) * 10, (page - 1) * 10 + 10);
		} else {
			articles = articles.slice(0, 10);
		}
		for (let article of articles) {
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
		}
		// 翻页处理
		let maxPage = Math.ceil(articles / 10.0);
		if (page < 2) {
			$(".pre-page").hide()
		} else {
			$(".pre-page").bind("click", function () {
				if (page > 2) {
					location = location.href.replace(/page=\d*/, "page=" + (page - 1));
				} else {
					location = location.href.replace(/(\?|&)page=\d+/, "");
				}
			})
		}
		if (maxPage == page || maxPage < 2) {
			$(".next-page").hide()
		} else {
			$(".next-page").bind("click", function () {
				if (page > 1) {
					location = location.href.replace(/page=\d*/, "page=" + (page + 1));
				} else {
					let connector = /\?/.test(location.href) ? "&" : "?";
					location = location.href + connector + "page=2"
				}
			})
		}
	}
}())
