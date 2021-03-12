module.exports = function() {
	//----------#OPTIONS WITH HTMLBEAUTIFY PLUGIN
	//all options https://www.npmjs.com/package/gulp-html-beautify
	var options = {
		//indent tabs
		"indent_with_tabs": true,
		//maximum number of new lines
		"max_preserve_newlines": 0,
		"unformatted": [
			// https://www.w3.org/TR/html5/dom.html#phrasing-content
			'abbr', 'area', 'b', 'bdi', 'bdo', 'br', 'cite',
			'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'ins', 'kbd', 'keygen', 'map', 'mark', 'math', 'meter', 'noscript',
			'object', 'output', 'progress', 'q', 'ruby', 's', 'samp', 'small',
			'strong', 'sub', 'sup', 'template', 'time', 'u', 'var', 'wbr', 'text',
			'acronym', 'address', 'big', 'dt', 'ins', 'strike', 'tt'
		]
	};

	//----------#BUILD FOLDER
	//html file build version
	$.gulp.task('htmlBuild', function() {
		return $.gulp.src($.config.pathVar.path.src.html)
			.pipe($.gp.plumber({ errorHandler: $.gp.notify.onError("Error: <%= error.message %>") }))
			.pipe($.gp.rigger())
			//replace image path
			.pipe($.gp.gulpReplace('="img/', '="assets/img/'))
			.pipe($.gp.gulpReplace('=\'img/', '=\'assets/img/'))
			.pipe($.gp.gulpReplace('url("img/', 'url("assets/img/'))
			.pipe($.gp.gulpReplace('url(\'img/', 'url(\'assets/img/'))
			.pipe($.gp.gulpReplace('url(img/', 'url(assets/img/'))
			.pipe($.gp.gulpReplace('="assets/img/wp', '="content-images/wp'))
			.pipe($.gp.gulpReplace('=\'assets/img/wp', '=\'content-images/wp'))
			//replace css path
			.pipe($.gp.gulpReplace('="css/', '="assets/css/'))
			.pipe($.gp.gulpReplace('=\'css/', '="assets\'css/'))
			//replace js path
			.pipe($.gp.gulpReplace('="js/', '="assets/js/'))
			.pipe($.gp.gulpReplace('=\'js/', '="assets\'js/'))
			.pipe($.gp.imgRetina($.config.retinizeOpts))
			.pipe($.gulp.dest($.config.pathVar.path.build.html))
	});

	//----------#PRODUCTION FOLDER
	//html file production version
	$.gulp.task('htmlProdBuild', function() {
		return $.gulp.src($.config.pathVar.path.src.htmlProd)
			.pipe($.gp.plumber({ errorHandler: $.gp.notify.onError("Error: <%= error.message %>") }))
			.pipe($.gp.rigger())
			//replace image path
			.pipe($.gp.gulpReplace('="img/', '="assets/img/'))
			.pipe($.gp.gulpReplace('=\'img/', '=\'assets/img/'))
			.pipe($.gp.gulpReplace('url("img/', 'url("assets/img/'))
			.pipe($.gp.gulpReplace('url(\'img/', 'url(\'assets/img/'))
			.pipe($.gp.gulpReplace('="assets/img/wp', '="content-images/wp'))
			.pipe($.gp.gulpReplace('=\'assets/img/wp', '=\'content-images/wp'))
			//replace css path
			.pipe($.gp.gulpReplace('="css/', '="assets/css/'))
			.pipe($.gp.gulpReplace('=\'css/', '=\'assets/css/'))
			//replace js path
			.pipe($.gp.gulpReplace('="js/', '="assets/js/'))
			.pipe($.gp.gulpReplace('=\'js/', '=\'assets/js/'))
			.pipe($.gp.imgRetina($.config.retinizeOpts))
			.pipe($.gp.gulpHtmlBeautify(options))
			.pipe($.gulp.dest($.config.pathVar.path.production.html))
	});
};