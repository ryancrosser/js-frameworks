(function () {
    'use strict';
    
    angular
        .module('app')
        .service('StorageService', StorageService);
    
    function StorageService() {
        this.data = [];

        this.getData = function () {
            return this.data;
        }

        this.setData = function (data) {
            this.data.length = 0;
            angular.merge(this.data, data);
        }
    }
})();
