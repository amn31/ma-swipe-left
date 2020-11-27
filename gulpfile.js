// Requis
var gulp = require('gulp');
var browserSync = require('browser-sync');
var gulpIf = require('gulp-if');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
//JS
var del = require('del');
// Pour minifier les JS
var uglify = require('gulp-uglify');
// Include plugins
var plugins = require('gulp-load-plugins')(); // tous les plugins de package.json

// Variables de chemins
var source = './src'; // dossier de travail
var destination = './dist'; // dossier à livrer

// // Tâche "build css" = (LESS|SASS) + autoprefixer + CSScomb + beautify (source -> destination)
 gulp.task('css', function () {
//   console.log("TASK css");
//   return gulp.src(source + '/assets/css/*.scss')
//     //.pipe(plugins.less())
//     // Création du CSS avec formatage du code 
//     .pipe(sass()) 
//     .pipe(plugins.csscomb())
//     .pipe(plugins.cssbeautify({indent: '  '}))
//     .pipe(plugins.autoprefixer())
//     .pipe(gulp.dest(destination + '/assets/css/'))
   
 });

// Tâche "minifyCSS" = minification CSS (destination -> destination)
gulp.task('minifyCSS', function () {
  console.log("TASK minifyCSS");
  return gulp.src(source + '/css/*.css')
    .pipe(plugins.csso())
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(destination + '/css/')
    
    ).pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('minifyJS', function () {
  console.log("TASK minifyJS");
  return gulp.src(source + '/js/*.js')
    .pipe(uglify())
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(destination + '/js/')
    ).pipe(browserSync.reload({
      stream: true
    }));
});

// Tâche "html" = recopie (destination -> destination)
gulp.task('html', function () {
  console.log("TASK html");
  return gulp.src([source+'/*.html'])
    .pipe(gulp.dest(destination + '/'))
    .pipe(browserSync.reload({
     stream: true
   }));
});

// Tâche "html" = recopie (destination -> destination)
gulp.task('copy-js', function () {
  console.log("TASK copy-js");
  return gulp.src([source+'/js/*.js'])
    .pipe(gulp.dest(destination + '/js'))
    .pipe(browserSync.reload({
     stream: true
   }));
});

// Tâche "html" = recopie (destination -> destination)
gulp.task('copy-css', function () {
  console.log("TASK copy-css");
  return gulp.src([source+'/css/*.css'])
    .pipe(gulp.dest(destination + '/css'))
    .pipe(browserSync.reload({
     stream: true
   }));
});

// Tâche 'reload' après lancement de la tâche 'browser'
gulp.task('reload', function () {
  console.log("TASK reload");
  return browserSync.reload({
      stream: true
    });
});

//JS
gulp.task('clean', function(callback) {
  return del(['dist/**/*', '!dist/images', '!dist/images/**/*'], callback)
})

var cache = require('gulp-cache');
gulp.task('images', function(){
  return gulp.src(source+'/img/**/*.+(png|jpg|jpeg|gif|svg)')
  // Met en cache les images passées par imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

//JS
var runSequence = require('gulp4-run-sequence');
//JS
gulp.task('build', function (callback){
  console.log("Building files 'clean',['html','css','images'],'minifyCSS','minifyJS','copy-js','copy-css' ");
  
  // la tache 'clean' est exécutée en 1er
  // En parallèle 'html','css','images'
  // Puis la tache 'minifyCSS'
  runSequence('clean',['html'],'minifyCSS','minifyJS','copy-js','copy-css',callback);
})

//JS Démarrage du moteur
gulp.task('browser', function() {
  console.log("TASK browser");
  browserSync({
    server: {
      baseDir: destination
    },
  })
})

//JS
// Surveillance des fichiers modifiés
gulp.task('watch', function(){
  console.log("TASK watch");
   gulp.watch(source + '/css/*.css',  gulp.series('css','minifyCSS')); 
   // Reloads the browser whenever HTML or JS files change
   gulp.watch(source+'/*.html', gulp.parallel('html')); 
   gulp.watch(source+'/js/*.js', gulp.series('minifyJS','copy-js') , browserSync.reload); 
  // autres observations
});

// Tâche par défaut
gulp.task('default', gulp.parallel('browser', 'watch'));

