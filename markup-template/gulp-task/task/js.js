module.exports = function() {

	//----------#BUILD FOLDER
	// js file build version project
	$.gulp.task('jsBuild', function() {
		return $.gulp.src($.config.pathVar.path.src.js)
			.pipe($.gp.plumber({ errorHandler: $.gp.notify.onError("Error: <%= error.message %>") }))
			.pipe($.gp.rigger())
			// .pipe($.gp.babel())
			.pipe($.gulp.dest($.config.pathVar.path.build.js))
	});

	//----------#PRODUCTION FOLDER
	// js file production version project
	$.gulp.task('jsBuildProd', function() {
		return $.gulp.src($.config.pathVar.path.src.jsProd)
			.pipe($.gp.plumber({ errorHandler: $.gp.notify.onError("Error: <%= error.message %>") }))
			.pipe($.gp.rigger())
			// .pipe($.gp.babel())
			// more options for uglify https://www.npmjs.com/package/terser#api-reference
			// .pipe($.uglifyEs({
			// 	//reduce or not the name of the arguments of variables, etc.
			// 	mangle: false,
			// 	output: {
			// 		// align js code
			// 		beautify: true,
			// 		// delete or not comments
			// 		comments: true
			// 	}
			// }))
			.pipe($.gulp.dest($.config.pathVar.path.production.js))
	});

	// min js file  production version project
	$.gulp.task('jsMinBuildProd', function() {
		return $.gulp.src($.config.pathVar.path.src.jsMinProd)
			.pipe($.gp.plumber({ errorHandler: $.gp.notify.onError("Error: <%= error.message %>") }))
			.pipe($.gulp.dest($.config.pathVar.path.production.js))
	});

};