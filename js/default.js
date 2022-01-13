(function() {
	// 返回顶部
	if ($(".back-to-top").length > 0) {
		let element = $(".back-to-top")[0];
		element.addEventListener("click", () => {
			document.documentElement.scrollTop = 0;
		})
		window.addEventListener("scroll", function() {
			if (window.scrollY > 100) {
				element.style.display = "block";
			} else {
				element.style.display = "none"
			}
		})
	}
	// show-toggle事件
	if ($(".show-toggle").length > 0) {
		let element = $(".show-toggle");
		for (let i of element) {
			i.addEventListener("click", () => {
				let toggle = $(i.getAttribute("data-show-toggle"));
				if (toggle.is(".d-none")) {
					toggle.removeClass("d-none");
				} else {
					toggle.addClass("d-none")
				}
			})
		}
	}
}())
