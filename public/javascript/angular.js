var feedMod = angular.module('feedMod',['mgcrea.ngStrap']);



feedMod.controller('feedCtrl',function($scope,$http,$modal){
	function getFeeds(){
		$http.get('/userFeeds').then(function(res){
		$scope.userFeeds = res.data; 
		console.log(signup);
	});}

	var loginModal = $modal({scope: $scope, template: '../views/login.html', show: false});

	$scope.showLoginModal = function(){
		console.log('login called');
		loginModal.$promise.then(loginModal.show);
	};

	$scope.signup = false;


	$scope.activateSignup = function(){
		$scope.signup = true;
	};

	$scope.removeFeed = function(feed){
		console.log('called to delete');
		$http.put('/removeFeed',{feed : feed}).then(function(res){
			getFeeds();
			alert(res.data);
		});
	};
		
	$scope.prettyDate = function(time){
	var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
		diff = (((new Date()).getTime() - date.getTime()) / 1000),
		day_diff = Math.floor(diff / 86400);
			
	if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
		return;
			
	return day_diff == 0 && (
			diff < 60 && "just now" ||
			diff < 120 && "1 minute ago" ||
			diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
			diff < 7200 && "1 hour ago" ||
			diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
		day_diff == 1 && "Yesterday" ||
		day_diff < 7 && day_diff + " days ago" ||
		day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
	}	
	$scope.newFeed = '';
	$scope.postFeed = function(){
		$http.post('/userFeeds',{"name" : "feeder7","feed" : $scope.newFeed,"image" : "feeder7"}).then(function(res){
			getFeeds();	
			$scope.newFeed = '';
			alert(res.data);
		});
	};
	getFeeds();
});


feedMod.controller('userCtrl',function($scope,$http){
	$http.post('/userSignUp',{user : user}).exec(function(res){
				
	});
});