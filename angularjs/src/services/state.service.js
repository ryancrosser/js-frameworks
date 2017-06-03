(function () {
    'use strict';

    angular
        .module('app')
        .service('StateService', StateService);

    function StateService($rootScope) {
        var _data = [];

        this.saveData = function (newData) {
            _data.length = 0;
            Array.prototype.push.apply(_data, newData);
            $rootScope.$broadcast('data:stored', { data: _data });
        };

        this.getData = function () {
            return _data;
        };

        this.setData = function (data) {
            this.data.length = 0;
            angular.merge(this.data, data);
        };
    }
})();
