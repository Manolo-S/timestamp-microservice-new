"use strict";
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var months = {0: "January", 1: "February", 2: "March", 3: "April", 
			  4: "May", 5: "June", 6: "July", 7: "August", 8: "September",
			  9: "October", 10: "November", 11: "December"};

function timestampService(req, res){
	var timestamp = req.params.id;
	if (new Date(timestamp) && timestamp.slice(0,1) in [0,1,2,3,4,5,6,7,8,9]){
		var unixTime = timestamp;
		var date = new Date(1000*timestamp);
		var year = date.getFullYear();
		var month = months[String(date.getMonth())];
		var day = date.getDate();
		var naturalDate = String(month + ' ' + day + ', ' + year);
	} else {
	    var unixTime = Date.parse(timestamp)/1000;
	    var naturalDate = timestamp;
	} 
	var unixAndNaturalTime = JSON.stringify({"unix": unixTime, "natural": naturalDate});
	res.setHeader('Content-Type', 'text/html');
    res.send('<html><head><title>Timestamp Microservice</title></head><body><p>' +  unixAndNaturalTime + '</p></body></html>');
}

app.get('/:id', timestampService);

app.listen(port);

console.log('Server running at http://127.0.0.1:' + port + '/');



