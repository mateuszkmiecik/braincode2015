app.controller('HomeCtrl', function ($scope, CarsService, $timeout, $cordovaVibration) {
    $scope.cars = CarsService.getCars();
    $timeout(function () {
        $scope.loaded = true;
        if (!!$cordovaVibration) {
            $cordovaVibration.vibrate(100);
        }
    }, 1500);
});