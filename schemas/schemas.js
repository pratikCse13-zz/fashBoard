var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = "mongodb://pratik:qwerty@ds029725.mlab.com:29725/fashboard";

var connection = mongoose.createConnection(db);

var ObjectId = Schema.ObjectId;
var feedStructure = new Schema({
	user_id : ObjectId, 
	feed : String, 
	postTime : { type :Date,default : Date.now}
});

var userStructure = new Schema({
	name : String,
	emailId : String,
	password : String,

});

module.exports.feedschema = connection.model('feed',feedStructure);
module.exports.userSchema = connection.model('user',userStructure);


