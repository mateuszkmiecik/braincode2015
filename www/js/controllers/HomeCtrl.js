app.controller('HomeCtrl', function ($scope, DB, CarsService, $state, $ionicPopup) {
    $scope.cars = DB.getList(DB.db, 'cars');

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
                DB.removeId(DB.db, 'cars', id);
            } else {
                console.log('You are not sure');
            }
        });
    };

})
    .controller('AddCarCtrl', function($scope, CarsService, DB, $state){
        $scope.saveCar = function(newCarName, newCarMileage){
            var Car = new CarsService.newCar(newCarName, newCarMileage);
            DB.saveNew(DB.db, 'cars', Car, function(){
                $state.go('home'); // <3
            });
        };
    })

    .controller('AddCtrl', function($scope, AddService, DB, $state){
        $scope.saveFillUp = function(money, amount, mileage, station, date){
            var FillUp = new FillUpService.newFillUp(date, mileage, money, amount, station);
            DB.saveNewFillUp($rootScope.currentCar, $rootScope.currentCar.fillUps, FillUp, function(){
                $state.go('home');
            });
        };
    });
