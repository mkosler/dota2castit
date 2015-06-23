angular.module('mainModule').controller('mainCtrl', ['$scope', '$modal', '$rootScope', 'dotaService', 'authService', function ($scope, $modal, $rootScope, dotaService, authService) {
    authService.checkLoggedIn();

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
