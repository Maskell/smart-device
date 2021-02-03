import gulp from "gulp";
import del from "del";
import sass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import plumber from "gulp-plumber";
import imagemin, { mozjpeg, svgo } from "gulp-imagemin";
import pngquant from "imagemin-pngquant";
import webp from "imagemin-webp";
import rename from "gulp-rename";
import browserSync from "browser-sync";
import svgstore from "gulp-svgstore";

const clean = () => del("build/**/*", { force: true });

const html = () => gulp.src("source/*.html").pipe(gulp.dest("build/"));

const devStyles = () =>
  gulp
    .src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build/css/"))
    .pipe(browserSync.stream());

const styles = () =>
  gulp
    .src("source/sass/style.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest("build/css/"));

const scripts = () => gulp.src("source/js/*").pipe(gulp.dest("build/js"));

const fonts = () => gulp.src("source/fonts/*.*").pipe(gulp.dest("build/fonts"));

const images = () =>
  gulp
    .src("source/img/*")
    .pipe(
      imagemin([
        mozjpeg({ quality: 75 }),
        pngquant({ quality: [0.7, 0.9], speed: 1, floyd: 1 }),
        svgo(),
      ])
    )
    .pipe(gulp.dest("build/img"));

const webpImages = () =>
  gulp
    .src("source/img/*.{jpg,png}")
    .pipe(imagemin([webp()]))
    .pipe(rename({ extname: ".webp" }))
    .pipe(gulp.dest("build/img/"));

const sprite = () =>
  gulp
    .src("source/img/icon-*.svg")
    .pipe(imagemin([svgo()]))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename("sprite_auto.svg"))
    .pipe(gulp.dest("build/img"));

const server = () => {
  browserSync.create();
  browserSync.init({
    server: "build/",
    notify: false,
  });
};

const watchFiles = () => {
  gulp.watch("source/sass/**/*.scss", devStyles);
  gulp.watch("source/js/*.js", scripts);
  gulp.watch("source/*.html", html);
  gulp.watch("build/*.html").on("change", browserSync.reload);
  gulp.watch("build/js/*.js").on("change", browserSync.reload);
};

export const build = gulp.series(
  clean,
  gulp.parallel(html, styles, scripts, fonts, images, webpImages, sprite)
);

export default gulp.series(
  clean,
  gulp.parallel(html, devStyles, scripts, fonts, images, webpImages, sprite),
  gulp.parallel(server, watchFiles)
);
