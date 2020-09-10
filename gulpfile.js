const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const uglifyCss = require('gulp-uglifycss');
const imageMin = require('gulp-imagemin');
const sprite = require('gulp.spritesmith');
const svgSprite = require('gulp-svg-sprites');

const pug = require('gulp-pug');
const pugInheritance = require('gulp-pug');
const beautify = require('gulp-beautify');
const plumber = require('gulp-plumber');

const rename = require("gulp-rename");
const concat = require('gulp-concat');
// const uglify = require('gulp-uglify');
const uglify = require('gulp-uglify-es').default;
const fs = require('fs');
const browserSync = require('browser-sync').create();
const reload      = browserSync.reload;
const cowSay = require('cowsay');

const sourcesObject = {
    style: './assets/src/styles/main.scss',
    allStyles: './assets/src/styles/**/*',
    images: './assets/src/images/img/**/*',
    sprites: {
        all: './assets/src/images/sprites/*',
        sprites: './assets/src/images/sprites/*.png',
        spritesRestina: './assets/src/images/sprites/*@2x.png',
    },
    svg: './assets/src/images/icons/**/*.svg',
    allPug: './assets/src/pug/*.pug',
    scripts: () => JSON.parse(fs.readFileSync('./assets/src/scripts/init.json')).map((path) => `./assets/src/scripts/${path}`),
    allScripts: './assets/src/scripts/**/*',
    fonts: './assets/src/fonts/**/*.*'
};

const buildObject = {
    style: './assets/build/css',
    html: './assets/build',
    images: './assets/build/img',
    sprites: {
        spritesStyle: './assets/src/styles/common',
        spritesImages: './assets/build/img',
    },
    svg: './assets/build/img',
    script: './assets/build/js',
    fonts: './assets/build/fonts/'
};

let devMode = true;
let watchMode = false;

gulp.task('style', () => {
    return gulp.src(sourcesObject.style)
        .pipe(gulpif(devMode, sourcemaps.init()))
        .pipe(sass({
            sourceMap: { inline: true },
            'include css': true,
            includePaths: ['./node_modules']
        }).on('error', sass.logError))
        .pipe(gulpif(!devMode, uglifyCss()))
        .pipe(gulpif(devMode, sourcemaps.write('.')))
        .pipe(gulp.dest(buildObject.style))
        .pipe(gulpif(watchMode, browserSync.stream()));
});

gulp.task('images', () => {
    return gulp.src(sourcesObject.images)
        .pipe(gulpif(!devMode, imageMin()))
        .pipe(gulp.dest(buildObject.images))
        .pipe(gulpif(watchMode, browserSync.stream()));
});

gulp.task('fonts', () => {
    return gulp.src(sourcesObject.fonts)
        .pipe(gulp.dest(buildObject.fonts));
});

gulp.task('sprites', (done) => {
    const spriteOutput = gulp.src(sourcesObject.sprites.sprites)
        .pipe(sprite({
            imgName: 'sprites.png',
            imgPath: '../img/sprites.png',
            cssName: 'sprites.scss',
            algorithm: 'binary-tree',
            retinaImgName: 'sprites-retina.png',
            retinaImgPath: '../img/sprites-retina.png',
            retinaSrcFilter: sourcesObject.sprites.spritesRestina,
        }));
    spriteOutput.css
        .pipe(gulp.dest(buildObject.sprites.spritesStyle));
    spriteOutput.img
        //.pipe(gulpif(!devMode, imageMin()))
        .pipe(gulp.dest(buildObject.sprites.spritesImages))
        .pipe(gulpif(watchMode, browserSync.stream()));

    done();
});

gulp.task('svg', () => {
    return gulp.src(sourcesObject.svg)
        .pipe(svgSprite({
            mode: 'symbols',
            padding: 0,
            svg: {
                symbols: 'symbols.svg'
            },
            preview: false
        }))
        .pipe(gulp.dest(buildObject.svg))
        .pipe(gulpif(watchMode, browserSync.stream()));
});

gulp.task('pug', () => {
    //return browserSync.stream();

    return gulp.src(sourcesObject.allPug)
      .pipe(plumber())
      //.pipe(changed('dist', {extension: '.html'}))
      //.pipe(gulpif(global.isWatching, cached('pug')))
      .pipe(pugInheritance({basedir: sourcesObject.allPug, skip: 'node_modules'}))
      //.pipe(filter(function (file) {
      //  return !/\/_/.test(file.path) && !/^_/.test(file.relative);
      //}))
      .pipe(pug({
        pretty: false,
        doctype: 'html'
      }))
      .pipe(beautify.html({
        indent_size: 2,
        inline: []
      }))
      .pipe(plumber.stop())
      .pipe(gulp.dest(buildObject.html))
      .on('end', reload);
});

gulp.task('script', () => {
    return gulp.src(sourcesObject.scripts())
        .pipe(gulpif(devMode, sourcemaps.init()))
        .pipe(concat('app.js'))
        .pipe(gulpif(!devMode, uglify()))
        .pipe(gulpif(devMode, sourcemaps.write('./')))
        .pipe(gulp.dest(buildObject.script))
        .pipe(gulpif(watchMode, browserSync.stream()));
});

gulp.task('browserSync', () => {
    browserSync.init({
        //proxy: "dublinprint.loc",
        server: "./assets/build"
    });

    gulp.watch(sourcesObject.allPug, gulp.series('pug'));
    gulp.watch(sourcesObject.allStyles, gulp.series('style'));
    gulp.watch(sourcesObject.images, gulp.series('images'));
    gulp.watch(sourcesObject.svg, gulp.series('svg'));
    gulp.watch(sourcesObject.sprites.all, gulp.series('sprites'));
    gulp.watch(sourcesObject.allScripts, gulp.series('script'));
    gulp.watch(sourcesObject.allPug).on("change", reload);
});

gulp.task('build', gulp.series('sprites', 'images', 'fonts', 'pug', 'style', 'svg', 'script', (done) => {
    console.log(cowSay.say({
        text : "I'm build your project as developer mode!",
        e : "oO",
        T : "U "
    }));
    done();
}));

gulp.task('prod', gulp.series((done) => {
    devMode = false;
    done();
}, 'build', (done) => {
    console.log(cowSay.say({
        text : "I'm build your project as product mode!",
        e : "oO",
        T : "U "
    }));
    done();
}));

gulp.task('watch', gulp.series((done) => {
    watchMode = true;
    done();
}, 'build', (done) => {
    console.log(cowSay.say({
        text : "Lets start developing!",
        e : "oO",
        T : "U "
    }));
    done();
}, 'browserSync'));
