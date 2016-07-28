var homeMod= angular.module('homeMod',['ngCookies','ngRoute']);


homeMod.run(function($rootScope,$cookies,$http,$window){
		$rootScope.token = $cookies.get('token');
		if($rootScope.token)
		{		
				console.log($rootScope.token);
				$http.post('/users/checkToken',{token:$rootScope.token}).then(function(res){
						console.log(res.data);
						if(res.data="successful token")
						{
							console.log('reaching redirection');
							$window.location.assign('http://localhost:8888/userHome');
						}
				});
		}
		else
		{
			console.log("token not found");
		}
});

homeMod.controller('homeCtrl',function($window,$rootScope,$scope,$http,$cookies){

	$scope.showErrors = false;
	$scope.signupCookieToggle = false;
	$scope.loginCookieToggle = false;

	$scope.processSignup = function(){
		var newUser = {
			name : $scope.name,
			emailId : $scope.emailId,
			password : $scope.password
		};
		
		$http.post('/users/newUser',newUser).then(function(res){
			if(res.data.msg=="unsuccessful registration")
				alert("unsuccessful registration.. please retry");
			if(res.data.msg=="successful registration")
			{
				$window.location.assign('http://localhost:8888/userHome');
				if($scope.signupCookieToggle)
				{
					$cookies.put('token',res.data.token);
					$http.get('/userHome').then(function(res){

					});
				}
			}
			else
			{
				$scope.errors = res.data.msg;
				$scope.showErrors = true;
			}
		});
	};

	$scope.processLogin = function(){
			var loginUser = {
				emailId : $scope.emailId,
				password : $scope.password
			}
			console.log(loginUser);
			$http.post('/users/loginUser',loginUser).then(function(res){
				if(res.data.msg=="login successful")
				{
					$window.location.assign('http://localhost:8888/userHome');
					if($scope.loginCookieToggle)
					{
						$cookies.put('token',res.data.token);
					}
				}
				else
				{
					$scope.errors = res.data.msg;
					$scope.showErrors = true;
				}
			});
	};

	$scope.changeToLogin = function(){
		console.log("login called");
		$("#signupModal").modal('hide');
		$("#loginModal").modal('show');
	};

	$scope.changeToSignup = function(){
		console.log("signup called");
		$("#loginModal").modal('hide');
		$("#signupModal").modal('show');
	};

});


homeMod.controller('feedCtrl',function($scope,$http){
	function getFeeds(){
		$http.get('/userFeeds').then(function(res){
		$scope.userFeeds = res.data; 
		console.log(signup);
	});}

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