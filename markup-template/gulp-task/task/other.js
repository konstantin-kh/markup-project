module.exports = function() {

	//----------#BUILD FOLDER
	//delet folder build version project
	$.gulp.task('clean', function(cb) {
		console.log('------------ FOLDER FOR BUILD CLEAN');
		$.gp.del.sync($.config.pathVar.path.clean, {force: true});
		cb();
	});

	//fonts file build version project
	$.gulp.task('fontsBuild', function() {
		return $.gulp.src($.config.pathVar.path.src.fonts)
			.pipe($.gp.plumber({ errorHandler: $.gp.notify.onError("Error: <%= error.message %>") }))
			.pipe($.gp.newer($.config.pathVar.path.build.fonts))
			.pipe($.gulp.dest($.config.pathVar.path.build.fonts))
	});

	//other file build version project
	$.gulp.task('otherBuild', function() {
		return $.gulp.src($.config.pathVar.path.src.other)
			.pipe($.gp.plumber({ errorHandler: $.gp.notify.onError("Error: <%= error.message %>") }))
			.pipe($.gulp.dest($.config.pathVar.path.build.other))
	});

	//----------#PRODUCTION FOLDER
	//delet folder production version project
	$.gulp.task('cleanProd', function(cb) {
		console.log('------------ FOLDER FOR PRODUCTION CLEAN');
		$.gp.del.sync($.config.pathVar.path.cleanProd, {force: true});
		cb();
	});

	//fonts file production version project
	$.gulp.task('fontsBuildProd', function() {
		return $.gulp.src($.config.pathVar.path.src.fonts)
			.pipe($.gp.plumber({ errorHandler: $.gp.notify.onError("Error: <%= error.message %>") }))
			.pipe($.gulp.dest($.config.pathVar.path.production.fonts))
	});

	//other file build version project
	$.gulp.task('otherBuildProd', function() {
		return $.gulp.src($.config.pathVar.path.src.other)
			.pipe($.gp.plumber({ errorHandler: $.gp.notify.onError("Error: <%= error.message %>") }))
			.pipe($.gulp.dest($.config.pathVar.path.production.other))
	});

};