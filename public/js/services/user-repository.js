angular.module('mainModule').factory('userRepository', ['$http', function ($http) {
    return {
        // gets all users
        get: function () {
            return $http.get();
        }
    };
}]);
