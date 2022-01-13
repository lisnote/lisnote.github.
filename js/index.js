(function() {
	for (let o of gitblog.articles) {
		let article =
			'<div class="col-12 mb-4 ratio ratio-16x9 bg-secondary overflow-hidden" style="background-image: url({background-image});background-size: cover;"><a href={href} class="text-black text-decoration-none"><div class="bg-white bg-opacity-75"><h1 class="p-3 pt-3 text-over">{title}</h1></div><div class="p-3">{content}</div></a></div>'
		article = article.replace("{href}", "article.html?p=" + o)
		article = article.replace("{title}", o)
		article = article.replace("{background-image}", "articles/assets/" + o + "/background.jpg")
		// 内容加载方式,暂时保留
		article = article.replace("{content}", "")
		$("#articles").append(article)
	}
}())
