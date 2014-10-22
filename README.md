# grunt-swig [![Build Status](https://travis-ci.org/rtgibbons/grunt-swig.png?branch=master)](https://travis-ci.org/rtgibbons/grunt-swig)

> A static site compiler for grunt based on [swig templates](http://paularmstrong.github.com/swig/)

## Version 1.0.0

This branch will serve as the integration point for the next release: v1.0.0.

[Check out the discussion of v1.0.0 features](https://github.com/rtgibbons/grunt-swig/issues/33)

The latest stable release is [v0.2.1](https://github.com/rtgibbons/grunt-swig/tree/master) which can be found in the master branch

## Call for Help

As time has passed, I haven't had a need to use this beyond the initial creation of the task. I've tried to keep up with it, but I no longer have the time to bug fix and verify the pull requests. If you are interested in helping out, get some pull requests coming in and let me know you are interested in maintaining this package.

The only thing I want to verify before I give out access is the code is somewhat clean, and the tests are are there.

Thanks!

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-swig --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-swig');
```

## The "swig" task

### Overview
In your project's Gruntfile, add a section named `swig` to the data object passed into `grunt.initConfig()`.

```js
swig: {
    // The default options.  If the task does not specify an 'options' object, this will be used instead.  Or it can be omitted entirely.
    options: {
        generateSitemap: false,
        templateData: {
            greeting: "Hello Default Greeting!"
        },
	},
	dev: {
        options: {
            generateSitemap: true, // Whether or not to generate a sitemap
			siteUrl: 'http://mydomaindev.net/', // Used when sitemap is generated
			templateData: {
				greeting: "Hello overridden Greeting!",
                myVar: "some other variable"
			},
            // The sitemap weightings.  If omitted, the default will be used
			sitemap: {
				'default': { // Override the default sitemap options.  This will be used if the specific file is not specified.
					changefreq: 'never',
					lastmod: '2013-01-01',
					priority: '0.5'
				},
				'index.html': {
					changefreq: 'daily',
					lastmod: '2009-01-01',
					priority: '0.8'
				},
				'test/index.html': {
					changefreq: 'monthly',
					priority: '0.4'
				}
			},
			swigOptions: { // Options to pass in to swig
                cache: false
			}
        },
        src: ['**/*.swig'], // The pattern to search for files
        dest: 'www/' // The destination directory path where the generated files will be placed
    },
	prod: {
        src: ['src-prod/**/*.swig'],
        dest: 'www-prod/'
    }
}
```

Grunt Swig will loop through files listed in ```src```

__Note: Only files ending with ```.swig``` will be processed__

Your file extension is specified within your filename.  For example:

```index.html.swig``` will generate the file ```index.html```

```myFile.txt.swig``` will generate the file ```myFile.txt```

The siteUrl is used to build a sitemap. You can adjust the defaults for each file/page in the options.

To override the default extension of `.html` by specifying the ```generatedExtension``` (without the period) in your config.

To write your files directly to the specified `dest` directory and not have it expand the subdirectory path, set ```expandDirectories``` to ```false```.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 2013-12-20 - v(0.2.1) Fix Issue #20, bad logic in config variables
* 2013-11-18 - (v0.2.0) Swig 1.0 support, major refactor by [@nickpack](https://github.com/nickpack)
* 2013-09-23 - Template basename and path added - Thanks [@polem](https://github.com/polem)!
* 2013-06-08 - Fixed regression caused by init block addition preventing finding associated json payloads
* 2013-05-26 - Added init key to grunt config to allow passing over of swig options.
* 2013-05-24 - Added options to enable/disable sitemap.xml and robots.txt generation, added travis ci config.
* 2013-05-14 - Basic test suite added by Thomas Lebeau
* 2013-05-14 - respect the full source path
* 2013-04-13 - [@nickpack](https://github.com/nickpack) - Refactored to work with the latest version of grunt, tidied up code and added global variable js
* 2012-11-04 - Added custom priorities to sitemap.xml when built (kengoldfarb)
* 2012-11-04 - Added ability to build robots.txt (kengoldfarb)
* 2012-11-04 - Added ability to build sitemap
* Initial Commit - compiles templates with context

`ANYONE RUNNING 0.1.1 IS ADVISED TO UPGRADE TO 0.1.2 - There is an error in 0.1.1 package.json`
