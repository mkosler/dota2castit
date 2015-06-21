angular.module('mainModule').controller('uploadModalCtrl', ['$scope', '$modalInstance', function ($scope, $modalInstance) {
    $scope.submit = function (matchId) {
        $modalInstance.close(matchId);
    };
}]);
