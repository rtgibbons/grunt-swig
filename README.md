# Grunt Swig

## About
A static site compiler for grunt based on [swig templates][swig]

## Installation

1. npm install grunt-swig ***OR*** add `grunt-swig` to your `package.json
1. Add `grunt.registerNpmTasks('grunt-swig');` to `grunt.js`

## Configuration

    swig: {
      development: {
        root: "source/",
        dest: "www/",
        src: ['source/**/*.swig', 'external/sometemplate.swig'],
        siteUrl: 'http://mydomain.net/',
        production: false,
        fb_appid: '1349v',
        ga_account_id: 'UA-xxxxxxxx-1',
        robots_directive: 'Disallow /',
        sitemap_priorities: {
                '_DEFAULT_': '0.5',
                'index': '0.8',
                'subpage': '0.7'
        }
      }
    }

Brief explanation. Grunt Swig will loop through files listed in `src`

Ex. `source/index.swig`. It will look for a `source/index.json` and add it to
the rest of the variables provided in `swig:development` or in `source/global.js`, and then run swig
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
a priority of '0.7', and all other pages would get a priority of '0.5'.

*TODO* - Talk about grunt.js setup

## Changelog

* 2013-04-13 - @nickpack - Refactored to work with the latest version of grunt, tidied up code and added global variable js
* 2012-11-04 - Added custom priorities to sitemap.xml when built (kengoldfarb)
* 2012-11-04 - Added ability to build robots.txt (kengoldfarb)
* 2012-11-04 - Added ability to build sitemap
* Initial Commit - compiles templates with context

 [swig]: http://paularmstrong.github.com/swig/
