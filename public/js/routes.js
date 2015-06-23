angular.module('mainModule').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'mainCtrl',
            //resolve: {
                //user: [ 'authService', function (authService) {
                    //return authService.checkLoggedIn();
                //}],
            //}
        })
        .when('/users/:displayname', {
            templateUrl: 'views/user.html',
            controller: 'userCtrl',
            resolve: {
                loggedin: [ 'authService', function (authService) {
                    return authService.checkLoggedIn();
                }]
            }
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
