app.controller('HomeCtrl', function ($scope, DB, CarsService, $state, $ionicPopup) {
    $scope.cars = DB.getList('cars');

    $scope.chooseCar = function(car){
        CarsService.setCurrentCar(car);
        $state.go('app.main');
    };

    $scope.removeCar = function(id) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Na pewno?',
            template: 'Czy na pewno chcesz usunąć ten samochód (również z nim wszystkie dane)?'
        });
        confirmPopup.then(function(res) {
            if(res) {
                DB.removeId('cars', id);
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
