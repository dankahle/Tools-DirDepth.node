var fs = require('fs');
var path = require('path');

if (process.argv.length < 3) {
	console.log("\n\ndirdepth: path [percent]");
	return;
}

var directory = path.resolve(process.argv[2]),
max = 0;
percent = process.argv.length > 3? parseFloat(process.argv[3]): 95;

console.log('dir: ' + directory);
console.log('percent: ' + percent);

function getDirectories(dir) {
	return fs.readdirSync(dir).filter(function (file) {
		return file[0] != '.'; // ignore hidden dirs
	}).map(function(v){
		return path.join(dir, v);
	}).filter(function (filepath) {
		return fs.lstatSync(filepath).isDirectory();
	})
}

function getMax(dir){
	if(dir.length > max)
		max = dir.length;
}

function showDirs(dir){
	if(dir.length > cutoffLength)
		console.log(dir.length, dir);
}

// recursively visit the directories and their children
function visitDirectories(dir, fcn){
	getDirectories(dir).forEach(function (v) {
		visitDirectories(v, fcn);
		fcn(v);
	})
}

visitDirectories(directory, getMax);
console.log('max: ', max);
var cutoffLength = percent/100 * max;
console.log('cutoff: ', cutoffLength);

visitDirectories(directory, showDirs);



