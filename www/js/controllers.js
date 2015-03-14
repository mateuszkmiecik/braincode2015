angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, CarsService) {

        $scope.car = CarsService.currentCar;

    })

    .controller('AddCtrl', function ($scope)
        {
            $scope.fillup_date = new Date();
        });

