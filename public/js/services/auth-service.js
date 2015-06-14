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
