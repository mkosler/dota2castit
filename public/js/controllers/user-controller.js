angular.module('mainModule').controller('userCtrl', ['$scope', 'dotaService', '$rootScope', function ($scope, dotaService, $rootScope) {
    dotaService.getMatchHistory($rootScope.user.accountid32).then(function (history) {
        $scope.history = history;
    });
}]);
