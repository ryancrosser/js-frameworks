(function () {
    'use strict';
    
    angular
        .module('app')
        .service('DataService', DataService);
    
    function DataService($http, $q) {
        this.url = '//test-data-api.herokuapp.com/data';

        this.getData = function (params) {
            var deferred = $q.defer();

            if (params.activityType === '') {
                delete params.activityType
            }
            if (params.date && params.date.start) {
                params.date_gte = params.date.start;
                delete params.date.start;
            }
            if (params.date && params.date.end) {
                params.date_lte = params.date.end;
                delete params.date.end;
            }
            if (params.date && Object.keys(params.date).length === 0) {
                delete params.date
            }
            
            $http.get(this.url, { params:params }).then(function (response) {
                console.log(111, response.data);
                deferred.resolve(response);
            }).catch(function (err) {
                deferred.reject(err);
            })
            
            return deferred.promise;
        }.bind(this);
    }
})();
