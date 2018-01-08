#!/usr/bin/env node
var configFile = './resources/assets/js/app-v1/config.js';

var fs = require('fs');
var signex = require(configFile);

// Read in app config file
var fileStream = fs.readFileSync(configFile, 'utf8');

// Isolate the version.patch variable
var patchVarValueStartIndex = fileStream.indexOf(' patch:') + ' patch:'.length;
var patchVarValueEndIndex = fileStream.indexOf(',', patchVarValueStartIndex);

// Extract the patch integer
var variable = fileStream.slice(patchVarValueStartIndex, patchVarValueEndIndex);
var patchNum = prevNum = parseInt(variable);

// Increment the patch num for this coming commit
patchNum = patchNum + 1;

// Replace the patch num variable in the buffer (not saved yet...)
fileStream = fileStream.replace(' patch: '+prevNum+',', ' patch: '+patchNum+',');

// Extract commit message from passed args, or set a default (@todo: Throw here...)
var commitMessage = "No message.";
if(process.argv.length >= 2){
	commitMessage = process.argv[2] ? process.argv[2] : commitMessage;
}

console.log(commitMessage);

// To run the git process, we must call in a shell script in bash
var execProcess = require("./execproc.js");

// Save patch num changes.
fs.writeFile(configFile, fileStream, 'utf8', callback = function(e){
	if(e) throw e;
	console.log("Patch num has been updated!");
});

// Run the actual add/commit/push
execProcess.result("sh git_commit_push_all.sh \""+commitMessage+"\"", function(err, response){
    if(!err){
        console.log(response);
    }else {
		// @todo: Revert patch num change if nothing was pushed
        console.log(err);
    }
});
