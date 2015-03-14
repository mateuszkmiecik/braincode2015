app.controller('HomeCtrl', function ($scope, DB, $timeout, $cordovaVibration) {
    $scope.cars = DB.getList('cars');

    $timeout(function () {
        $scope.loaded = true;
        if (!!$cordovaVibration) {
            $cordovaVibration.vibrate(100);
        }
    }, 1500);
})
    .controller('AddCarCtrl', function($scope, CarsService, DB, $state){
        $scope.saveCar = function(newCarName){
            var Car = new CarsService.newCar(newCarName);
            DB.saveNew('cars', Car, function(){
                $state.go('home');
            });
        };
    });
