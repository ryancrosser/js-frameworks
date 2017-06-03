(function () {
    'use strict';

    angular
        .module('app')
        .controller('QueryContainerController', QueryContainerController);

    function QueryContainerController(DataService, StateService) {
        'ngInject';

        this.inputs = {
            seedsStr: ''
        };

        this.submit = function () {
            if (this.inputs.seedsStr) {
                this.inputs.seed = this.inputs.seedsStr.split(',');
                this.inputs.seed = this.inputs.seed.map(Function.prototype.call, String.prototype.trim);
            } else {
                this.inputs.seed = '';
            }

            DataService.getAllData(JSON.parse(JSON.stringify(this.inputs))).then(function (results) {
                StateService.saveData(results);
            }).catch(function (err) {
                console.error(err);
            });
        }.bind(this);
    }
})();
