app.controller('StatsCtrl', function ($scope, $state, CarsService) {
    $scope.fillUps = CarsService.currentCar.fillUps.sort(function (a, b) {

        return (new Date(b.date)).getMilliseconds() - (new Date(a.date)).getMilliseconds();
    });
    console.log($scope.fillUps);

    $scope.labels = [];

    var data = [];
    for (var i = 0; i < 7; i++) {
        data[i] = 0;
    }
    var data_km = [];
    for (var i = 0; i < 7; i++) {
        data_km[i] = 0;
    }

    var price = 0, litres = 0;
    var last_km = 0;

    for (var i = 0; i < $scope.fillUps.length; i++) {
        data[(new Date($scope.fillUps[i].date).getMonth())] += $scope.fillUps[i].money;
        price += $scope.fillUps[i].money;
        litres += $scope.fillUps[i].amount;
    }

    $scope.avgPrice = (price / litres).toPrecision(3);

    if ($scope.fillUps.length) {
        $scope.ride = $scope.fillUps[$scope.fillUps.length - 1].mileage - CarsService.currentCar.mileage;
    }

    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Wydane piniondze na paliwo'];
    $scope.data = [
        data
    ];
});