"use strict";
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var months = {0: "January", 1: "February", 2: "March", 3: "April",
			  4: "May", 5: "June", 6: "July", 7: "August", 8: "September",
			  9: "October", 10: "November", 11: "December"};

function timestampService(req, res){
	var timestamp = req.params.id;
	if (!(isNaN(Number(timestamp)))){
		var unixDate = timestamp;
		var date = new Date(1000*timestamp);
		var year = date.getFullYear();
		var month = months[String(date.getMonth())];
		var day = date.getDate();
		var naturalDate = String(month + ' ' + day + ', ' + year);
	} else if (String(new Date(timestamp)).slice(25,28) === 'GMT'){
	    var unixDate = Date.parse(timestamp)/1000;
	    var naturalDate = timestamp;
	} else {
		res.setHeader('Content-Type', 'text/html');
    	res.send('<html><head><title>Timestamp Microservice</title></head><body><p>{"unix": null, "natural": null}</p></body></html>');
    	return;
	}
	var unixAndNaturalTime = JSON.stringify({"unix": unixDate, "natural": naturalDate});
	res.setHeader('Content-Type', 'text/html');
    res.send('<html><head><title>Timestamp Microservice</title></head><body><p>' +  unixAndNaturalTime + '</p></body></html>');
}

app.get('/:id', timestampService);

app.get('/', function (req, res) {
	res.send('<h1>Timestamp Microservice</h1>');
});

app.listen(port);
