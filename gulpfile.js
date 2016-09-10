var gulp         = require("gulp");
var sass         = require("gulp-sass");
var concat       = require("gulp-concat");
var cssnano      = require("gulp-cssnano");
var plumber      = require("gulp-plumber");
var autoprefixer = require("gulp-autoprefixer");

var srcPaths = {
  sass:     'src/sass/**/*.sass',
  mainSass: 'src/sass/main.sass'
};

var buildPaths = {
  build: 'dist/'
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

gulp.task("style", function() {
  gulp.src(srcPaths.mainSass)
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(cssnano())
    .pipe(gulp.dest(buildPaths.build));
});

gulp.task("watch", function() {
  gulp.watch(srcPaths.sass, ["style"]);
});

gulp.task("default", ["style", "watch"]);
