var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var browserSync = require('browser-sync');
var reloadMe    = require('browser-sync').reload;
var webpack     = require('gulp-webpack');
var imageMin    = require('gulp-imagemin');
var clean       = require('gulp-rimraf');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var stylus      = require('gulp-stylus');
var cssMin      = require('gulp-minify-css');
var nib         = require('nib');
var es          = require('event-stream');
var merge       = require('event-stream').concat;

var publicDir       = './public';
var publicAssetsDir = './public/assets';

var webpackAppJS = function(minifyMe) {

  return gulp.src('./client/app/AppView.jsx')
    .pipe(webpack({
      module: {
        loaders: [
          { test: /\.jsx$/, loader: 'jsx-loader?insertPragma=React.DOM' },
        ],
      },
      resolve: {
        // you can now require('file') instead of require('file.coffee')
        extensions: ['', '.js', '.jsx'] 
      }
    }))
    .pipe(concat('app.js'))
    .pipe(gulpif(minifyMe, uglify()))
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

  gulp.watch(['./client/app/**/*.js', './client/app/**/*.jsx'], function(){
    console.log("File change - webpackAppJS()");
    webpackAppJS()
    .pipe(reloadMe({stream:true}));
  });
  gulp.watch('./client/app/**/*.styl', function(){
    console.log("File change - concatCSS()");
    concatCSS();
  });
  gulp.watch(['./client/**/*', '!./client/**/*.js', '!./client/**/*.jsx', '!./client/**/*.styl', '!./client/lib/**/*'], function(){
    console.log("File change - copyStuff()");
    copyStuff()
    .pipe(reloadMe({stream:true}));
  });

  return merge(copyStuff(), concatCSS(), webpackAppJS())
  .on("end", function(){
    syncMe();
  });;
});

//production build task
gulp.task('build', ['clean'], function(){
  return merge(copyStuff(), webpackAppJS(true), concatCSS(true))
  .on("end", function(){
    minifyImages();
  });
});
