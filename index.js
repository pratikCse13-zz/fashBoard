var express = require('express');
var path = require('path');
var routes = require('./routes/routes');
var users = require('./routes/users');

var app = express();

app.use(express.static(path.join(__dirname ,'/public')));

app.use('/',routes);
app.use('/users',users);


app.listen(8888,function(){
	console.log("server listening on port 8888");
});

module.exports = app;