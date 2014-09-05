var path = require('path');
var util = require('./util');

if (process.argv.length < 3) {
	console.log("\n\ndirdepth: path [percent]");
	return;
}

var directory = path.resolve(process.argv[2]),
max = 0;
percent = process.argv.length > 3? parseFloat(process.argv[3]): 95;

console.log('dir: ' + directory);
console.log('percent: ' + percent);


function getMax(dir){
	if(dir.length > max)
		max = dir.length;
}

function showDirs(dir){
	if(dir.length > cutoffLength)
		console.log(dir.length, dir);
}

util.visitDirectories(directory, getMax);
console.log('max: ', max);
var cutoffLength = percent/100 * max;
console.log('cutoff: ', cutoffLength);

util.visitDirectories(directory, showDirs);



