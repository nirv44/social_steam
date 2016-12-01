angular.module('app.routes')
.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/login', {
        templateUrl: 'pages/login.html',
        controller: 'LoginController',
        controllerAs: 'loginCtrl'
    })
    .when('/subscribe', {
        templateUrl: 'pages/subscribe.html',
        controller: 'SubscribeController',
        controllerAs: 'subscribeCtrl'
    })
    .when('/main', {
        templateUrl: 'pages/welcome.html',
        controller: 'MainPageController',
        controllerAs: 'mainPageCtrl'
    })
    .when('/page1', {
        templateUrl: 'pages/mainPage1.html',
        controller: 'MainPage1Controller',
        controllerAs: 'mainPage1Ctrl'
    })
    .when('/account', {
        templateUrl: 'pages/account.html',
        controller: 'AccountController',
        controllerAs: 'accountCtrl'
    })
    .otherwise({ redirectTo: '/login' });
}]);