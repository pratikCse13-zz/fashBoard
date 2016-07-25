var uploadMod = angular.module('uploadMod',[]);

uploadMod.controller('uploadController',function($scope,$http){
	$scope.uploadFile = function(){
		console.log('function called');
		if(document.getElementById('upload').value != ""){ 
			console.log('put called');
			console.log(document.getElementById('upload').value);
			$http.post('/upload',function(res){
					
		});
		}
	}
});