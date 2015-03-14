app.controller('SettingsCtrl', function ($scope, DB, $state, $ionicPopup){
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
});