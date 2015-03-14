var app = angular.module('starter', ['ngAnimate', 'ionic', 'ngCordova']);

app.run(function ($ionicPlatform, $timeout, $rootScope, DB, $state) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });

    // zaciągnij Bazę z LocalStorage
    DB.connect();

    $rootScope.loaded = false;

    $timeout(function () {
        $rootScope.loaded = true;
        $state.go('cars');
    }, 1000);
})
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('cars', {
                url: '/',
                templateUrl: 'templates/cars/manager.html',
                controller: 'CarsManagerCtrl'
            })
            .state('carsAdd', {
                url: '/addCar',
                templateUrl: 'templates/cars/add.html',
                controller: 'CarsAddCtrl'
            })

            // main app
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html"
            })

            .state('app.main', {
                url: "/main",
                views: {
                    'menuContent': {
                        templateUrl: "templates/mainDashboard/main.html"
                    }
                }
            })

            .state('app.addFillUp', {
                url: "/addFillUp",
                views: {
                    'menuContent': {
                        templateUrl: "templates/mainDashboard/addFillUp.html",
                        controller: 'FillUpAddCtrl'
                    }
                }
            })

            .state('app.stats', {
                url: "/stats",
                views: {
                    'menuContent': {
                        templateUrl: "templates/stats.html"
                    }
                }
            })
            .state('app.settings', {
                url: "/settings",
                views: {
                    'menuContent': {
                        templateUrl: "templates/settings.html"
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/');

    });

app.controller("SlideTabsCtrl", function ($scope, $ionicSlideBoxDelegate) {
    $scope.navSlide = function (index) {
        $ionicSlideBoxDelegate.slide(index, 500);
    }
});
