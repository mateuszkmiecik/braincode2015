app.controller('FillUpAddCtrl', function ($scope, DB, $state, FillUpService, $rootScope) {
    $scope.fillup_date = new Date();
    $scope.saveFillUp = function (money, amount, mileage, station, date) {
        var FillUp = new FillUpService.newFillUp(date, mileage, money, amount, station);
        DB.saveNewFillUp($rootScope.currentCar, 'fillUps', FillUp, function () {
            $state.go('app.stats');
        });
    };
});