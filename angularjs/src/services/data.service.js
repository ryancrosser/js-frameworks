(function () {
    'use strict';

    angular
        .module('app')
        .service('DataService', DataService);

    function DataService($http, $q) {
        this.url = '//dataapi2.herokuapp.com/data';

        this.getAllData = function (params) {
            var deferred = $q.defer();

            var promises = [];
            if (params.seed) {
                var seeds = params.seed;
                delete params.seed;
                seeds.forEach(function (seed) {
                    var currentParams = JSON.parse(JSON.stringify(params));
                    currentParams.seed = seed;
                    promises.push(this.getData(currentParams));
                }, this);
            }

            $q.all(promises).then(function (results) {
                var combinedResults = results.reduce(function (previousValue, currentResult) {
                    return previousValue.concat(currentResult.data);
                }, []);
                deferred.resolve(combinedResults);
            }).catch(function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        this.getData = function (params) {
            var deferred = $q.defer();

            if (params.seedsStr) {
                delete params.seedsStr;
            }

            if (params.activityType === '') {
                delete params.activityType;
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
                delete params.date;
            }

            $http.get(this.url, { params: params }).then(function (response) {
                deferred.resolve(response);
            }).catch(function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }.bind(this);
    }
})();
