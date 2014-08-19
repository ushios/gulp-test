Gulp-test
==========

Dependencies
------------

* [npm](https://www.npmjs.org/)
* [sass](http://sass-lang.com/)

Get started.
------------

### 1. Install global npm packages.

    $ npm install -g gulp browser-sync

### 2. Install local npm packages

    $ npm install


Using live reload.
-------------------

## gulp-connect
    $ gulp connect

## browser-sync
    $ gulp watch
    /* open new terminal */
    $ cd web
    $ browser-sync start --files="./**" --server

Command log
------------

### Genral plugins.

    $ npm install --save-dev gulp@3.6.2 gulp-util gulp-watch gulp-plumber gulp-connect

### Css plugins.

    $ npm install --save-dev gulp-sass gulp-minify-css gulp-csso

### Javascript plugins.

    $ npm install --save-dev gulp-jshint jshint-stylish gulp-uglifyjs

### HTML plugins.

    $ npm install --save-dev gulp-htmlhint gulp-minify-html