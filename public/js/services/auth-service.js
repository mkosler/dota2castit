angular.module('mainModule').factory('authService', [ '$http', '$q', '$location', '$rootScope', function ($http, $q, $location, $rootScope) {
    return {
        login: function () {
            return $http.get('/auth/steam');
        },
        logout: function () {
            return $http.get();
        },
        checkLoggedIn: function () {
            var deferred = $q.defer();

            $http.get('/auth/loggedin').success(function (user) {
                if (user !== '0') {
                    deferred.resolve();
                    $rootScope.user = user;
                } else {
                    deferred.reject();
                    $location.url('/');
                }
            }).error(function (reason) {
                console.log(reason);
            });

            return deferred.promise;
        }
    };
}]);
