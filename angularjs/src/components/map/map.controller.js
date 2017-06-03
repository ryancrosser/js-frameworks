(function () {
    'use strict';

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
