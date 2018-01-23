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


mix.webpackConfig({
    resolve: {
        modules: [
            path.resolve('node_modules'),
            //path.resolve(__dirname, 'resources/assets/js/app-v1/auth')
        ],
        alias: {
            AppUtils: path.resolve(__dirname, 'resources/assets/js/app-v1/utils/'),
            Auth: path.resolve(__dirname, 'resources/assets/js/app-v1/auth/'),
            Common: path.resolve(__dirname, 'resources/assets/js/app-v1/common/'),

            Clients: path.resolve(__dirname, 'resources/assets/js/app-v1/clients/'),
            Orders: path.resolve(__dirname, 'resources/assets/js/app-v1/orders/'),
        }
    }
}).react('resources/assets/js/index.js', 'public/js/app.js')
   .sass('resources/assets/sass/app.scss', 'public/css', {
    includePaths: ['node_modules']
   })
   .styles([
       'node_modules/react-datetime/css/react-datetime.css',
       'node_modules/open-iconic/font/css/open-iconic-bootstrap.css'
    ], 'public/css/vendor.css')
    .copy('node_modules/open-iconic/font/fonts', 'public/fonts')
   .browserSync('signex.app');
