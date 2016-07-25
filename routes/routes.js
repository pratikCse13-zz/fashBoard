var express = require('express');
var path = require('path');
var multer = require('multer');
var bodyParser = require('body-parser');
var route = express.Router();
var mongoose = require('mongoose');
var schemas = require('../schemas/schemas');
var feedSchema = schemas.feedschema;
var db = 'mongodb://localhost/finalDB'; 


var upload = multer({dest : 'public/uploads/'});

route.post('/uploads',upload.any(),function(req,res){
		console.log(req.files.imageuploader2);
});

mongoose.connect(db);



route.get('/',function(req,res){
	res.sendFile(path.resolve((__dirname+'/../public/views/homepage.html')));
});	

route.post('/userFeeds', function(req,res) {
	var feed = new feedSchema({
		"image" : req.body.image,
		"feed" : req.body.feed,
		"userName" : req.body.name
	});
	feed.save(function(err,feed){
		if(err){
			console.log('saving to db unsuccessful');
		}
		else{
			res.send('successful entry to db');
		}
	});
});

route.put('/removeFeed',function(req,res){
	console.log(req.body.feed);
	feedSchema.findOneAndRemove(req.body.feed,function(err){
		if(err){
			res.send('couldnt delete from db');
		}else{
			res.send('successfully dleted from db');
		}
	});
});

route.get('/fetchdb',function(req,res){
	var feed = new feedSchema(); 
	feed.image = 'feeder10';
	feed.userName = 'feeder10';
	feed.feed = 'this is feed 10';
	feed.save(function(err,feed){
		if(err){
			console.log(err);
		}
		else{
			console.log('save success');
		}
	});
	feedSchema.find({}).exec(function(err,feeds){
		if(err){
			console.log('error');
		}
		else{
			if(!(feeds))
			console.log('sending json');
			console.log(feeds);
			res.json(feeds);
		}
	});
});


route.get('/userFeeds',function(req,res){

	feedSchema.find({}).exec(function(err,res){
			if(err){
				res.status(500).send('could not retrieve');
			}
			else{
				res.json(res);
			}
	});
});

module.exports = route;