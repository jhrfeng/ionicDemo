angular.module('starter.controllers', [])
.controller('DemoCtrl', function($rootScope, $scope, $http) {
	$scope.cardHeight = window.screen.availHeight-100;
	$scope.videoMargin = $scope.cardHeight*0.7 - 50-50;
	$scope.icon  = 'pause';
	$scope.vo = {volume:20, audioDuration:0, mp3Name:"loy.mp3"};
	// 初始化监听第一个mp3资源的时长
	var audio = new Audio($scope.vo.mp3Name);
	audio.onloadedmetadata = function() {
		var min = (audio.duration/60) ^ 0;
		var sec = (audio.duration%60) ^ 0;

		var time = min+":"+sec;
		console.log(min, sec ,time)
	
		$scope.vo.audioDuration = time;
	};

	function canplay(){
		console.log(document.getElementById('demo').currentTime);
	}

	document.getElementById('demo').ondurationchange=function(){
		console.log(document.getElementById('demo').currentTime)
	};
	// 监听秒速
	document.getElementById('demo').addEventListener("canplay",function() { 
		console.log(document.getElementById('demo').currentTime)
		// myVid.currentTime = 5;
	});





	// $scope.volume = 20;
	$scope.selectedCss = function(val){
		$scope.clicked = val;
	}
	// 播放 暂停的功能
	$scope.playMp3 = function(){
		//$scope.vo.audioDuration = obj.duration;
		if($scope.icon=='pause'){
			document.getElementById('demo').play();
			$scope.icon = 'play';
			//console.log(document.getElementById('demo').currentTime)
		}else{
			document.getElementById('demo').pause();
			$scope.icon = 'pause';
		}
		
	}
	// 坚挺音量事件
	$scope.$watch('vo.volume', function(newValue, oldValue){
		document.getElementById('demo').volume = newValue/100;
	})

	// volume.$observe('volume', function(newValue) {
	//   if (modelCtrl.$name !== newValue) {
	//     modelCtrl.$$parentForm.$$renameControl(modelCtrl, newValue);
	//   }
	// });






	
})
.controller('AppCtrl', function($scope, $state, $ionicPopup, $stateParams) {
//	$scope.paramObj = angular.fromJson($stateParams.param);
	console.log(window, window.localStorage["user"])
    $scope.user = {username: "", password: ""};
//	$scope.paramObj = JSON.parse(window.localStorage["user"] || '{}');
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
//		if(username!=serverUsername){
//			$scope.isShow = true;
//			$scope.error = "用户名错误"
////			$ionicPopup.alert({
////				title: "提示",
////				template: "用户名错误",
////				okText: "确定",
////				okType: "button-assertive"
////			});
//		}
		if(password!=serverPassword){

		}
		if(1==1){
			$ionicPopup.confirm({
				title: "",
				template: "登录成功",
				cancelText:"离开", 
				cancelType: 'button-small button-default',
				okText: "进入", 
				okType: 'button-small button-assertive',
			}).then(function(res) {
				if(res){
//					$state.go("app.home",{param:JSON.stringify($scope.user)})
					$state.go("app.home")
					window.localStorage["user"]=JSON.stringify($scope.user);
				}
			});
		}
	}
})
.controller('HomeCtrl', function($scope, $http, $timeout) {
	$scope.vo = {searchtxt : "", pageIndex:1, moredata:false}; // 定义初始化页面索引为第一页
	$http.get("http://localhost:3000/englishList")
	  .success(function (data) {
	  	$scope.list = data;
		$scope.vo.moredata = true;
		$scope.$broadcast('scroll.infiniteScrollComplete');
		$scope.vo.pageIndex++;
	  });
  // 搜索的方法
  $scope.queryEnglish = function(){
  	console.log("搜索的内容", $scope.vo.searchtxt )
	$http({
            method: 'POST',
            data: {search: $scope.vo.searchtxt},
            url: "http://localhost:3000/queryEnglish"
        }).success(function(data){
            $scope.list = data;
          
        }).error(function(data){
              
        });
  }

// 下拉刷新
$scope.doRefresh = function () {
	if($scope.vo.pageIndex==0){
		return false;
	}
	console.log("正在下拉刷新", $scope.vo.pageIndex)
	$scope.vo.pageIndex--;
	    $timeout(function () {
	  		post("http://localhost:3000/nextPage", {pageIndex: $scope.vo.pageIndex})
	    	$scope.$broadcast('scroll.refreshComplete');
	}, 1000);
}

// 上拉刷新
$scope.loadMore = function(){
	console.log("正在上拉刷新", $scope.vo.pageIndex)
	if($scope.vo.pageIndex==0){
		$scope.vo.moredata = false;		
	}else{
		$scope.vo.pageIndex++;
		post2("http://localhost:3000/nextPage", {pageIndex: $scope.vo.pageIndex})
	}
	$scope.$broadcast('scroll.infiniteScrollComplete');

}

function post(url, data){
	$http({
        method: 'POST',
        data: data,
        url: url
    }).success(function(data){
        $scope.list = data;
    }).error(function(data){
          
    });
}

function post2(url, data){
	console.log($scope.vo.pageIndex)
	$http({
        method: 'POST',
        data: data,
        url: url
    }).success(function(data){
    	if($scope.vo.pageIndex=="1"){
    		$scope.vo.moredata = false;
    	}
    	$scope.vo.moredata = true;
        $scope.list = data;
        $scope.$broadcast('scroll.infiniteScrollComplete');
    }).error(function(data){
          
    });
}


})
