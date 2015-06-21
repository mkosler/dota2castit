angular.module('mainModule').controller('mainCtrl', ['$scope', '$modal', 'dotaService', function ($scope, $modal, dotaService) {
    $scope.openUploadModal = function () {
        var modalInstance = $modal.open({
            templateUrl: 'views/modals/upload-modal.html',
            controller: 'uploadModalCtrl',
        });

        modalInstance.result.then(function (matchId) {
            dotaService.getById(matchId).then(function (response) {
                console.log(response);
            });
        });
    };
}]);
