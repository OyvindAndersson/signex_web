const { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/assets/js/index.js', 'public/js/app.js')
   .sass('resources/assets/sass/app.scss', 'public/css', {
    includePaths: ['node_modules']
   })
   .styles([
       'node_modules/react-datetime/css/react-datetime.css',
       'node_modules/open-iconic/font/css/open-iconic-bootstrap.css'
    ], 'public/css/vendor.css')
    .copy('node_modules/open-iconic/font/fonts', 'public/fonts')
   .browserSync('signex.app');
