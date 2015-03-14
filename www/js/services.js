app
    .factory('CarsService', function(){
        var service = {};

        service.getCars = function(){
            return [
                {name: 'Toyota'},
                {name: 'BMW'}
            ];
        };

        return service;

    });