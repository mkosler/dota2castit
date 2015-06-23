angular.module('mainModule').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'mainCtrl'
        })
        .when('/users/:displayname', {
            templateUrl: 'views/user.html',
            controller: 'userCtrl',
            resolve: {
                loggedin: [ 'authService', function (authService) {
                    return authService.checkLoggedIn(true);
                }]
            }
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
