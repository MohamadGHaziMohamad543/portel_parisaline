"use strict";
   const gulp = require("gulp"),
    newer = require("gulp-newer"),
    imagemin = require("gulp-imagemin"),
    sass = require("gulp-sass"),
    sourcemaps = require("gulp-sourcemaps"),
    autoprefixer = require("gulp-autoprefixer"),
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    concat = require("gulp-concat"),
    uglify = require('gulp-uglify-es').default,
    lodash = require("lodash"),
    browsersync = require("browser-sync"),
    modRewrite  = require('connect-modrewrite'),
    fileinclude = require('gulp-file-include');

const folder = {
    src: "src/", // source files
    dist: "dist/", // build files
    dist_assets: "dist/assets/" //build assets files
};

/*
Copy assets/vendors from their node_module package to scss & js folder
Read More: https://florian.ec/articles/frontend-dependencies-npm/
*/


function copyAssets(done) {
    var assets = {
        js: [
            "./node_modules/angular/angular.min.js",
            "./node_modules/angular-route/angular-route.min.js",
            "./node_modules/angular-sanitize/angular-sanitize.min.js",
            "./node_modules/angular-cookies/angular-cookies.min.js",
            "./node_modules/jquery/dist/jquery.js",
            "./node_modules/bootstrap/dist/js/bootstrap.bundle.js",
            "./node_modules/metismenu/dist/metisMenu.js",
            "./node_modules/jquery-slimscroll/jquery.slimscroll.js",
            "./node_modules/node-waves/dist/waves.js",
            "./node_modules/waypoints/lib/jquery.waypoints.min.js",
            "./node_modules/jquery.counterup/jquery.counterup.min.js",
        ],
        scss: [
            "./node_modules/metismenu/dist/metisMenu.css"
        ],
    };

    var third_party_assets = {
        css_js: [
            {"name": "pdfmake", "assets": ["./src/js/LIB/pdfmake.min.js","./src/js/LIB/vfs_fonts.js"]},
            {"name": "select2", "assets": ["./node_modules/select2/dist/js/select2.min.js", "./node_modules/select2/dist/css/select2.min.css"]},
            {"name": "imageViewer", "assets": ["./node_modules/viewerjs/dist/viewer.min.js", "./node_modules/viewerjs/dist/viewer.min.css"]},
            {"name": "jquery-nice-select", "assets": ["./node_modules/jquery-nice-select/js/jquery.nice-select.min.js", "./node_modules/jquery-nice-select/css/nice-select.css"]},
            {"name": "tellPhone", "assets": [ "./node_modules/intl-tel-input/build/js/intlTelInput.min.js","./node_modules/intl-tel-input/build/js/utils.js","./node_modules/intl-tel-input/build/css/intlTelInput.min.css","./node_modules/intl-tel-input/build/img/flags@2x.png","./node_modules/intl-tel-input/build/img/flags.png"]},
            {"name": "jquery-mask-plugin", "assets": ["./node_modules/jquery-mask-plugin/dist/jquery.mask.min.js"]},
            {"name": "jsPdf", "assets": ["./node_modules/jspdf/dist/jspdf.umd.min.js"]},
            {"name": "chart-js", "assets": ["./node_modules/chart.js/dist/Chart.bundle.min.js"]},
            {
                "name": "datatables", "assets": ["./node_modules/datatables.net/js/jquery.dataTables.min.js",
                    "./node_modules/datatables.net-bs4/js/dataTables.bootstrap4.js",
                    "./node_modules/datatables.net-responsive/js/dataTables.responsive.min.js",
                    "./node_modules/datatables.net-responsive-bs4/js/responsive.bootstrap4.min.js",
                    "./node_modules/datatables.net-buttons/js/dataTables.buttons.min.js",
                    "./node_modules/datatables.net-buttons-bs4/js/buttons.bootstrap4.min.js",
                    "./node_modules/datatables.net-buttons/js/buttons.html5.min.js",
                    "./node_modules/datatables.net-buttons/js/buttons.flash.min.js",
                    "./node_modules/datatables.net-buttons/js/buttons.print.min.js",
                    "./node_modules/datatables.net-keytable/js/dataTables.keyTable.min.js",
                    "./node_modules/datatables.net-select/js/dataTables.select.min.js",
                    "./node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css",
                    "./node_modules/datatables.net-responsive-bs4/css/responsive.bootstrap4.css",
                    "./node_modules/datatables.net-buttons-bs4/css/buttons.bootstrap4.css",
                    "./node_modules/datatables.net-select-bs4/css/select.bootstrap4.css"]
            },
            {"name": "pdfmake", "assets": ["./node_modules/pdfmake/build/pdfmake.min.js", "./node_modules/pdfmake/build/vfs_fonts.js"]},
            {"name": "jquery-ui", "assets": ["./node_modules/jquery-ui/jquery-ui.min.js"]},
            {"name": "fullcalendar", "assets": ["./node_modules/fullcalendar/dist/fullcalendar.min.js", "./node_modules/fullcalendar/dist/fullcalendar.min.css"]},
            {"name": "gmaps", "assets": ["./node_modules/gmaps/gmaps.min.js"]},
            {
                "name": "jquery-vectormap", "assets": ["./node_modules/admin-resources/jquery.vectormap/jquery-jvectormap-1.2.2.min.js",
                    "./node_modules/admin-resources/jquery.vectormap/maps/jquery-jvectormap-world-mill-en.js",
                    "./node_modules/admin-resources/jquery.vectormap/maps/jquery-jvectormap-us-merc-en.js",
                    "./node_modules/admin-resources/jquery.vectormap/maps/jquery-jvectormap-au-mill-en.js",
                    "./node_modules/admin-resources/jquery.vectormap/maps/jquery-jvectormap-us-il-chicago-mill-en.js",
                    "./node_modules/admin-resources/jquery.vectormap/maps/jquery-jvectormap-in-mill-en.js",
                    "./node_modules/admin-resources/jquery.vectormap/maps/jquery-jvectormap-uk-mill-en.js",
                    "./node_modules/admin-resources/jquery.vectormap/maps/jquery-jvectormap-ca-lcc-en.js",
                    "./node_modules/admin-resources/jquery.vectormap/jquery-jvectormap-1.2.2.css"]
            },
            {"name": "rwd-table", "assets": ["./node_modules/admin-resources/rwd-table/rwd-table.min.js", 
                "./node_modules/admin-resources/rwd-table/rwd-table.min.css"]},
            { "name": "ion-rangeslider", "assets": ["./node_modules/ion-rangeslider/js/ion.rangeSlider.min.js", "./node_modules/ion-rangeslider/css/ion.rangeSlider.css"] },
            {"name": "toastr", "assets": ["./node_modules/toastr/build/toastr.min.js", "./node_modules/toastr/build/toastr.min.css"]},
            {"name": "sweetalert2", "assets": ["./node_modules/sweetalert2/dist/sweetalert2.min.js", "./node_modules/sweetalert2/dist/sweetalert2.min.css"]},
            {"name": "switchery", "assets": ["./node_modules/mohithg-switchery/dist/switchery.min.js", "./node_modules/mohithg-switchery/dist/switchery.min.css"]},
            {"name": "bootstrap-maxlength", "assets": ["./node_modules/bootstrap-maxlength/bootstrap-maxlength.min.js"]},
            {"name": "jquery-sparkline", "assets": ["./node_modules/jquery-sparkline/jquery.sparkline.min.js"]},
            {"name": "jquery-knob", "assets": ["./node_modules/jquery-knob/dist/jquery.knob.min.js"]},
            {"name": "moment", "assets": ["./node_modules/moment/min/moment.min.js"]},
            {"name": "custombox", "assets": ["./node_modules/custombox/dist/custombox.min.js", "./node_modules/custombox/dist/custombox.min.css"]},
            {"name": "jquery-toast", "assets": ["./node_modules/jquery-toast-plugin/dist/jquery.toast.min.js", "./node_modules/jquery-toast-plugin/dist/jquery.toast.min.css"]},
            {"name": "tippy-js", "assets": ["./node_modules/tippy.js/dist/tippy.all.min.js"]},
            {"name": "jquery-scrollto", "assets": ["./node_modules/jquery.scrollto/jquery.scrollTo.min.js"]},
            {"name": "peity", "assets": ["./node_modules/peity/jquery.peity.min.js"]},
            {"name": "nestable2", "assets": ["./node_modules/nestable2/dist/jquery.nestable.min.js", "./node_modules/nestable2/dist/jquery.nestable.min.css"]},
            {"name": "hopscotch", "assets": ["./node_modules/hopscotch/dist/js/hopscotch.min.js", "./node_modules/hopscotch/dist/css/hopscotch.min.css"]},
            {"name": "ladda", "assets": ["./node_modules/ladda/js/spin.js", "./node_modules/ladda/js/ladda.js", "./node_modules/ladda/dist/ladda-themeless.min.css"]},
            {
                "name": "flot-charts", "assets": ["./node_modules/flot-charts/jquery.flot.js",
                    "./node_modules/flot-charts/jquery.flot.time.js",
                    "./node_modules/flot-charts/jquery.flot.resize.js",
                    "./node_modules/flot-charts/jquery.flot.pie.js",
                    "./node_modules/flot-charts/jquery.flot.selection.js",
                    "./node_modules/flot-charts/jquery.flot.stack.js",
                    "./node_modules/flot-charts/jquery.flot.crosshair.js",
                    "./node_modules/jquery.flot.tooltip/js/jquery.flot.tooltip.min.js",
                    "./node_modules/flot-orderbars/js/jquery.flot.orderBars.js"]
            },
            {"name": "raphael", "assets": ["./node_modules/raphael/raphael.min.js"]},
            {"name": "morris-js", "assets": ["./node_modules/morris.js/morris.min.js"]},
            { "name": "chartist", "assets": ["./node_modules/chartist/dist/chartist.min.js", "./node_modules/chartist-plugin-tooltips/dist/chartist-plugin-tooltip.min.js", "./node_modules/chartist/dist/chartist.min.css"] },
            {"name": "c3", "assets": ["./node_modules/c3/c3.min.js", "./node_modules/c3/c3.min.css"]},
            {"name": "d3", "assets": ["./node_modules/d3/dist/d3.min.js"]},
            {"name": "rickshaw", "assets": ["./node_modules/rickshaw/rickshaw.min.js", "./node_modules/rickshaw/rickshaw.min.css"]},
            {"name": "justgage", "assets": ["./node_modules/justgage/justgage.js"]},
            {"name": "jquery-tabledit", "assets": ["./node_modules/jquery-tabledit/jquery.tabledit.min.js"]},
            {"name": "footable", "assets": ["./node_modules/footable/dist/footable.all.min.js", "./node_modules/footable/css/footable.core.min.css"]},
            {"name": "bootstrap-table", "assets": ["./node_modules/bootstrap-table/dist/bootstrap-table.min.js", "./node_modules/bootstrap-table/dist/bootstrap-table.min.css"]},
            {"name": "tablesaw", "assets": ["./node_modules/tablesaw/dist/tablesaw.js", "./node_modules/tablesaw/dist/tablesaw.css"]},
            {"name": "jsgrid", "assets": ["./node_modules/jsgrid/dist/jsgrid.min.js", "./node_modules/jsgrid/dist/jsgrid.min.css", "./node_modules/jsgrid/dist/jsgrid-theme.css"]},
            {"name": "multiselect", "assets": ["./node_modules/multiselect/js/jquery.multi-select.js", "./node_modules/multiselect/css/multi-select.css"]},
            {"name": "bootstrap-select", "assets": ["./node_modules/bootstrap-select/dist/js/bootstrap-select.min.js", "./node_modules/bootstrap-select/dist/css/bootstrap-select.min.css"]},
            { "name": "bootstrap-touchspin", "assets": ["./node_modules/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js", "./node_modules/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.css"] },
            {"name": "jquery-mockjax", "assets": ["./node_modules/jquery-mockjax/dist/jquery.mockjax.min.js"]},
            {"name": "autocomplete", "assets": ["./node_modules/devbridge-autocomplete/dist/jquery.autocomplete.min.js"]},
            {"name": "parsleyjs", "assets": ["./node_modules/parsleyjs/dist/parsley.min.js"]},
            {"name": "flatpickr", "assets": ["./node_modules/flatpickr/dist/flatpickr.min.js", "./node_modules/flatpickr/dist/flatpickr.min.css"]},
            {"name": "bootstrap-colorpicker", "assets": ["./node_modules/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.min.js", "./node_modules/bootstrap-colorpicker/dist/css/bootstrap-colorpicker.min.css"]},
            {"name": "clockpicker", "assets": ["./node_modules/clockpicker/dist/bootstrap-clockpicker.min.js", "./node_modules/clockpicker/dist/bootstrap-clockpicker.min.css"]},
            {"name": "twitter-bootstrap-wizard", "assets": ["./node_modules/twitter-bootstrap-wizard/jquery.bootstrap.wizard.min.js"]},
            {"name": "autonumeric", "assets": ["./node_modules/autonumeric/autoNumeric-min.js"]},
            {"name": "summernote", "assets": ["./node_modules/summernote/dist/summernote-bs4.min.js", "./node_modules/summernote/dist/summernote-bs4.css"]},
            {
                "name": "quill", "assets": ["./node_modules/quill/dist/quill.min.js", "./node_modules/quill/dist/quill.core.css",
                    "./node_modules/quill/dist/quill.bubble.css",
                    "./node_modules/quill/dist/quill.snow.css"]
            },
            {"name": "dropzone", "assets": ["./node_modules/dropzone/dist/min/dropzone.min.js", "./node_modules/dropzone/dist/min/dropzone.min.css"]},
            {"name": "x-editable", "assets": ["./node_modules/x-editable/dist/bootstrap3-editable/js/bootstrap-editable.min.js", "./node_modules/x-editable/dist/bootstrap3-editable/css/bootstrap-editable.css"]},
            {"name": "cropper", "assets": ["./node_modules/cropper/dist/cropper.min.js", "./node_modules/cropper/dist/cropper.min.css"]},
            {"name": "katex", "assets": ["./node_modules/katex/dist/katex.min.js"]},
            {"name": "dropify", "assets": ["./node_modules/dropify/dist/js/dropify.min.js", "./node_modules/dropify/dist/css/dropify.min.css"]},
            {
                "name": "jquery-mapael", "assets": ["./node_modules/jquery-mapael/js/jquery.mapael.min.js",
                    "./node_modules/jquery-mapael/js/maps/world_countries.min.js",
                    "./node_modules/jquery-mapael/js/maps/usa_states.min.js"]
            },
            {"name": "jquery-countdown", "assets": ["./node_modules/jquery-countdown/dist/jquery.countdown.min.js"]},
            {"name": "magnific-popup", "assets": ["./node_modules/magnific-popup/dist/jquery.magnific-popup.min.js", "./node_modules/magnific-popup/dist/magnific-popup.css"]},
            {"name": "animate", "assets": ["./node_modules/animate.css/animate.min.css"]},
            {"name": "bootstrap-datepicker", "assets": ["./node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js","./node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css"]},
            {"name": "jquery-contextMenu", "assets": ["./node_modules/jquery-contextmenu/dist/jquery.contextMenu.min.js"
            ,"./node_modules/jquery-contextmenu/dist/jquery.contextMenu.min.css"]},
        ]
    };

    //copying third party assets
    lodash(third_party_assets).forEach(function (assets, type) {
        if (type == "css_js") {
            lodash(assets).forEach(function (plugin) {
                var name = plugin['name'];
                var assetlist = plugin['assets'];
                lodash(assetlist).forEach(function (asset) {
                    gulp.src(asset).pipe(gulp.dest(folder.dist_assets + "libs/" + name));
                });
            });
            //gulp.src(assets).pipe(gulp.dest(folder.dist_assets + "css/vendor"));
        }
    });

    //copying required assets
    lodash(assets).forEach(function (assets, type) {
        if (type == "scss") {
            gulp
                .src(assets)
                .pipe(
                    rename({
                        // rename aaa.css to _aaa.scss
                        prefix: "_",
                        extname: ".scss"
                    })
                )
                .pipe(gulp.dest(folder.src + "scss/vendor"));
        } else {
            gulp.src(assets).pipe(gulp.dest(folder.src + "js/vendor"));
        }
    });

    //copying data files

    gulp.src(folder.src + "manifest.json").pipe(gulp.dest(folder.dist));
    gulp.src(folder.src + "servicesWorker.js").pipe(gulp.dest(folder.dist));

    done();
}


function copyData(){
   return gulp.src(folder.src + "data/**").pipe(gulp.dest(folder.dist_assets + "/data"));
}
// image processing
function imageMin() {
    var out = folder.dist_assets + "images";
    return gulp
        .src(folder.src + "images/**/*")
        .pipe(newer(out))
        .pipe(imagemin())
        .pipe(gulp.dest(out));
}

// copy fonts from src folder to dist folder
function fonts() {
    var out = folder.dist_assets + "fonts/";

    return gulp.src([folder.src + "fonts/**/*"]).pipe(gulp.dest(out));
}

function sounds() {
    var out = folder.dist_assets + "sounds/";

    return gulp.src([folder.src + "sounds/**/*"]).pipe(gulp.dest(out));
}
function WPA() {
    var out = folder.dist + "WPA/";

    return gulp.src([folder.src + "WPA/**/*"]).pipe(gulp.dest(out));
}
function STL() {
    var out = folder.dist + "STL/";
    return gulp.src([folder.src + "STL/**/*"]).pipe(gulp.dest(out));
}
// copy html files from src folder to dist folder, also copy favicons
function html() {
    var out = folder.dist;

    return gulp
        .src([
            folder.src + "html/**/*.html",
            folder.src + "html/**/*.kiv",
            folder.src + "html/*.ico", // favicons
            folder.src + "html/*.png"
        ])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
        }))
        .pipe(gulp.dest(out));
}

// compile & minify sass
function css() {
    gulp
        .src([folder.src + "/scss/bootstrap.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass()) // scss to css
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 2 versions"]
            })
        )
        .pipe(gulp.dest(folder.dist_assets + "css/"))
        .pipe(cleanCSS())
        .pipe(
            rename({
                // rename app.css to icons.min.css
                suffix: ".min"
            })
        )
        .pipe(sourcemaps.write("./")) // source maps for icons.min.css
        .pipe(gulp.dest(folder.dist_assets + "css/"));
    gulp
        .src([folder.src + "/scss/icons.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass()) // scss to css
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 2 versions"]
            })
        )
        .pipe(gulp.dest(folder.dist_assets + "css/"))
        .pipe(cleanCSS())
        .pipe(
            rename({
                // rename app.css to icons.min.css
                suffix: ".min"
            })
        )
        .pipe(sourcemaps.write("./")) // source maps for icons.min.css
        .pipe(gulp.dest(folder.dist_assets + "css/"));
    gulp
        .src([folder.src + "/scss/app-rtl.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass()) // scss to css
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 2 versions"]
            })
        )
        .pipe(gulp.dest(folder.dist_assets + "css/"))
        .pipe(cleanCSS())
        .pipe(
            rename({
                // rename app.css to app.min.css
                suffix: ".min"
            })
        )
        .pipe(sourcemaps.write("./")) // source maps for app.min.css
        .pipe(gulp.dest(folder.dist_assets + "css/"));

    return gulp
        .src([folder.src + "/scss/app.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass()) // scss to css
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 2 versions"]
            })
        )
        .pipe(gulp.dest(folder.dist_assets + "css/"))
        .pipe(cleanCSS())
        .pipe(
            rename({
                // rename app.css to app.min.css
                suffix: ".min"
            })
        )
        .pipe(sourcemaps.write("./")) // source maps for app.min.css
        .pipe(gulp.dest(folder.dist_assets + "css/"));

}

// js
function javascript() {
    var out = folder.dist_assets + "js/";

    //copying demo pages related assets
    var app_pages_assets = {
        js: [
        ]
    };



    // It's important to keep files at this order
    // so that `app.min.js` can be executed properly
    gulp
        .src([
            folder.src + "js/vendor/angular.min.js",
            folder.src + "js/vendor/angular-route.min.js",
            folder.src + "js/vendor/angular-sanitize.min.js",
            folder.src + "js/vendor/angular-cookies.min.js",
            folder.src + "js/Render.js",
            folder.src + "js/vendor/jquery.js",
            folder.src + "js/vendor/bootstrap.bundle.js",
            folder.src + "js/vendor/jquery.slimscroll.js",
            folder.src + "js/vendor/metisMenu.js",
            folder.src + "js/vendor/waves.js",
            folder.src + "js/vendor/jquery.waypoints.min.js",
            folder.src + "js/vendor/jquery.counterup.min.js",
        ])
        .pipe(sourcemaps.init())
        .pipe(concat("vendor.js"))
        .pipe(gulp.dest(out))
        .pipe(
            rename({
                // rename app.js to app.min.js
                suffix: ".min"
            })
        )
        .pipe(uglify())
        .on("error", function (err) {
            console.log(err.toString());
        })
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(out));

        gulp
        .src([
            folder.src + "js/Router.js",
        ])
        .pipe(sourcemaps.init())
        .pipe(gulp.dest(out));

    return gulp
        .src([
            folder.src + "js/Controller/**/*js"
        ])
        .pipe(sourcemaps.init())
        .pipe(concat("app.js"))
        .pipe(gulp.dest(out))
        .pipe(
            rename({
                // rename app.js to app.min.js
                suffix: ".min"
            })
        )
        .pipe(uglify())
        .on("error", function (err) {
            console.log(err.toString());
        })
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(out));
}

// live browser loading
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: folder.dist,
            middleware: [
                modRewrite(['^([^.]+)$ /index.html [L]'])
            ]
        }
    });
    done();
}

function reloadBrowserSync(done) {
    browsersync.reload();
    done();
}

// watch all changes
function watchFiles() {
    gulp.watch(folder.src + "html/**/*", gulp.series(html, reloadBrowserSync));
    gulp.watch(folder.src + "assets/images/**/*", gulp.series(imageMin, reloadBrowserSync));
    gulp.watch(folder.src + "assets/fonts/**/*", gulp.series(fonts, reloadBrowserSync));
    gulp.watch(folder.src + "assets/sounds/**/*", gulp.series(sounds, reloadBrowserSync));
    gulp.watch(folder.src + "WPA/**/*", gulp.series(sounds, reloadBrowserSync));
    gulp.watch(folder.src + "STL/**/*", gulp.series(sounds, reloadBrowserSync));
    gulp.watch(folder.src + "scss/**/*", gulp.series(css, reloadBrowserSync));
    gulp.watch(folder.src + "js/**/*", gulp.series(javascript, reloadBrowserSync));
    gulp.watch(folder.src + "manifest.json", gulp.series(javascript, reloadBrowserSync));
    gulp.watch(folder.src + "servicesWorker.js", gulp.series(javascript, reloadBrowserSync));
    gulp.watch(folder.src + "data/**/*", gulp.series(copyData, reloadBrowserSync));
}

var pump = require('pump');
gulp.task('uglify-js', function (cb) {
   pump([
     gulp.src('build/babel/main.js'),
     uglify(),
     gulp.dest('build/js')
   ],
   cb
);
});

// watch all changes
gulp.task("watch", gulp.parallel(watchFiles, browserSync));

// default task
gulp.task(
    "default",
    gulp.series(
        copyAssets,
        html,
        imageMin,
        fonts,
        sounds,
        WPA,
        STL,
        css,
        javascript,
        copyData,
        'watch'
    ),
    function(done) {done();}
);

// build
gulp.task(
    "build",
    gulp.series(copyAssets,
        html,
        imageMin,
        fonts,
        css,
        javascript)
);