app.controller('HomeCtrl', function ($scope, CarsService) {
        $scope.cars = CarsService.getCars();
    });