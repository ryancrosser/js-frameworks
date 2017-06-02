(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('QueryContainerController', QueryContainerController);
    
    function QueryContainerController(DataService) {
        'ngInject';

        this.dateOptions = {
            
        }

        this.inputs = {
            selectors: '5376462406'
        };

        this.submit = function () {
            if (this.inputs.selectors) {
                this.inputs.seed = this.inputs.selectors;
                delete this.inputs.selectors;
            }
            
            console.log(this.inputs);
            DataService.getData(this.inputs).then(function (results) {
                console.log(results);
            })
        }.bind(this);
    }
})();
