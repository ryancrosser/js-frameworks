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

(function () {
    'use strict';

    routes.$inject = ["$stateProvider", "$urlRouterProvider"];
    angular
        .module('app')
        .config(routes);

    function routes($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            // .when('/c?id', '/contacts/:id')
            .otherwise('/');

        $stateProvider
            .state('main', {
                url: '/',
                template: '<content></content>'
            }).state('another', {
                url: '/another',
                template: 'This is another page.'
            });
    }
})();

(function () {
    'use strict';

    StateService.$inject = ["$rootScope"];
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

(function () {
    'use strict';

    DataService.$inject = ["$http", "$q"];
    angular
        .module('app')
        .service('DataService', DataService);

    function DataService($http, $q) {
        this.url = '//test-data-api.herokuapp.com/data';

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

(function () {
    'use strict';

    angular
        .module('app')
        .component('topNavBar', {
            templateUrl: 'components/top-nav-bar/top-nav-bar.view.html'
        });
})();

(function () {
    'use strict';

    angular
        .module('app')
        .component('shell', {
            templateUrl: 'components/shell/shell.view.html'
        });
})();

(function () {
    'use strict';

    angular
        .module('app')
        .component('queryContainer', {
            templateUrl: 'components/query-container/query-container.view.html',
            controller: 'QueryContainerController'
        });
})();


(function () {
    'use strict';

    angular
        .module('app')
        .component('map', {
            templateUrl: 'components/map/map.view.html',
            controller: 'MapController'
        });
})();

(function () {
    'use strict';

    angular
        .module('app')
        .component('grid', {
            templateUrl: 'components/grid/grid.view.html',
            controller: 'GridController'
        });
})();

(function () {
    'use strict';

    angular
        .module('app')
        .component('content', {
            templateUrl: 'components/content/content.view.html'
        });
})();


(function () {
    'use strict';

    QueryContainerController.$inject = ["DataService", "StateService"];
    angular
        .module('app')
        .controller('QueryContainerController', QueryContainerController);

    function QueryContainerController(DataService, StateService) {
        'ngInject';

        this.inputs = {
            seedsStr: '5376462406'
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

(function () {
    'use strict';

    MapController.$inject = ["$rootScope", "leafletData", "StateService"];
    angular
        .module('app')
        .controller('MapController', MapController);

    function MapController($rootScope, leafletData, StateService) {
        'ngInject';

        var vm = this;

        this.mapData = {
            center: {
                lat: 40.680039,
                lng: -96.5560006,
                zoom: 4
            },
            markers: [],
            events: {},
            defaults: {
                maxZoom: 18,
                minZoom: 2,
                maxBounds: [
                    // south west
                    [-90, -180],
                    // north east
                    [90, 180]
                ],
                maxBoundsViscosity: 1,
                inertiaMaxSpeed: 1,
                noWrap: false
            },
            layers: {
                baselayers: {
                    osm: {
                        name: 'OpenStreetMap',
                        type: 'xyz',
                        url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    }
                },
                overlays: {
                    geos: {
                        name: 'Geos',
                        type: 'markercluster',
                        visible: true
                    }
                }
            }
        };

        $rootScope.$on('data:stored', function (evt, data) {
            processData(data.data);
        });

        function processData(data) {
            var generateMarkers = function (points) {
                return points.map(function (point) {
                    var html = '<strong>Seed: </strong>' + point.seed + '</br>' +
                                '<strong>Contacts: </strong>' + point.contact.join(', ') + '</br>' +
                                '<strong>Activity Type: </strong>' + point.activityType + '</br>';
                    return {
                        layer: 'geos',
                        lat: point.latitude,
                        lng: point.longitude,
                        message: html
                    };
                });
            };


            leafletData.getDirectiveControls().then(function (controls) {
                var markers = generateMarkers(data);
                controls.markers.create(markers, vm.mapData.markers);
                vm.mapData.markers = markers;

                if (vm.mapData.markers.length) {
                    leafletData.getMap().then(function (map) {
                        map.fitBounds(vm.mapData.markers);
                    });
                }
            });
        }
    }
})();

(function () {
    'use strict';

    GridController.$inject = ["$scope"];
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

//# sourceMappingURL=app.js.map

angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("components/content/content.view.html","<div class=\"row\">\n    <div class=\"col-xs-3\" style=\"height: calc(100vh - 51px);overflow-y: auto;border-right: 2px solid #2f4f4f;\">\n        <query-container></query-container>\n    </div>\n    <div class=\"col-xs-9 un-col\">\n        <div style=\"height:calc(70vh - 26px)\">\n            <map></map>\n        </div>\n        <div style=\"height:calc(30vh - 25px)\">\n            <grid></grid>\n        </div>\n    </div>\n</div>\n");
$templateCache.put("components/grid/grid.view.html","<div ag-grid=\"$ctrl.gridOptions\" class=\"ag-fresh\" style=\"height: 100%;\"></div>\n");
$templateCache.put("components/map/map.view.html","<leaflet lf-center=\"$ctrl.mapData.center\" layers=\"$ctrl.mapData.layers\" markers=\"$ctrl.mapData.markers\" event-broadcast=\"$ctrl.mapData.events\"\n    defaults=\"$ctrl.mapData.defaults\" height=\"100%\" width=\"100%\"></leaflet>\n");
$templateCache.put("components/shell/shell.view.html","<top-nav-bar></top-nav-bar>\n\n<div class=\"container-fluid\" style=\"padding-top: 51px;\">\n    <div ui-view></div>\n</div>\n");
$templateCache.put("components/query-container/query-container.view.html","<form novalidate>\n    <div class=\"form-group\">\n        <label for=\"selectorInput\">Selectors</label>\n        <textarea id=\"selectorInput\" class=\"form-control\" ng-model=\"$ctrl.inputs.seedsStr\" placeholder=\"Comma Seperate multiple values\"></textarea>\n    </div>\n    <div class=\"form-group\">\n        <label for=\"startDateInput\">Date</label>\n        <div class=\"input-group\">\n            <datepicker date-format=\"yyyy-MM-dd\">\n                <input ng-model=\"$ctrl.inputs.date.start\" class=\"form-control\" placeholder=\"Start date\" />\n            </datepicker>\n            <span class=\"input-group-addon\">-</span>\n            <datepicker date-format=\"yyyy-MM-dd\">\n                <input ng-model=\"$ctrl.inputs.date.end\" class=\"form-control\" placeholder=\"End date\" />\n            </datepicker>\n        </div>\n    </div>\n    <div class=\"form-group\">\n        <label for=\"exampleInputEmail1\">Activity Type</label>\n        <select class=\"form-control\" ng-model=\"$ctrl.inputs.activityType\">\n            <option value=\"\">All</option>\n            <option value=\"C\">Call</option>\n            <option value=\"S\">SMS</option>\n        </select>\n    </div>\n\n    <!--<pre>{{$ctrl.inputs | json}}</pre>-->\n\n    <button type=\"submit\" class=\"btn btn-default\" ng-click=\"$ctrl.submit($ctrl.inputs)\">Submit</button>\n    <button type=\"reset\" class=\"btn btn-default\" ng-click=\"$ctrl.reset()\">Reset</button>\n</form>\n");
$templateCache.put("components/top-nav-bar/top-nav-bar.view.html","<nav class=\"navbar navbar-inverse navbar-fixed-top\">\n    <div class=\"container-fluid\">\n        <div class=\"navbar-header\">\n            </button>\n            <a class=\"navbar-brand\" href=\"#\">JS Framework - AngularJS</a>\n        </div>\n        <div id=\"navbar\" class=\"collapse navbar-collapse\">\n            <ul class=\"nav navbar-nav\">\n                <li>\n                    <a ui-sref=\"main\" ui-sref-active=\"active\">Home</a>\n                </li>\n                <li>\n                    <a ui-sref=\"another\" ui-sref-active=\"active\">Another</a>\n                </li>\n            </ul>\n        </div>\n    </div>\n</nav>\n");}]);