(function () {
   'use strict';
   
   angular.module('app', [
       '720kb.datepicker',
       'ui.router',
       'ui-leaflet'
   ]);
    
})(); 

(function () {
   'use strict';
   
    routes.$inject = ["$stateProvider", "$urlRouterProvider"];
   angular
       .module('app')
       .config(routes)
    
   function routes($stateProvider,   $urlRouterProvider) {
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

(function () {
    'use strict';
    
    DataService.$inject = ["$http", "$q"];
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

(function () {
    'use strict';
   
    angular
        .module('app')
        .component('topNavBar', {
            templateUrl: 'components/top-nav-bar/top-nav-bar.view.html'
        })
})();

(function () {
    'use strict';
   
    angular
        .module('app')
        .component('shell', {
            templateUrl: 'components/shell/shell.view.html'
        })
})();

(function () {
    'use strict';
    
    angular
        .module('app')
        .component('queryContainer', {
            templateUrl: 'components/query-container/query-container.view.html',
            controller: 'QueryContainerController'
        })
})();


(function () {
    'use strict';
    
    angular
        .module('app')
        .component('map', {
            templateUrl: 'components/map/map.view.html',
            controller: 'MapController'
        })
})();
(function () {
    'use strict';
   
    angular
       .module('app')
       .component('content', {
           templateUrl: 'components/content/content.view.html'
       }) 
})();


(function () {
    'use strict';
    
    QueryContainerController.$inject = ["DataService"];
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

//# sourceMappingURL=app.js.map

angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("components/content/content.view.html","<div class=\"row\">\n    <div class=\"col-xs-3\">\n        <query-container></query-container>\n    </div>\n    <div class=\"col-xs-9 un-col\">\n        <map></map>\n    </div>\n</div>\n");
$templateCache.put("components/map/map.view.html","<leaflet lf-center=\"$ctrl.mapData.center\" markers=\"$ctrl.mapData.markers\" event-broadcast=\"$ctrl.mapData.events\" height=\"calc(100vh - 51px)\"\n    width=\"100%\"></leaflet>\n");
$templateCache.put("components/query-container/query-container.view.html","<form novalidate>\n    <div class=\"form-group\">\n        <label for=\"selectorInput\">Selectors</label>\n        <textarea id=\"selectorInput\" class=\"form-control\" ng-model=\"$ctrl.inputs.selectors\" placeholder=\"\"></textarea>\n    </div>\n    <div class=\"form-group\">\n        <label for=\"startDateInput\">Date</label>\n\n\n        <!--<span class=\"input-group-addon\">$</span>\n            <input type=\"text\" class=\"form-control\" aria-label=\"Amount (to the nearest dollar)\">\n            <span class=\"input-group-addon\">.00</span>-->\n\n\n        <div class=\"input-group\">\n            <datepicker date-format=\"yyyy-MM-dd\">\n                <input ng-model=\"$ctrl.inputs.date.start\" class=\"form-control\" placeholder=\"Start date\" />\n            </datepicker>\n            <span class=\"input-group-addon\">-</span>\n            <datepicker date-format=\"yyyy-MM-dd\">\n                <input ng-model=\"$ctrl.inputs.date.end\" class=\"form-control\" placeholder=\"End date\" />\n            </datepicker>\n        </div>\n    </div>\n    <div class=\"form-group\">\n        <label for=\"exampleInputEmail1\">Activity Type</label>\n        <select class=\"form-control\" ng-model=\"$ctrl.inputs.activityType\">\n            <option value=\"\">All</option>\n            <option value=\"C\">Call</option>\n            <option value=\"S\">SMS</option>\n        </select>\n    </div>\n\n    <pre>{{$ctrl.inputs | json}}</pre>\n\n    <button type=\"submit\" class=\"btn btn-default\" ng-click=\"$ctrl.submit($ctrl.inputs)\">Submit</button>\n    <button type=\"reset\" class=\"btn btn-default\" ng-click=\"$ctrl.reset()\">Reset</button>\n</form>\n");
$templateCache.put("components/shell/shell.view.html","<top-nav-bar></top-nav-bar>\n\n<div class=\"container-fluid\" style=\"padding-top: 51px;\">\n    <div ui-view></div>\n</div>\n");
$templateCache.put("components/top-nav-bar/top-nav-bar.view.html","<nav class=\"navbar navbar-inverse navbar-fixed-top\">\n    <div class=\"container-fluid\">\n        <div class=\"navbar-header\">\n            </button>\n            <a class=\"navbar-brand\" href=\"#\">JS Framework - AngularJS</a>\n        </div>\n        <div id=\"navbar\" class=\"collapse navbar-collapse\">\n            <ul class=\"nav navbar-nav\">\n                <li>\n                    <a ui-sref=\"main\" ui-sref-active=\"active\">Home</a>\n                </li>\n                <li>\n                    <a ui-sref=\"another\" ui-sref-active=\"active\">Another</a>\n                </li>\n            </ul>\n        </div>\n    </div>\n</nav>\n");}]);