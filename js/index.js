(function() {
	for (let i of gitblog.articles) {
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


	window.addEventListener('compositionupdate', function() {
		console.log("success")
	})
}())
