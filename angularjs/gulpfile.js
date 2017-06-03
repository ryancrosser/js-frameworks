/* eslint-disable dot-notation */
var browserSync = require('browser-sync');
var fs = require('fs');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var packageJson = require('./package.json');

// Include Our Plugins
var del = require('del');
var sync = require('gulp-sync')(gulp);

var config = require('./gulp.config.js')
var ENV = {
    PROD: 'prod',
    STAG: 'stag',
    DEV: 'dev'
};
var env = ENV.STAG;

// Aliases
gulp.task('b', ['build']);
gulp.task('p', ['production']);
gulp.task('s', ['staging']);
gulp.task('w', ['watch']);
gulp.task('sp', ['serve-production']);
gulp.task('ss', ['serve-staging']);
gulp.task('c', ['clean']);
gulp.task('l', ['lint']);
gulp.task('h', ['help']);

// Main Tasks
gulp.task('default', ['help']);
gulp.task('build', sync.sync(['production', 'staging']));
gulp.task('production', sync.sync(['set-production-variable', 'clean', '_build', 'remove-temp']));
gulp.task('staging', sync.sync(['set-staging-variable', 'clean', '_build', 'remove-temp']));
gulp.task('watch', sync.sync(['set-staging-variable', 'clean', '_build', 'serve']), function () {
    gulp.watch(config.watch, sync.sync(['_build', 'bs-reload']));
});

gulp.task('bs-reload', function (done) {
    browserSync.reload();
    done();
})

gulp.task('_build', sync.sync(['angular-scripts', 'template-cache', 'app-css', 'concat-template-cache-to-app-script', 'copy-workers-to-assets', 'vendor-scripts', 'app-images', 'copy-favicon', 'copy-assets-dir', 'copy-files-to-build-directory', 'build-index']));

// Define Environment Variables
gulp.task('set-production-variable', function () {
    env = ENV.PROD;
});
gulp.task('set-staging-variable', function () {
    env = ENV.STAG;
});
gulp.task('set-development-variable', function () {
    env = ENV.DEV;
});

// Concat/Minify Tasks
gulp.task('angular-scripts', function () {
    return gulp.src(config.paths.srcFiles.appScriptsGlob)
        .pipe($.plumber())
        .pipe($.expectFile({ errorOnFailure: true }, config.paths.srcFiles.appScriptsGlob).on('error', handleError))
        .pipe($.tpNgSort({
            excludePatterns: [/\.worker.js$/, /\.spec.js$/]
        }))
        .pipe($.ngAnnotate())
        .pipe($.if(env !== ENV.PROD, $.sourcemaps.init()))
        .pipe($.concat(config.output.fileNames.appScripts).on('error', showError))
        .pipe($.if(env === ENV.PROD, $.uglify({
            preserveLisence: true,
            mangle: false
        }).on('error', showError)))
        .pipe($.if(env !== ENV.PROD, $.sourcemaps.write('.')))
        .pipe(gulp.dest(getBuildDirectory()));
});

gulp.task('app-css', function () {
    return gulp.src(config.paths.srcFiles.cssGlob)
        .pipe($.plumber({
            errorHandler: function () {
                gulp.start('app-css');
                this.destroy();
            }
        }))
        .pipe($.expectFile({ errorOnFailure: true }, config.paths.srcFiles.cssGlob).on('error', handleError))
        .pipe($.if(env !== ENV.PROD, $.sourcemaps.init()))
        .pipe($.concat(config.output.fileNames.appCss))
        .pipe($.if(env === ENV.PROD, $.cleanCss({ compatibility: 'ie8' }).on('error', showError)))
        .pipe($.if(env !== ENV.PROD, $.sourcemaps.write('.')))
        .pipe(browserSync.reload({ stream: true }))
        .pipe(gulp.dest(getBuildDirectory()));
});

gulp.task('app-images', function () {
    return gulp.src(config.paths.srcFiles.imageGlob)
        .pipe($.expectFile({ errorOnFailure: true }, config.paths.srcFiles.imageGlob).on('error', handleError))
        .pipe($.plumber())
        .pipe(gulp.dest(getBuildDirectory() + '/' + config.output.directories.images));
});

gulp.task('build-index', function () {
    var title;
    var build;
    var version;
    var buildTime = new Date().toISOString();

    if (env === ENV.STAG) {
        build = config.stagingBuild;
        title = config.appTitle + ' ' + packageJson.version;
    } else if (env === ENV.PROD) {
        build = config.productionBuild;
        title = config.appTitle;
    }
    version = packageJson.version;

    var buildInfo = 'var INFO = {build: \'' + build + '\', version: \'' + version + '\', time: \'' + buildTime + '\'}';

    return gulp.src(config.paths.srcFiles.index)
        .pipe($.plumber())
        .pipe($.expectFile({ errorOnFailure: true }, config.paths.srcFiles.index).on('error', handleError))
        .pipe($.replace('{{ title.title }}', title))
        .pipe($.replace('{{ BUILD_INFO.BUILD_INFO }}', '<script>' + buildInfo + '</script>'))
        .pipe($.if(env === ENV.PROD, $.htmlmin({ collapseWhitespace: true }).on('error', showError)))
        .pipe(gulp.dest(getBuildDirectory()));
});

gulp.task('copy-favicon', function () {
    return gulp.src(config.paths.srcFiles.faviconGlob)
        .pipe($.plumber())
        .pipe($.expectFile({ errorOnFailure: true }, config.paths.srcFiles.faviconGlob).on('error', handleError))
        .pipe(gulp.dest(getBuildDirectory()));
});

gulp.task('copy-assets-dir', function () {
    return gulp.src(config.paths.srcFiles.assets)
        .pipe($.plumber())
        .pipe($.expectFile({ errorOnFailure: true }, config.paths.srcFiles.assets).on('error', handleError))
        .pipe(gulp.dest(getBuildDirectory() + '/' + config.output.directories.assets));
});

gulp.task('copy-files-to-build-directory', function () {
    return gulp.src(config.paths.srcFiles.copyToBuildDirectoryGlob)
        .pipe($.plumber())
        .pipe($.expectFile({ errorOnFailure: true }, config.paths.srcFiles.copyToBuildDirectoryGlob).on('error', handleError))
        .pipe(gulp.dest(getBuildDirectory() + '/' + config.output.directories.assets));
});

gulp.task('template-cache', function () {
    return gulp.src(config.paths.srcFiles.templatesGlob)
        .pipe($.angularTemplatecache('templates.js', {
            standalone: false,
            module: config.moduleName
        }))
        .pipe(gulp.dest(config.output.directories.temp));
});

gulp.task('concat-template-cache-to-app-script', function () {
    return gulp.src([getBuildDirectory() + '/' + config.output.fileNames.appScripts, config.output.directories.temp + '/*'])
        .pipe($.concat(config.output.fileNames.appScripts))
        .pipe(gulp.dest(getBuildDirectory()));
});

gulp.task('copy-workers-to-assets', function () {
    return gulp.src(config.paths.srcFiles.workersGlob)
        .pipe($.plumber())
        .pipe($.rename({ dirname: '' }))
        .pipe(gulp.dest(getBuildDirectory() + '/' + config.output.directories.assets))
});

gulp.task('remove-temp', function () {
    var cleanTriesMax = 50;
    var cleanTry = 0;
    do {
        try {
            del.sync(config.output.directories.temp)
        } catch (e) {
            // empty
        }
        cleanTry++;
    } while (cleanTry < cleanTriesMax);
});

gulp.task('vendor-scripts', function () {
    return gulp.src(config.paths.srcFiles.vendorScriptsGlob)
        .pipe($.plumber())
        .pipe($.expectFile({ errorOnFailure: true }, config.paths.srcFiles.vendorScriptsGlob).on('error', handleError))
        .pipe($.if(env !== ENV.PROD, $.sourcemaps.init()))
        .pipe($.concat(config.output.fileNames.vendorScripts).on('error', showError))
        .pipe($.if(env === ENV.PROD, $.uglify({ preserveLisence: true }).on('error', showError)))
        .pipe($.if(env !== ENV.PROD, $.sourcemaps.write('.')))
        .pipe(gulp.dest(getBuildDirectory()));
});

// Server
gulp.task('serve-production', sync.sync(['set-production-variable', 'serve']));
gulp.task('serve-staging', sync.sync(['set-staging-variable', 'serve']));
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: getBuildDirectory()
        },
        port: 8000
    });
});

// Utility 
gulp.task('clean', function () {
    var cleanTriesMax = 50;
    var cleanTry = 0;
    do {
        try {
            del.sync(getBuildDirectory() + '/**/*');
            break;
        } catch (e) {
            // empty
        }
        cleanTry++;
    } while (cleanTry < cleanTriesMax);
});

gulp.task('clean-all', function () {
    var toClean = [config.output.directories.stage, config.output.directories.prod];
    var cleanTriesMax = 50;
    toClean.forEach(function () {
        var cleanTry = 0;
        do {
            try {
                del.sync(dir + '/**/*');
                break;
            } catch (e) {
                // empty
            }
            cleanTry++;
        } while (cleanTry < cleanTriesMax);
    });
});

gulp.task('lint', function () {
    return gulp.src(config.lintGlob)
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failAfterError());
})

gulp.task('help', function () {
    fs.readFile('./gulp.help.txt', 'UTF-8', function (e, data) {
        /* eslint-diable no-console */
        console.log('');
        console.log(data);
        /* eslint-enable */
    });
});

// Helper Method
function getBuildDirectory() {
    var path;
    if (env === ENV.STAG) {
        path = config.output.directories.stage;
    } else if (env === ENV.PROD) {
        path = config.output.directories.prod;
    }
    return path;
}

function handleError(err) {
    console.log(err.toString());
    process.exit(-1);
}

function showError(err) {
    console.log(err);
}
