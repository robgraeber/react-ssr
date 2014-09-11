var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var browserify  = require('browserify');
var browserSync = require('browser-sync');
var reloadMe    = browserSync.reload;
var imageMin    = require('gulp-imagemin');
var clean       = require('gulp-rimraf');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var stylus      = require('gulp-stylus');
var source      = require('vinyl-source-stream');
var cssMin      = require('gulp-minify-css');
var nib         = require('nib');
var es          = require('event-stream');
var merge       = require('event-stream').concat;

var publicDir       = './public';
var publicAssetsDir = './public/assets';

var browserifyAppJS = function(minifyMe) {
  return browserify('./frontend/app/app.js')
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest(publicDir));
};
var concatCSS = function(minifyMe){
  return gulp.src([
    './frontend/app/**/*.styl',
  ])
  .pipe(stylus({use: [nib()]}))
  .pipe(concat('app.css'))
  .pipe(gulpif(minifyMe, cssMin()))
  .pipe(gulp.dest(publicAssetsDir))
  .pipe(reloadMe({stream:true}));
};
var copyStuff = function(minifyMe) {
  return gulp.src([
    './frontend/**/*', 
    '!./frontend/**/*.js', 
    '!./frontend/**/*.styl', 
    '!./frontend/lib/**/*'
  ])
  .pipe(filterEmptyDirs())
  .pipe(gulp.dest(publicDir));
};
//removes empty dirs from stream
var filterEmptyDirs = function() {
  return es.map(function(file, cb) {
      if (file.stat.isFile()) {
        return cb(null, file);
      } else {
        return cb();
      }
  });
};

var minifyImages = function(){
  return gulp.src([
    publicAssetsDir+"/**/*",
  ])
  .pipe(imageMin())
  .pipe(gulp.dest(publicAssetsDir));
};

//opens up browserSync url
var syncMe = function(){
  browserSync({
    server: {
      baseDir: publicDir,
      notify: false,
    }
  });
};

//cleans build folder
gulp.task('clean', function(){
  return gulp.src(publicDir,{read: false})
  .pipe(clean());
});
  
//build + watching, for development
gulp.task('default', ['clean'], function(){

  gulp.watch('./frontend/app/**/*.js', function(){
    console.log("File change - browserifyAppJS()");
    browserifyAppJS().on("end", function(){
      reloadMe();
    });
  });
  gulp.watch('./frontend/app/**/*.styl', function(){
    console.log("File change - concatCSS()");
    concatCSS().on("end", function(){
      // reloadMe();
    });
  });
  gulp.watch(['./frontend/**/*', '!./frontend/**/*.js', '!./frontend/**/*.styl', '!./frontend/lib/**/*'], function(){
    console.log("File change - copyStuff()");
    copyStuff().on("end", function(){
      reloadMe();
    });
  });
  return merge(copyStuff(), browserifyAppJS(), concatCSS())
  .on("end", function(){
    syncMe();
  });;
});

//production build task
gulp.task('build', ['clean'], function(){
  return merge(copyStuff(), browserifyAppJS(false), concatCSS(false))
  .on("end", function(){
    minifyImages();
  });
});
