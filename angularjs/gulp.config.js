var moduleName = 'app';
var appTitle = 'App Title';
var productionBuild = 'production';
var stagingBuild = 'staging';

var output = {
    fileNames: {
        appCss: 'styles.css',
        appScripts: 'app.js',
        vendorScripts: 'vendor.js'
    },
    directories: {
        assets: 'assets',
        images: 'images',
        temp: 'temp',
        stage: 'staging',
        prod: 'prod'
    }
};
var paths = {};
paths.src = 'src';

paths.srcFiles = {
    appScriptsGlob: [
        paths.src + '/**/*.js',
        '!' + paths.src + '/vendor/**/*.js'
    ],
    cssGlob: [
        'node_modules/leaflet/dist/leaflet.css',
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css',  
        'node_modules/angularjs-datepicker/dist/angular-datepicker.css',
        paths.src + '/**/*.css'
    ],
    faviconGlob: [
        // path.src + '/favicon/*'
    ],
    imageGlob: paths.src + '/images/**/*.*',
    index: paths.src + '/index.html',
    templatesGlob: ['src/**/*.view.html'],
    workersGlob: paths.src + '/**/*.worker.js',
    vendorScriptsGlob: [
        'node_modules/leaflet/dist/leaflet.js',
        'node_modules/angular/angular.js',
        'node_modules/angularjs-datepicker/dist/angular-datepicker.js',
        'node_modules/angular-simple-logger/dist/angular-simple-logger.js',
        'node_modules/@uirouter/angularjs/release/angular-ui-router.js',
        'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
        'node_modules/ui-leaflet/dist/ui-leaflet.js'
    ],
    copyToBuildDirectoryGlob: [
        
    ]
};

var lintGlob = [
    paths.src
];

var watch = [
    paths.src + '/**/*.*',
    '!' + paths.src + '/vendor/**/*.js',
    'gulpfile.js',
    'gulp.config.js',
    'package.json'
];

module.exports = {
    moduleName: moduleName,
    appTitle: appTitle,
    productionBuild: productionBuild,
    stagingBuild: stagingBuild,
    output: output,
    paths: paths,
    lintGlob: lintGlob,
    watch: watch
};
