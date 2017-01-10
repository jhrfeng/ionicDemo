angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope, $state) {
	$scope.goHome = function(){
//		alert(
		$state.go('app.home')
	}
})
