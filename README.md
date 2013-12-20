# grunt-swig [![Build Status](https://travis-ci.org/rtgibbons/grunt-swig.png?branch=master)](https://travis-ci.org/rtgibbons/grunt-swig)

> A static site compiler for grunt based on [swig templates](http://paularmstrong.github.com/swig/)

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
  development: {
    init: {
        autoescape: true
    },
    dest: "www/",
    src: ['**/*.swig'],
    generateSitemap: true,
    generateRobotstxt: true,
    siteUrl: 'http://mydomain.net/',
    production: false,
    fb_appid: '1349v',
    ga_account_id: 'UA-xxxxxxxx-1',
    robots_directive: 'Disallow /',
    sitemap_priorities: {
        '_DEFAULT_': '0.5',
        'index.html': '0.8',
        'subpage.html': '0.7'
    }
  }
}
```

Grunt Swig will loop through files listed in `src`

Ex. `source/index.swig`. It will look for a `source/index.json` and add it to
the rest of the variables provided in `swig:development` or in `global.js`, and then run swig
against `source/index.swig` saving the output to `www/index.html`

You can also provide context, for example `swig:development:blue` which will
perform the same actions above, but after process the JSON it will also expand
the variable list with `source/index.blue.json` and provide the variable
`context` to the rest of the swig template.

The siteUrl is used to build a sitemap. Right now all the other elements are
hard coded, eventually this could be set in the config object.

The 'sitemap_priorities' will set custom priorities based on the page name when
building the sitemap.  The first item '_DEFAULT_' will be the default priority
used if a page name is not explicitly set.  In the above example the page
'index.html' would be given priority of '0.8', 'subpage.html' would be given
a priority of '0.7', and all other pages would get a priority of '0.5',
You need to give the relative path to the output html file for this to work.

Path and base name of the source template file are available in `tplFile` variable, `tplFile.path` for
the path and `tplFile.basename` for the basename.

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
