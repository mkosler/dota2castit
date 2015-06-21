angular.module('mainModule').factory('dotaService', [ '$http', function ($http) {
    return {
        getById: function (id) {
            return $http.get('/dota/match/' + id);
        }
    };
}]);
