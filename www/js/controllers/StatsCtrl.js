app.controller('StatsCtrl', function($scope, $state, CarsService){
    $scope.fillUps = CarsService.currentCar.fillUps;

    $scope.labels = [];

    for(var i = 0; i<$scope.fillUps.length-1; i++){
        $scope.labels.push($scope.fillUps[i+1].mileage - $scope.fillUps[i].mileage);
    }

    //$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Średnie spalanie'];
    $scope.data = [
        [65]
    ];

});