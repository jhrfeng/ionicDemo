angular.module('starter', ['ionic', 'starter.controllers'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
	  .state('app', {
	    url: '/app',
	    abstract: true,
	    templateUrl: 'view/menu.html',
	    controller: 'AppCtrl'
	  })
    .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'view/login.html',
          controller: 'AppCtrl'
        }
      }
    })
    .state('app.home', {
//    url: '/home/:param',
 			url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'view/home.html',
          controller: 'HomeCtrl'
        }
      }
    })
    .state('app.demo', {
	 			url: '/demo',
        views: {
          'menuContent': {
            templateUrl: 'view/demo.html',
            controller: 'DemoCtrl'
          }
        }
    })
    .state('app.demo2', {
        url: '/demo2',
        views: {
          'menuContent': {
            templateUrl: 'view/demo2.html',
            controller: 'DemoCtrl'
          }
        }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
