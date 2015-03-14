app.controller('HomeCtrl', function ($scope, DB, CarsService, $state, $ionicPopup) {
    $scope.cars = DB.getList('cars');

    $scope.chooseCar = function(car){
        CarsService.setCurrentCar(car);
        $state.go('app.main');
    };

    $scope.removeCar = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Consume Ice Cream',
            template: 'Are you sure you want to eat this ice cream?'
        });
        confirmPopup.then(function(res) {
            if(res) {
                console.log('You are sure');
            } else {
                console.log('You are not sure');
            }
        });
    };

})
    .controller('AddCarCtrl', function($scope, CarsService, DB, $state){
        $scope.saveCar = function(newCarName){
            var Car = new CarsService.newCar(newCarName);
            DB.saveNew('cars', Car, function(){
                $state.go('home');
            });
        };
    });
