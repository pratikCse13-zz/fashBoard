var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = Schema.ObjectId;
var feedStructure = new Schema({
	user_id : ObjectId, 
	feed : String, 
	postTime : { type :Date,default : Date.now}
});

var userStructure = new Schema({
	name : String,
	userName : String,
	password : String,

});

module.exports.feedschema = mongoose.model('feed',feedStructure);


