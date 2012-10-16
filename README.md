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
        src: ['index', 'deals', 'locations', 'coming_soon'],
        production: false,
        fb_appid: '1349v',
        ga_account_id: 'UA-xxxxxxxx-1'
      }
    }

Brief explanation. Grunt Swig will loop through files listed in `src` from the
folder `root`. Ex. `index`. It will look for a `source/index.json` and add it to
the rest of the variables provided in `swig:devleopment`, and then run swig
against `source/index.swig` saving the output to `www/index.html`

You can also provide context, for example `swig:development:blue` which will
perform the same actions above, but after process the JSON it will also expand
the variable list with `source/index.blue.json` and provide the variable
`context` to the rest of the swig template.

*TODO* - Talk about grunt.js setup

## Changelog

* Initial Commit - compiles templates with context

 [swg]: http://paularmstrong.github.com/swig/
