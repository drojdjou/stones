#!/usr/bin/env node

var express = require('express');
var app = express();
var fs = require('fs');
var port = 4000;

app.get('/', function(request, response) {

	var index = fs.readFileSync('index.html').toString();

	index = index.replace('{curtime}', new Date());

	response.set('Content-Type', 'text/html');
	response.send(index);
});

app.listen(port);

console.log('Server ready on port ' + port);