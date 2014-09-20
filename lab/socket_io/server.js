#!/usr/bin/env node

var express = require('express');
var app = express();
var fs = require('fs');
var moment = require('moment');

var port = 4001;
var server = app.listen(port);
var io = require('socket.io')(server);

var socketIoClientJs = 'node_modules/socket.io/node_modules/socket.io-client/socket.io.js';

app.get('/', function(request, response) {

	var index = fs.readFileSync('index.html').toString();
	response.set('Content-Type', 'text/html');
	response.send(index);

});

app.get('/socket.io.js', function(request, response) {

	var js = fs.readFileSync(socketIoClientJs).toString();
	response.set('Content-Type', 'application/javascript');
	response.send(js);

});

var WELCOME = 'welcome';
var GET_TIME = 'getTime';
var SEND_TIME = 'sendTime';


var timeFormat = "hh:mm:ss";

io.on('connection', function (socket) {

	socket.emit(WELCOME, { message: 'Welcome to scoker.io server' });

	socket.on(GET_TIME, function (data) {
		var t = moment().format(timeFormat);
		socket.emit(SEND_TIME, t);
	});

	setInterval(function() {
		var t = moment().format(timeFormat);
		socket.emit(SEND_TIME, t);
	}, 1000);
});

console.log('Server ready.');
console.log('HTTP on port ' + port);