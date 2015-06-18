(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
angular.module('mainModule', ['ngRoute']);

},{}],2:[function(require,module,exports){
angular.module('mainModule').controller('mainCtrl', function ($scope) {
});

},{}],3:[function(require,module,exports){
angular.module('mainModule').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'mainCtrl'
        });

    //$locationProvider.html5Mode(true);
}]);

},{}],4:[function(require,module,exports){
angular.module('mainModule').factory('authService', [ '$http', function ($http) {
    return {
        login: function () {
            return $http.get('/auth/steam');
        },
        logout: function () {
            return $http.get();
        }
    };
}]);

},{}],5:[function(require,module,exports){
angular.module('mainModule').factory('dotaService', [ '$http', function ($http) {
    var baseUri = 'https://api.steampowered.com/';
    var id = '570';

    var matchUri = baseUri + 'IDOTA2Match_' + id + '/';
    var dotaUri = baseUri + 'IDOTA2_' + id + '/';
}]);

},{}],6:[function(require,module,exports){
angular.module('mainModule').factory('userRepository', ['$http', function ($http) {
    return {
        // gets all users
        get: function () {
            return $http.get();
        }
    };
}]);

},{}],7:[function(require,module,exports){
describe('Example', function () {
    it('is true', function () {
        expect(true).to.be.true;
    });
});

},{}]},{},[1,2,3,4,5,6,7]);
