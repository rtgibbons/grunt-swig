'use strict';
var fs = require('fs'),
    swig = require('swig'),
    path = require('path');

module.exports = function(grunt) {
    grunt.registerMultiTask('swig', 'swig templater', function(tpl_context) {
        var config = this,
            context = tpl_context || '',
            date = new Date(),
            d = date.toISOString(),
            globalVars = {};


        var options = config.options();

        if(options.swigOptions) {
            swig.setDefaults(options.swigOptions);
        }

        var pages = {};
        var globalTemplateData = options.templateData || {};
        var baseUrl = options.siteUrl || '';

        config.filesSrc.forEach(function(file) {
            if(!file) {
                grunt.log.warn('Source file not found.');
            }else{

                var tpl = swig.compileFile(file);
                var filePathArr = file.split('/');
                var fullFileName = filePathArr[filePathArr.length -1];
                var matches = fullFileName.match(/(.*)\.([^\.]*)\.?([^\.]*)$/);

                if(matches && matches[1] && matches[2]) {
                    var fileName = matches[1];
                    var ext = matches[2];
                    var templateExtension = matches[3];
                    if(!templateExtension) {
                        templateExtension = ext;
                        ext = '';
                    }else{
                        ext = '.' + ext
                    }

                    var relativeOutputFile = path.dirname(file) + '/' + fileName + ext;
                    var outputFile = config.data.dest + relativeOutputFile;

                    // Only process files that end in .swig
                    if(templateExtension == 'swig') {
                        // Swig file match.  Build up all the data required to create the destination file.
                        pages[outputFile] = pages[outputFile] || {};
                        pages[outputFile].src = fullFileName;
                        pages[outputFile].dest = outputFile;

                        var templateData = {};
                        try{
                            templateData = grunt.file.readJSON(path.dirname(file) + '/' + fileName + ext + '.json');
                        }catch(e){
                            grunt.log.warn('No json file corresponding with: ' + file + '.  Using only global template data.');
                        }
                        pages[outputFile].templateData = grunt.util._.extend(globalTemplateData, templateData);
                        pages[outputFile].tpl = tpl;
                        pages[outputFile].date = d;
                        pages[outputFile].url = baseUrl + outputFile;

                        // Base sitemap defaults
                        pages[outputFile].changefreq = 'daily';
                        pages[outputFile].lastmod = d;
                        pages[outputFile].priority = '0.8';

                        // Check if this file has specific sitemap properties set
                        if(options.sitemap && options.sitemap[relativeOutputFile]) {
                            pages[outputFile].changefreq = options.sitemap[relativeOutputFile].changefreq || pages[outputFile].changefreq;
                            pages[outputFile].lastmod = options.sitemap[relativeOutputFile].lastmod || pages[outputFile].lastmod;
                            pages[outputFile].priority = options.sitemap[relativeOutputFile].priority || pages[outputFile].priority;
                        }else if(options.sitemap && options.sitemap.default) {
                            // If not, check to see if there are defaults
                            pages[outputFile].changefreq = options.sitemap.default.changefreq || pages[outputFile].changefreq;
                            pages[outputFile].lastmod = options.sitemap.default.lastmod || pages[outputFile].lastmod;
                            pages[outputFile].priority = options.sitemap.default.priority || pages[outputFile].priority;
                        }
                    }
                }else{
                    grunt.log.warn('Unable to process file as template: ' + fullFileName);
                }
            }
        });

        for(var i in pages) {
            var page = pages[i];
            grunt.log.writeln('Creating file: ' + page.dest);
            grunt.file.write(page.dest, page.tpl(page.templateData));
        }

        if (options.generateSitemap) {
            var currentDate = date.toISOString();

            grunt.log.writeln('Creating sitemap.xml');
            var sitemapData = options.sitemap || {};
            grunt.file.write(config.data.dest + '/sitemap.xml', swig.renderFile(__dirname + '/../templates/sitemap.xml.swig', {
                sitemapData: sitemapData,
                pages: pages
            }));
        }
    });
};
