app.controller('SettingsCtrl', function ($scope, DB, $state, $ionicPopup, $cordovaGeolocation){
	$scope.resetData = function() {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Na pewno?',
			template: 'Utracisz wszystkie dane bezpowrotnie.'
		});

		confirmPopup.then(function(res){
			if(res) {
				DB.clear(function(){
					console.log('usunieto');
					$state.go('cars', {}, {reload: true});
					location.reload();
				});
			} else {
				console.log("Okrzyk rozpaczy.");
			}
		});
	}

	$scope.checkLocation = function() {
		var posOpt = {
			timeout: 20000,
			enableHighAccuracy: true
		};
		document.addEventListener("deviceready", function () {
				$scope.loadingText = '...'
				$cordovaGeolocation.getCurrentPosition(posOpt)
				.then(function(position){
					var latitude = position.coords.latitude;
					var longitude = position.coords.longitude;

					$scope.actPos = {
						lat: latitude,
						lon: longitude,
						noerror: true,
						errMsg: ""
					};

					$scope.loadingText = '';


				}, function(error) {
					$scope.actPos = {
						lat: undefined,
						lon: undefined,
						noerror: false,
						errMsg: error
					};

					$scope.loadingText = 'wystąpił błąd'
				});

		});
	};
});