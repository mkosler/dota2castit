angular.module('mainModule').factory('dotaService', [ '$http', function ($http) {
    return {
        getById: function (id) {
            return $http.get('/dota/match/' + id);
        },
        getMatchHistory: function (accountId) {
            return $http.get('/dota/history/' + accountId);
        },
    };
}]);
