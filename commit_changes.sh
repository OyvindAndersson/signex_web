#!/usr/bin/env node
var fs = require('fs');
var signex = require('./TEST.js');

// Read in app config file
var fileStream = fs.readFileSync('./TEST.js', 'utf8');

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

// To run the git process, we must call in a shell script in bash
var execProcess = require("./execproc.js");

// Run the actual add/commit/push
execProcess.result("sh git_commit_push_all.sh "+commitMessage, function(err, response){
    if(!err){
        console.log(response);
		// Only save if git commit/push proc went well.
		fs.writeFile('./TEST.js', fileStream, 'utf8', callback = function(e){
			if(e) throw e;
			console.log("Patch num has been updated!");
		});
    }else {
        console.log(err);
    }
});
