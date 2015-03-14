app
    .factory('DB', function ($window) {

        var service = {};
        service.db = {};

        service.connect = function () {
            if (!!$window.localStorage.getItem('AppDB')) {
                service.db = JSON.parse($window.localStorage.getItem('AppDB'));
            } else {
                service.db = {
                    cars: []
                };
                service.saveDB();
            }
        };

        service.getList = function (context, table) {
            return context[table];
        };

        service.saveNew = function (context, table, obj, cb) {

            // ogarnianie nowego idka
            var id = _.max(context[table], function (o) {
                return o.id
            });
            if (id < 0) {
                obj.id = 1;
            } else {
                obj.id = id.id + 1;
            }


            context[table].push(obj);
            service.saveDB();
            if(cb) {
                cb();
            }
        };

        // table 'cars.stats'
        service.removeId = function (context, table, id, cb) {
            var tmp = context[table];
            var item = _.find(tmp, {id: id});

            var index = _.indexOf(tmp, item);
            tmp.splice(index, 1);

            service.saveDB();
            if (cb) {
                cb();
            }
        };

        service.saveDB = function () {
            $window.localStorage.setItem('AppDB', JSON.stringify(service.db));
        };

        return service;
    })

    .factory('CarsService', function ($rootScope) {
        var service = {};

        service.newCar = function (name, mileage) {
            this.name = name;
            this.mileage = mileage;
            this.avgCombustion = 0;
            this.fillUps = [];
        };

        service.currentCar = null;

        service.setCurrentCar = function (obj) {
            service.currentCar = obj;
            $rootScope.currentCar = service.currentCar;
        };

        return service;

    })

    .factory('FillUpService', function ($rootScope) {
        var service = {};

        service.newFillUp = function(carID, date, mileage, money, amount, gasStation){
            this.carID = carID;
            this.date = date;
            this.mileage = mileage;
            this.money = money;
            this.amount = amount;
            this.gasStation = gasStation;
        }

        service.addFillUpForCar = function (obj) {
            $rootScope.currentCar.fillUps.push(obj);
        };

        return service;
    });