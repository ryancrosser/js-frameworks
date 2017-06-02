(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('MapController', MapController);
    
    function MapController() {
        'ngInject';

        this.mapData = {
            center: {
                lat: 51.505,
                lng: -0.09,
                zoom: 8
            },
            markers: [],
            events: {}
        }
    }
})();
