var homeMod= angular.module('homeMod',[]);

homeMod.controller('homeCtrl',function($scope){

/*	$scope.showLoginModal = function(){
			$modal.open({
				templateUrl: 'public/views/login.html',
				scope: $scope,
				backdrop: true,
				animation: true,
			});	*/

	$scope.changeModal = function(){
		$("#signupModal").modal('hide');
		$("#loginModal").modal('show');
	};
	});


		