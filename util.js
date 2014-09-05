var fs = require('fs');
var path = require('path');

// gets all subdirectories and their children in a tree walking fashion, i.e. walk all
// the way down the first child, then move to second child, etc.
function getDirectories(dir) {
	return fs.readdirSync(dir).filter(function (file) {
		return file[0] != '.'; // ignore hidden dirs
	}).map(function(v){
		return path.join(dir, v);
	}).filter(function (filepath) {
		return fs.lstatSync(filepath).isDirectory();
	})
}

// recursively visit all subdirectories and their children running the given function on
// each directory
function visitDirectories(dir, fcn){
	getDirectories(dir).forEach(function (v) {
		visitDirectories(v, fcn);
		fcn(v);
	})
}

module.exports.visitDirectories = visitDirectories;
