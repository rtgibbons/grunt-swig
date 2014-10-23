var expect = require('chai').expect;
var GruntSwig = require(__dirname + '/../tasks/swig.js');

describe('Grunt Swig', function () {
	it('should load swig', function(done) {
		var gruntSwig = new GruntSwig;
		console.log(gruntSwig);
		done();
	});
});
