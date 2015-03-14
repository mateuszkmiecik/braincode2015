app.controller('CarsManagerCtrl', function ($scope, DB, CarsService, $state, $ionicPopup) {
    $scope.cars = DB.getList(DB.db, 'cars');

    $scope.chooseCar = function (car) {
        CarsService.setCurrentCar(car);
        $state.go('app.main');
    };

    $scope.removeCar = function (id) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Na pewno?',
            template: 'Czy na pewno chcesz usunąć ten samochód (również z nim wszystkie dane)?'
        });
        confirmPopup.then(function (res) {
            if (res) {
                DB.removeId(DB.db, 'cars', id);
            } else {
                console.log('You are not sure');
            }
        });
    };

});

app.controller('CarsAddCtrl', function ($scope, CarsService, DB, $state) {
    $scope.saveCar = function (newCarName, newCarMileage) {
        var Car = new CarsService.newCar(newCarName, newCarMileage);
        DB.saveNew(DB.db, 'cars', Car, function () {
            $state.go('cars'); // <3
        });
    };
});