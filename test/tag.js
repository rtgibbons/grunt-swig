// Official documentation about extending Swig Tags
// http://paularmstrong.github.io/swig/docs/extending/#tags

// Source code of how parse is defined:
// https://github.com/paularmstrong/swig/blob/v1.3.2/lib/parser.js#L550-L570
//
// Correctly writing swig extensions might be tricky, get an idea about what
// a TokenParser is: https://github.com/paularmstrong/swig/blob/v1.3.2/lib/parser.js#L109-L127
exports.parse = function(str, line, parser, types, stack, options) {
  parser.on(types.STRING, function (token) {
    // strip quote or double quote, they _also_ get matched
    token.match = token.match.replace(/^("|')|("|')$/g, '');
    this.out.push(token.match);
  });
  return true;
};

// Source code, to see how it gets used:
// https://github.com/paularmstrong/swig/blob/v1.3.2/lib/parser.js#L720-L738
//
exports.compile = function(compiler, args, content, parents, options, blockName) {
  var concatArgs = '[ ' + args.join(', ') + ' ]';
  return '_output += "args: ' + concatArgs + '";\n';
};

exports.ends = true;
exports.block = true;
