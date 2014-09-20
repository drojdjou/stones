#!/usr/bin/env node

var express = require('express');
var app = express();
var fs = require('fs');
var port = 4000;

app.use(express.static(__dirname + '/assets'));

app.get('/', function(request, response) {

	var index = fs.readFileSync(__dirname + '/index.html').toString();

	index = index.replace('{curtime}', new Date());

	response.set('Content-Type', 'text/html');
	response.send(index);
});

app.listen(port);

console.log('Server ready on port ' + port);