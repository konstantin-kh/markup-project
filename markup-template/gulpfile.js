"use strict";

global.$ = {
	gulp: require("gulp"),
	uglifyEs: require("gulp-uglify-es").default,

	//gulp-load-plugins init
	gp: require("gulp-load-plugins")({
		//need to work plugin - "del"
		pattern: ["*", "!gulp"],
		//need to work all this plugin
		rename: {
			"gulp-group-css-media-queries": "gcmq",
			"gulp-html-beautify": "gulpHtmlBeautify",
			"browser-sync": "browserSync",
			"imagemin-pngquant": "pngquant",
			"gulp-newer": "newer",
			"gulp-replace": "gulpReplace",
			"gulp-responsive-imgz-ignore": "imgRetina"
		}
	}),
	config: {
		configInit: require("./gulp-task/config/config.js"),
		pathVar: require("./gulp-task/config/path-var.js"),
		retinizeOpts: {
			//if you need additional options
			suffix: {
				// 1: '@1x',
				2: "@2x"
				// 3: '@3x'
			},
			ignore: ['wpn-', 'none-']
		}
	},
	bsr: function reload(done) {
		$.gp.browserSync.reload();
		done();
	}
};

//cycle for all tasks
$.config.configInit.forEach(function(taskPath) {
	require(taskPath)();
});

//----------#BUILD DEV FOLDER
//TASK ---- gulp build
$.gulp.task(
	"build",
	$.gulp.parallel("htmlBuild", "jsBuild", "cssBuild", "fontsBuild")
);

//TASK ---- gulp allImageTask
$.gulp.task("allImageTask", $.gulp.parallel("imageBuild", "imageTrashBuild"));

//TASK ---- gulp
$.gulp.task(
	"default",
	$.gulp.series(
		$.gulp.parallel("build"),
		$.gulp.parallel("allImageTask", "webserver", "watch")
	)
);

//TASK ---- gulp dev-easy
$.gulp.task("dev-easy", $.gulp.parallel("webserver", "watch"));

//TASK ---- gulp dev
$.gulp.task(
	"dev",
	$.gulp.series(
		$.gulp.series("clean"),
		$.gulp.parallel("build", "justCssBuild", "otherBuild"),
		$.gulp.parallel("webserver", "watch", "allImageTask")
	)
);

//----------#PRODUCTION FOLDER
//TASK ---- gulp buildProd
$.gulp.task(
	"buildProd",
	$.gulp.parallel(
		"htmlProdBuild",
		"jsBuildProd",
		"cssBuildProd",
		"fontsBuildProd"
	)
);

//TASK ---- gulp allImageTaskProd
$.gulp.task(
	"allImageTaskProd",
	$.gulp.parallel(
		"imageBuildProd",
		"imageUnoptimizedBuildProd",
		"imageTrashBuildProd"
	)
);

//TASK ---- gulp buildProd-noImgFont
$.gulp.task(
	"buildProd-noImgFont",
	$.gulp.parallel("htmlProdBuild", "jsBuildProd", "cssBuildProd")
);

//TASK  ---- gulp dist
$.gulp.task(
	"dist",
	$.gulp.series(
		$.gulp.series("cleanProd"),
		$.gulp.parallel(
			"buildProd",
			"justCssBuildProd",
			"jsMinBuildProd",
			"otherBuildProd"
		),
		$.gulp.parallel("allImageTaskProd", "webserverProd", "watchProd")
	)
);

//TASK  ---- gulp dist-easy
$.gulp.task(
	"dist-easy",
	$.gulp.parallel(
		"buildProd-noImgFont",
		"justCssBuildProd",
		"jsMinBuildProd",
		"otherBuildProd",
		"webserverProd",
		"watchProd"
	)
);

//TASK  ---- gulp dist-fast
$.gulp.task(
	"dist-fast",
	$.gulp.series(
		$.gulp.series("cleanProd"),
		$.gulp.parallel(
			"buildProd",
			"justCssBuildProd",
			"jsMinBuildProd",
			"otherBuildProd",
			"allImageTaskProd"
		)
	)
);

//TASK  ---- gulp dist-compile
$.gulp.task(
	"dist-compile",
	$.gulp.series(
		"buildProd",
		"justCssBuildProd",
		"jsMinBuildProd",
		"otherBuildProd"
	)
);
