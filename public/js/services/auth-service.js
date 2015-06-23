angular.module('mainModule').factory('authService', [ '$http', '$q', '$location', '$rootScope', function ($http, $q, $location, $rootScope) {
    return {
        login: function () {
            return $http.get('/auth/steam');
        },
        logout: function () {
            return $http.get();
        },
        checkLoggedIn: function (redirect) {
            var deferred = $q.defer();

            $http.get('/auth/loggedin').success(function (user) {
                if (user !== '0') {
                    $rootScope.user = user;
                    deferred.resolve();
                } else {
                    deferred.reject();
                    if (redirect) $location.url('/');
                }
            }).error(function (reason) {
                console.log(reason);
            });

            return deferred.promise;
        }
    };
}]);
