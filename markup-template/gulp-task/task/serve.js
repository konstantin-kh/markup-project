module.exports = function() {
	//----------#BUILD FOLDER
	//config webserver for browserSync build
	var config = {
		server: {
			baseDir: $.config.pathVar.path.build.serve,
			index: $.config.pathVar.path.build.serveIndex,
			reloadDelay: 300,
			directory: true
		},
		tunnel: false,
		host: 'localhost',
		port: 3000,
		logPrefix: "dev"
	};
	// task webserver for browserSync  build
	$.gulp.task('webserver', function() {
		return $.gp.browserSync(config);
	});

	//----------#PRODUCTION FOLDER
	//config webserver for browserSync prod
	var configProd = {
		server: {
			baseDir: $.config.pathVar.path.production.serve,
			index: $.config.pathVar.path.production.serveIndex,
			reloadDelay: 300,
		},
		tunnel: false,
		host: 'localhost',
		port: 3002,
		logPrefix: "prod",
		directory: true
	};
	// task webserver for browserSync prod
	$.gulp.task('webserverProd', function() {
		return $.gp.browserSync(configProd);
	});
};