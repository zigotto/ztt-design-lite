var gulp            = require("gulp");
var sass            = require("gulp-sass");
var watch           = require("gulp-watch");
var concat          = require("gulp-concat");
var cssnano         = require("gulp-cssnano");
var plumber         = require("gulp-plumber");
var browserSync     = require("browser-sync");
var autoprefixer    = require("gulp-autoprefixer");
var angularFileSort = require("gulp-angular-filesort");

var paths = {
  js:       'src/js/**/*.js',
  sass:     'src/sass/**/*.sass',
  mainSass: 'src/sass/main.sass',
  dist:     'dist/',
  dev:      'src/'
};

var autoprefixerOptions = {
  browsers: [
      '> 1%',
      'last 2 versions',
      'firefox >= 4',
      'safari 7',
      'safari 8',
      'IE 8',
      'IE 9',
      'IE 10',
      'IE 11'
  ],
  cascade: false
};

gulp.task("style", function () {
  gulp.src(paths.mainSass)
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(cssnano())
    .pipe(gulp.dest(paths.dist));
});

gulp.task("js", function () {
  gulp.src(paths.js)
    .pipe(plumber())
    .pipe(angularFileSort())
    .pipe(concat("main.js"))
    .pipe(gulp.dest(paths.dist));
});

gulp.task("watch", function () {
  watch(paths.js, function () {
    gulp.start("js");
  });

  watch(paths.sass, function () {
    gulp.start("style");
  });
});

gulp.task('browser-sync', function () {
  browserSync.init(paths.dev, {
    port: '9000',
    server: {
      baseDir: paths.dev,
      routes: {
        "/dist": "dist"
      }
    },
    socket: {
      port: '9000',
      domain: 'localhost:9000'
    }
  });
});

gulp.task("build",   ["style", "js"]);
gulp.task("default", ["style", "js", "watch", "browser-sync"]);
