angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope, $state, $ionicPopup) {
    $scope.user = {username: "", password: ""};
    $scope.isShow = false;
    $scope.error = "错误";
	// 登录按钮
	$scope.login = function(){
		// 1. 需要获取登录信息
		console.log("登录用户:", $scope.user.username, "密码", $scope.user.password)
		
		// 2. 调用服务器接口
		login($scope.user.username, $scope.user.password)
//		$state.go('app.home')
	}
	
	//login interface
	function login(username, password){
		// http://www.ionic.wang/js_doc-index-id-52.html 组件弹出实例文档
		console.log($ionicPopup);
		var serverUsername = "admin";
		var serverPassword = "admin";
		if(username!=serverUsername){
			$scope.isShow = true;
			$scope.error = "用户名错误"
//			$ionicPopup.alert({
//				title: "提示",
//				template: "用户名错误",
//				okText: "确定",
//				okType: "button-assertive"
//			});
		}
		if(password!=serverPassword){

		}
		if(username==serverUsername && password==serverPassword){
			$ionicPopup.confirm({
				title: "",
				template: "登录成功",
				cancelText:"离开", 
				cancelType: 'button-small button-default',
				okText: "进入", 
				okType: 'button-small button-assertive',
			}).then(function(res) {
				if(res){
					$state.go("app.home")
				}
			});
		}
	}
})
