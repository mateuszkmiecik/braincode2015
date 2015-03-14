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

        service.getList = function (table) {
            return service.db[table];
        };

        service.saveNew = function (table, obj, cb) {
            var id = _.max(service.db[table], function (o) {
                return o.id
            });
            if (id < 0) {
                obj.id = 1;
            } else {
                obj.id = id.id + 1;
            }
            service.db[table].push(obj);
            service.saveDB();
            cb();
        };

        // table 'cars.stats'
        service.removeId = function (table, id, cb) {
            var tmp = service.db[table];
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

        service.newCar = function (name) {
            this.name = name;
        };

        service.currentCar = null;

        service.setCurrentCar = function (obj) {
            service.currentCar = obj;
            $rootScope.currentCar = service.currentCar;
        };

        return service;

    });