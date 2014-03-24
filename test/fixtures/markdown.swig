{% markdown %}
# swig extensions

> Tags, filters, and extensions for [Swig](http://paularmstrong.github.io/swig/), the most awesome template engine for node.js.

This project is based on (and complementary to) [swig-extras](https://github.com/paularmstrong/swig-extras), from [@paularmstrong](https://github.com/paularmstrong)


## Getting started

Use a filter:

```
var swig = require('swig');
var extensions = require('swig-extensions');

extensions.useFilter(swig, 'markdown');
```

Use a tag:

```
var swig = require('swig');
var extensions = require('swig-extensions');
var mySwig = new swig.Swig();

extensions.useTag(mySwig, 'markdown');
```
{% endmarkdown %}
