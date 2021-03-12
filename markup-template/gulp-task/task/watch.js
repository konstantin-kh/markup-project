module.exports = function() {
	//----------#BUILD FOLDER

	// watch task with DEV
	$.gulp.task('watch', function() {
		$.gp.notify("Watcher is START!").write('');

		$.gulp.watch($.config.pathVar.path.watch.html, $.gulp.series(
			$.gulp.parallel('htmlBuild'),
			$.bsr
		))

		$.gulp.watch($.config.pathVar.path.watch.style, $.gulp.series(
			$.gulp.parallel('cssBuild')
		))

		$.gulp.watch($.config.pathVar.path.watch.js, $.gulp.series(
			$.gulp.parallel('jsBuild'),
			$.bsr
		))

		$.gulp.watch($.config.pathVar.path.watch.fonts, $.gulp.series(
			$.gulp.parallel('fontsBuild'),
			$.bsr
		))

		$.gulp.watch($.config.pathVar.path.watch.img, $.gulp.series(
			$.gulp.parallel('allImageTask'),
			$.bsr
		))

	});

	//----------#PRODUCTION FOLDER
	// watch task with PRODUCTION
	$.gulp.task('watchProd', function() {
		$.gp.notify("Watcher prod is START!").write('');

		$.gulp.watch($.config.pathVar.path.watch.html, $.gulp.series(
			$.gulp.parallel('htmlProdBuild'),
			$.bsr
		))

		$.gulp.watch($.config.pathVar.path.watch.style, $.gulp.series(
			$.gulp.parallel('cssBuildProd')
		))

		$.gulp.watch($.config.pathVar.path.watch.js, $.gulp.series(
			$.gulp.parallel('jsBuildProd'),
			$.bsr
		))

		$.gulp.watch($.config.pathVar.path.watch.fonts, $.gulp.series(
			$.gulp.parallel('fontsBuildProd'),
			$.bsr
		))

		$.gulp.watch($.config.pathVar.path.watch.img, $.gulp.series(
			$.gulp.parallel('allImageTaskProd'),
			$.bsr
		))
	});

}