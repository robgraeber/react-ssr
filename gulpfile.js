var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var browserify  = require('browserify');
var reactify    = require('reactify'); 
var watchify    = require('watchify');
var browserSync = require('browser-sync');
var reloadMe    = require('browser-sync').reload;
var imageMin    = require('gulp-imagemin');
var clean       = require('gulp-rimraf');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var stylus      = require('gulp-stylus');
var streamify   = require('gulp-streamify');
var source      = require('vinyl-source-stream');
var cssMin      = require('gulp-minify-css');
var nib         = require('nib');
var es          = require('event-stream');
var merge       = require('event-stream').concat;

var publicDir       = './public';
var publicAssetsDir = './public/assets';

var browserifyAppJS = function(minifyMe, watchCb) {
  var bundler = browserify({
      extensions: [".jsx"],
      entries: ['./client/app/AppView.jsx'], // Only need initial file, browserify finds the deps
      transform: [reactify], // We want to convert JSX to normal javascript
      debug: true, // Gives us sourcemapping
      cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
  });
  if(watchCb){
    bundler = watchify(bundler);
    bundler.on('update', function () { // When any files update
      watchCb(bundler)
    })
  }
  return bundler.bundle() // Create the initial bundle when starting the task
  .pipe(source('app.js'))
  .pipe(gulpif(minifyMe, streamify(uglify())))
  .pipe(gulp.dest(publicDir));
};
var concatCSS = function(minifyMe){
  return gulp.src([
    './client/app/**/*.styl',
  ])
  .pipe(stylus({use: [nib()]}))
  .pipe(concat('app.css'))
  .pipe(gulpif(minifyMe, cssMin()))
  .pipe(gulp.dest(publicDir))
  .pipe(reloadMe({stream:true}));
};
var copyStuff = function(minifyMe) {
  return gulp.src([
    './client/**/*', 
    '!./client/**/*.{js,jsx}', 
    '!./client/**/*.styl', 
    '!./client/lib/**/*'
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
    proxy: "localhost:8000"
    // notify: false,
  });
};

//cleans build folder
gulp.task('clean', function(){
  return gulp.src(publicDir,{read: false})
  .pipe(clean());
});
  
//build + watching, for development
gulp.task('default', ['clean'], function(){
  var browserifyTask = browserifyAppJS(false, function(watcher){
    console.log("File change - browserifyAppJS()");
    watcher.bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest(publicDir))
    .pipe(reloadMe({stream:true}));
  });

  gulp.watch('./client/app/**/*.styl', function(){
    console.log("File change - concatCSS()");
    concatCSS();
  });
  gulp.watch(['./client/**/*', '!./client/**/*.js', '!./client/**/*.styl', '!./client/lib/**/*'], function(){
    console.log("File change - copyStuff()");
    copyStuff()
    .pipe(reloadMe({stream:true}));
  });

  return merge(copyStuff(), concatCSS(), browserifyTask)
  .on("end", function(){
    syncMe();
  });;
});

//production build task
gulp.task('build', ['clean'], function(){
  return merge(copyStuff(), browserifyAppJS(true), concatCSS(true))
  .on("end", function(){
    minifyImages();
  });
});
