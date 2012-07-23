// Basic build script for the garbagepatch.js bookmarklet.
// Simply compresses the js prepends "javascript:".
// Requires that you have uglify.js installed (via "npm install -g uglify-js")

var fs = require('fs'),
    parser = require('uglify-js').parser,
    uglify = require('uglify-js').uglify;

fs.readFile('garbagepatch.js', 'utf-8', function(err, js) {
    var ast = parser.parse(js);
    ast = uglify.ast_mangle(ast);
    ast = uglify.ast_squeeze(ast);
    var final_code = uglify.gen_code(ast);

    console.log('javascript:' + final_code);
    process.exit();
});
