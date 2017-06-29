var gulp = require('gulp');
var connect = require('gulp-connect');
var wiredep = require('wiredep').stream;
var $ = require('gulp-load-plugins')();
var del = require('del');
var jsReporter = require('jshint-stylish');
var annotateAdfPlugin = require('ng-annotate-adf-plugin');
var pkg = require('./package.json');
var mochaPhantomJS = require('gulp-mocha-phantomjs');

var annotateOptions = {
    plugin: [
        annotateAdfPlugin
    ]
};

var templateOptions = {
    root: '',
    module: 'opengate-angular-js'
};

/** lint **/

gulp.task('csslint', function() {
    gulp.src('src/**/*.css')
        .pipe($.csslint())
        .pipe($.csslint.reporter());
});

gulp.task('jslint', function() {
    gulp.src('src/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter(jsReporter));
});

gulp.task('lint', ['csslint', 'jslint']);

/** serve **/

gulp.task('templates', function() {
    return gulp.src('src/**/*.html')
        .pipe($.angularTemplatecache('templates.tpl.js', templateOptions))
        .pipe(gulp.dest('.tmp/dist'));
});

gulp.task('sample', ['templates'], function() {
    var files = gulp.src(['src/**/*.js', 'src/**/*.css', 'src/*.less', '.tmp/dist/*.js'])
        .pipe($.if('*.js', $.angularFilesort()));

    gulp.src('sample/index.html')
        .pipe(wiredep({
            directory: './components/',
            bowerJson: require('./bower.json'),
            devDependencies: true,
            dependencies: true
        }))
        .pipe($.inject(files))
        .pipe(gulp.dest('.tmp/dist'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(['src/**'], ['sample']);
});

gulp.task('serve', ['watch', 'sample'], function() {
    connect.server({
        root: ['.tmp/dist', '.'],
        livereload: true,
        port: 9002
    });
});

gulp.task('test', function() {
    return gulp
        .src('test/opengate-angular-js.test.html')
        .pipe(mochaPhantomJS({
            reporter: 'spec',
            phantomjs: {
                useColors: true
            }
        }))
        .on('error', function() {
            testFailed = true;
        });
});

/** build **/

gulp.task('assets', ['clean'], function() {
    compileCSS();
    compileJS();
});

gulp.task('css', function() {
    compileCSS();
});

gulp.task('js', function() {
    compileJS();
});

function compileJS() {
    return gulp.src(['src/**/*.js', 'src/**/*.html'])
        .pipe($.if('*.html', $.minifyHtml()))
        .pipe($.if('*.html', $.angularTemplatecache(pkg.name + '.tpl.js', templateOptions)))
        .pipe($.angularFilesort())
        .pipe($.if('*.js', $.replace(/'use strict';/g, '')))
        .pipe($.concat(pkg.name + '.js'))
        .pipe(ver())
        .pipe($.headerfooter('(function(window, undefined) {\'use strict\';\n', '})(window);'))
        .pipe($.ngAnnotate(annotateOptions))
        .pipe(gulp.dest('dist'))
        .pipe(ext_replace('.min.js', '.js'))
        .pipe($.uglify())
        .pipe(gulp.dest('dist'));
}

function compileCSS() {
    return gulp.src(['src/**/*.css', 'src/*.less'])
        .pipe($.if('*.less', $.less()))
        .pipe($.concat(pkg.name + '.css'))
        .pipe(ver())
        .pipe(gulp.dest('dist'))
        .pipe(ext_replace('.min.css', '.css'))
        .pipe($.minifyCss())
        .pipe(gulp.dest('dist'));
}
/** clean **/

gulp.task('clean', function(cb) {
    del(['dist', '.tmp'], cb);
});

gulp.task('default', ['assets']);

// dependencies 
var ver = require('gulp-ver'),
    git = require('gulp-git'),
    bump = require('gulp-bump'),
    argv = require('yargs').argv,
    ext_replace = require('gulp-ext-replace'),
    tag_version = require('gulp-tag-version');


/**
 * Bumping version number and tagging the repository with it.
 * Please read http://semver.org/
 *
 * You can use the commands
 *
 *     gulp patch     # makes v0.1.0 → v0.1.1
 *     gulp feature   # makes v0.1.1 → v0.2.0
 *     gulp release   # makes v0.2.1 → v1.0.0
 *
 * To bump the version numbers accordingly after you did a patch,
 * introduced a feature or made a backwards-incompatible release.
 */

//STEP 1 
gulp.task('create:release:branch', ['clean'], function(cb) {
    git.checkout(temporalBranchRelease(), { args: '-b' }, function(err) {
        cb(err);
    })
});

// STEP 2
gulp.task('compile:js', ['increase:version'], function() {
    return compileJS();
})

gulp.task('compile:css', ['compile:js', 'increase:version'], function() {
    return compileCSS();
});

gulp.task('increase:version', ['create:release:branch', 'clean'], function() {
    console.log(versionType());
    return increase(versionType());
});


// STEP 2

// STEP 3 
gulp.task('commit:increase:version', ['compile:css'], function() {
    return gulp.src(['dist', './bower.json', './package.json'])
        .pipe(git.add())
        .pipe(git.commit('release ' + versionType() + ' version:' + versionNumber()))
});
// STEP 3 

// STEP 4
gulp.task('checkout:master:increase', ['commit:increase:version'], function(cb) {
    git.checkout(masterBranch(), function(err) {
        cb(err);
    })
});
gulp.task('merge:master:increase', ['checkout:master:increase'], function(cb) {
    git.merge(temporalBranchRelease(), { args: "--squash" }, function(err) {
        cb(err);
    });
})

gulp.task('commit:master:increase:version', ['merge:master:increase'], function() {
    return gulp.src(['.'])
        .pipe(git.add())
        .pipe(git.commit('release ' + versionType() + ' version:' + versionNumber()))
});

gulp.task('prepare_tag:increase', ['commit:master:increase:version'], function() {
    return gulp.src(['./package.json'])
        .pipe(tag_version());
});

gulp.task('prepare:master:increase', ['prepare_tag:increase']);

gulp.task('prepare:develop:increase', ['prepare:master:increase'], function(cb) {
    git.checkout(developBranch(), function(err) {
        if (!err) {
            git.merge(masterBranch(), function(err) {
                cb(err);
            });
        } else {
            cb(err);

        }
    });
});
// STEP 4

gulp.task('push:increase', ['prepare:develop:increase', 'prepare:master:increase'], function(cb) {
    git.push('origin', [masterBranch(), developBranch()], { args: " --follow-tags" }, function(err) {
        if (!err) {
            git.branch(temporalBranchRelease(), { args: "-D" }, function(err) {
                cb(err);
            });
        } else {
            cb(err);
        }
    });
});


function increase(importance) {
    // get all the files to bump version in 
    return gulp.src(['./package.json', './bower.json'])
        // bump the version number in those files 
        .pipe(bump({ type: importance }))
        // save it back to filesystem 
        .pipe(gulp.dest('./'))
}

function temporalBranchRelease() {
    return (argv['temporal-branch'] === undefined) ? 'release_branch' : argv['temporal-branch'];
}

function masterBranch() {
    return (argv['master-branch'] === undefined) ? 'master' : argv['master-branch'];
}

function developBranch() {
    return (argv['develop-branch'] === undefined) ? 'develop' : argv['develop-branch'];
}

function versionType() {
    if (isPatch()) return "patch";
    if (isMajor()) return "major";
    if (isMinor()) return "minor";
    throw new Error('Version increase type unknown. Only valid [minor,major,patch].');
}

function versionNumber() {
    var fs = require('fs')
    var json = JSON.parse(fs.readFileSync('package.json', 'utf8'))
    return json.version;
}

function isMinor() {
    return (argv.minor === undefined) ? false : true;
}

function isMajor() {
    return (argv.major === undefined) ? false : true;
}

function isPatch() {
    return (argv.patch === undefined) ? false : true;
}