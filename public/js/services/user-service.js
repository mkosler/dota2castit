angular.module('mainModule').factory('userService', ['$http', function ($http) {
    return {
        // gets all users
        get: function () {
            return $http.get();
        }
    };
}]);
