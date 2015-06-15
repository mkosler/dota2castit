angular.module('mainModule').factory('dotaService', [ '$http', function ($http) {
    var baseUri = 'https://api.steampowered.com/';
    var id = '570';

    var matchUri = baseUri + 'IDOTA2Match_' + id + '/';
    var dotaUri = baseUri + 'IDOTA2_' + id + '/';
}]);
