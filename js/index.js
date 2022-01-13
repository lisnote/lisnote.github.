(function() {
	for (let i of gitblog.articles) {
		let str =
			'<a href="articles/?p={href}"><div class="ratio ratio-16x9 rounded-3 mb-4" style="background-image: url(articles/assets/{background}/background.jpg);"><div><h1 class="col-12 bg-white bg-opacity-75 p-2 text-over">{title}</h1></div></div></a>'
			.replace("{href}", i)
			.replace("{background}",i)
			.replace("{title}",i);
		$("#articles").append(str)
	};
	
	
	window.addEventListener('compositionupdate', function(){
	    console.log("success")
	})
}())
