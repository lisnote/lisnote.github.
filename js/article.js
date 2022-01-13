(function() {
	let article = /.*\/article.html\?p=(.*\.md)/.exec(location.href)[1];
	$("#article").html(marked.parse(gitblog.getArticle(article)))
}())
