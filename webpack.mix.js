// webpack.mix.js

let mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js/app.js');
mix.sass('resources/sass/app.scss', 'public/css/app.css');