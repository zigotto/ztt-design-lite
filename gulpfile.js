var gulp            = require("gulp");
var sass            = require("gulp-sass");
var watch           = require("gulp-watch");
var concat          = require("gulp-concat");
var gulpif          = require("gulp-if");
var uglify          = require("gulp-uglify");
var cssnano         = require("gulp-cssnano");
var plumber         = require("gulp-plumber");
var browserSync     = require("browser-sync");
var autoprefixer    = require("gulp-autoprefixer");
var angularFileSort = require("gulp-angular-filesort");

var paths = {
  js:       'src/js/**/*.js',
  sass:     'src/sass/**/*.sass',
  mainSass: 'src/sass/zttdesignlite.sass',
  dist:     'dist/',
  src:      'src/',
  dev:      'dev/'
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

function proccessCssTo (location) {
  return gulp.src(paths.mainSass)
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(cssnano())
    .pipe(gulp.dest(paths[location]));
}

function proccessJsTo (location) {
  return gulp.src(paths.js)
    .pipe(plumber())
    .pipe(angularFileSort())
    .pipe(concat("zttdesignlite.js"))
    .pipe(gulpif(location === "dist", uglify()))
    .pipe(gulp.dest(paths[location]));
}

gulp.task("cssDev", function () {
  return proccessCssTo("dev");
});

gulp.task("cssDist", function () {
  return proccessCssTo("dist");
});

gulp.task("jsDev", function () {
  return proccessJsTo("dev");
});

gulp.task("jsDist", function () {
  return proccessJsTo("dist");
});

gulp.task("watch", function () {
  watch(paths.js, function () {
    gulp.start("jsDev");
  });

  watch(paths.sass, function () {
    gulp.start("cssDev");
  });
});

gulp.task('browser', function () {
  browserSync.init(paths.src, {
    port: '9000',
    server: {
      baseDir: paths.src,
      routes: {
        "/dev": "dev"
      }
    },
    socket: {
      port: '9000',
      domain: 'localhost:9000'
    }
  });
});

gulp.task("dev",   ["cssDev", "jsDev", "watch", "browser"]);
gulp.task("build", ["cssDist", "jsDist"]);
