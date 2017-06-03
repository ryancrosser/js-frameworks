(function () {
    'use strict';

    agGrid.initialiseAgGridWithAngular1(angular);
    angular.module('app', [
        '720kb.datepicker',
        'agGrid',
        'ui.router',
        'ui-leaflet'
    ]);
})();
