(function () {
    'use strict';

    angular
        .module('app')
        .controller('GridController', GridController);

    function GridController($scope) {
        'ngInject';

        var vm = this;

        vm.gridOptions = {
            columnDefs: [],
            rowData: null,
            enableSorting: true,
            enableColResize: true
        };

        function processData(results) {
            console.log(results.data);
        }

        $scope.$on('data:stored', function (evt, results) {
            processData(results);

            // <strong>Seed: </strong>' + point.seed + '</br>' +
            // '<strong>Contacts: </strong>' + point.contact.join(', ') + '</br>' +
            // '<strong>Activity Type: </strong>' + poi

//             // activityType: d.activityType
//             // contact: d.contact
//             // context: d.context
//             // date: d.date
//             // seed: d.seed
//             // tower: d.tower,

            var columnDefs = [
                {headerName: '#', cellRenderer: function (params) { return params.rowIndex; }, width: 50, cellStyle: {'text-align': 'right'}},
                {headerName: 'Date', field: 'date', filter: 'date'},
                {headerName: 'Seed', field: 'seed', filter: 'number'},
                {headerName: 'Activity Type', field: 'activityType'},
                {headerName: 'Tower', field: 'tower', filter: 'number'},
                {headerName: 'Contacts', field: 'contact', filter: 'number'},
                {headerName: 'Location', cellRenderer: function (params) { return params.data.latitude + ', ' + params.data.longitude; }}
            ];

            vm.gridOptions.api.setColumnDefs(columnDefs);
            vm.gridOptions.api.setRowData(results.data);
            vm.gridOptions.api.sizeColumnsToFit();
        });
    }
})();
