<template>
  <div>

    <button @click="test()">Test</button>
    <div id="viewDiv"></div>

  </div>
</template>

<script>
import * as esriLoader from 'esri-loader';

export default {
  name: 'esri-map',
  data() {
    return {
      zoom: 4,
      center: [40.680039, -96.5560006],
      minZoom: 1,
      maxZoom: 20,
      opacity: 0.6
    };
  },
  mounted() {
    if (!esriLoader.isLoaded()) {
      console.log('map data', this.mapData);
      // no, lazy load it the ArcGIS API before using its classes
      esriLoader.bootstrap((err) => {
        if (err) {
          console.error(err);
        } else {
          // once it's loaded, create the map
          this.createMap();
        }
      }
        // , {
        //   // use a specific version instead of latest 4.x
        //   url: 'https://js.arcgis.com/4.4/init.js'
        // }
      );
    } else {
      // ArcGIS API is already loaded, just create the map
      this.createMap();
    }
  },
  computed: {
    /*
    markers() {
      const data = this.$store.getters.data;
      const markers = [];

      data.forEach((d) => {
        const html = `<strong>Seed: </strong>${d.seed}</br>
                      <strong>Contacts: </strong>${d.contact.join(', ')}</br>
                      <strong>Activity Type: </strong>${d.activityType}</br>`;

        const newMarker = {
          position: { lat: d.latitude, lng: d.longitude },
          tooltip: html,
          draggable: true,
          visible: true,
          icon: L.icon.glyph({
            prefix: '',
            glyph: ''
          })
        };
        markers.push(newMarker);
      });
      return markers;
    },
    */
    mapData() {
      const data = this.$store.getters.data;

      if (data) {
        if (esriLoader.isLoaded()) {
          esriLoader.dojoRequire([
            'esri/Graphic',
            'esri/geometry/Point',
            'esri/symbols/SimpleMarkerSymbol'
          ], (Graphic, Point, SimpleMarkerSymbol) => {
            // create map with the given options at a DOM node w/ id 'mapNode'

            console.log('graphic', Graphic);
            const graphics = [];
            data.forEach((d) => {
              graphics.push(new Graphic({
                geometry: new Point({
                  latitude: d.latitude,
                  longitude: d.longitude
                }),
                symbol: new SimpleMarkerSymbol({
                  style: 'circle',
                  color: 'blue',
                  size: '8px' // pixels
                  // outline: { // autocasts as esri/symbols/SimpleLineSymbol
                  //   color: [255, 255, 0],
                  //   width: 2 // points
                  // }
                }),
                attributes: d,
                popupTemplate: {
                  title: '{seed}',
                  content: [{
                    type: 'fields',
                    fieldInfos: [{
                      fieldName: 'date'
                    }, {
                      fieldName: 'latitude'
                    }, {
                      fieldName: 'longitude'
                    }, {
                      fieldName: 'activityType'
                    }]
                  }]
                }
              }));
            });

            console.log('map data', data[0]);

            this.view.graphics.addMany(graphics);
          });
        }

        // if (!esriLoader.isLoaded()) {
        //   console.log('is not loaded');

        //   // no, lazy load it the ArcGIS API before using its classes
        //   esriLoader.bootstrap((err) => {
        //     if (err) {
        //       console.error(err);
        //       return;
        //     }
        //     // once it's loaded, create the map
        //     esriLoader.dojoRequire([
        //       'esri/Graphic'
        //     ], (Graphic) => {
        //       // create map with the given options at a DOM node w/ id 'mapNode'

        //       console.log('graphic', Graphic);
        //     });
        //   }, {
        //     // use a specific version instead of latest 4.x
        //     url: 'https://js.arcgis.com/4.4/init.js'
        //   });
        // } else {
        //   // ArcGIS API is already loaded, just create the map
        //   console.log('is already loaded');
        //   esriLoader.dojoRequire([
        //     'esri/Graphic'
        //   ], (Graphic) => {
        //     // create map with the given options at a DOM node w/ id 'mapNode'

        //     console.log('graphic', Graphic);
        //   });
        // }
      }

      return this.$store.getters.data;
    }
  },
  methods: {
    createMap() {
      // first, we use Dojo's loader to require the map class
      esriLoader.dojoRequire([
        'esri/Map',
        'esri/views/MapView',
        'esri/widgets/LayerList'
      ], (EsriMap, MapView, LayerList) => {
        // "streets", "satellite", "hybrid", "terrain", "topo", "gray",
        // "dark-gray", "oceans", "national-geographic", "osm", "dark-gray-vector",
        // "gray-vector", "streets-vector", "topo-vector", "streets-night-vector",
        // "streets-relief-vector", "streets-navigation-vector"

        // create map with the given options at a DOM node w/ id 'mapNode'
        this.map = new EsriMap({
          basemap: 'gray-vector',
          ground: 'world-elevation'
        });

        this.view = new MapView({
          container: 'viewDiv',
          map: this.map,
          zoom: 12,
          center: [-77.380991, 38.9505039]
          // zoom: 4
          // minScale: 1,
          // maxScale: 20
        });

        this.view.then(() => {
          const layerList = new LayerList({
            view: this.view
          });

          this.view.ui.add(layerList, 'top-right');
        });
      });
    },
    test() {
      const t = this.mapData[0]; // eslint-disable-line
    }
  }
};
</script>

<style>
@import "https://js.arcgis.com/4.4/esri/css/main.css";

#viewDiv {
  height: calc(70vh - 26px);
  width: 100%;
}
</style>
