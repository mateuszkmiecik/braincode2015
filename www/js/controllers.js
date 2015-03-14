angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, CarsService) {

        $scope.car = CarsService.currentCar;

    });
