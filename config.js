let github = {
	// 自定义域名必须填写username
	username: "",
	// OAuth Apps,用于开启评论区及提高可访问性,申请地址 https://github.com/settings/developers 填写格式 clientID:clientSecret
	clientID: "de3105a8fb15edf7ca19",
	clientSecret: "715c4a9cfe522069f914ff3f839119e6c4ae73a8",
	// 一般不需要修改,用于自定义笔记位置
	articles: "https://api.github.com/repos/{username}/{username}.github.io/contents/articles",
	// 一般不需要修改,用于自定义笔记位置
	article: "{protocol}//{host}/articles/{article}",
	// 一般不需要修改,用于自定义背景位置,例如jsdelivr加速,第三方随机图片api等
	background: "{protocol}//{host}/articles/assets/{article}/background.jpg",
}

// 一般不需要修改,用于自定义服务器
var gitblog = {
	// 根据此api的名称选择进行处理的方法
	api: "github",
	// 传入处理方法所需要的配置信息
	config: github,
	// 自定义时请实现以下三个方法
	// 返回一个字符串数组,包含除assets和index.html外,所有的articles子文件名和子文件夹名
	articles: [],
	// param string类型的文章名
	// return string类型的markdown直链
	getArticle: null,
	// param string类型文章/文件夹名
	// return string类型的background直链
	getBackground: null
}