(function() {
	// 插入文章到#article
	let article = /.*\/articles\/\?p=(.*\.md)/.exec(location.href)[1];
	$("#article").html(marked.parse(gitblog.getArticle(article)));
	$("title").html(article)
	// 生成目录到#chapters
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
		$("#chapters").append("<a href='#" + i.innerText + "' class='text-decoration-none text-black'>" +
			str + i.innerText + "<a><br>")
	}
}())
