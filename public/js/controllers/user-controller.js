angular.module('mainModule').controller('userCtrl', ['$scope', 'dotaService', '$rootScope', function ($scope, dotaService, $rootScope) {
    dotaService.getMatchHistory($rootScope.user.accountid32, {
        matches_requested: 5
    })
        .then(function (result) {
            $scope.history = result.data;
        });
}]);
