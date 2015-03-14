app.controller('HomeCtrl', function ($scope, CarsService, $timeout, $cordovaVibration) {
    $scope.cars = CarsService.getCars();
    $timeout(function () {

    	$scope.test = '';

    	if(window.localStorage.getItem('test')){
    		$scope.test = window.localStorage.getItem('test');
    	}else{
    		window.localStorage.setItem('test', 'test');
    	}

        $scope.loaded = true;
        if (!!$cordovaVibration) {
            $cordovaVibration.vibrate(100);
        }
    }, 1500);
});