<template>
  <div>
    <div id="bottom_div">
      <v-map style="height:calc(70vh - 26px)"
             ref="map"
             :padding="[200, 200]"
             :zoom="zoom"
             :bounds="bounds"
             :center="center"
             :min-zoom="minZoom"
             :max-zoom="maxZoom">

        <v-tilelayer :url="tileProvider.url"
                     :attribution="tileProvider.attribution"></v-tilelayer>

        <v-marker-cluster>
          <v-marker v-for="item in markers"
                    :key="item.id"
                    :lat-lng="item.position"
                    :icon="item.icon">
            <v-popup :content="item.tooltip"></v-popup>
          </v-marker>
        </v-marker-cluster>
      </v-map>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'; // eslint-disable-line
import { LatLngBounds, TileLayer } from 'leaflet'; // eslint-disable-line
import Vue2Leaflet from 'vue2-leaflet';
import Vue2LeafletMarkercluster from 'vue2-leaflet-markercluster';
import 'leaflet.icon.glyph'; // eslint-disable-line

const tileProviders = [
  {
    name: 'OpenStreetMap',
    attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  },
  {
    name: 'OpenTopoMap',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: ''
  }
];

export default {
  name: 'map',
  components: {
    'v-map': Vue2Leaflet.Map,
    'v-tilelayer': Vue2Leaflet.TileLayer,
    'v-marker': Vue2Leaflet.Marker,
    'v-poly': Vue2Leaflet.Polyline,
    'v-group': Vue2Leaflet.LayerGroup,
    'v-tooltip': Vue2Leaflet.Tooltip,
    'v-popup': Vue2Leaflet.Popup,
    'v-marker-cluster': Vue2LeafletMarkercluster
  },
  data() {
    return {
      zoom: 4,
      center: [40.680039, -96.5560006],
      minZoom: 1,
      maxZoom: 20,
      opacity: 0.6,
      tileProviders,
      tileProvider: tileProviders[0],
      bounds: LatLngBounds()
    };
  },
  mounted() {
    // console.log(this.$refs.map.mapObject);
    // const map = this.$refs.map.mapObject;

    // this.baseLayers = {
    //   OpenStreetMap: TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
    //   OpenTopoMap: TileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png')
    // };

    // L.control.layers(this.baseLayers).addTo(map);
  },
  computed: {
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
    }
  },
  methods: {
    alert(item) {
      alert(`this is ${JSON.stringify(item)}`); // eslint-disable-line
    },
    fitPolyline() {
      const bounds = LatLngBounds(this.markers.map(o => o.position));
      this.bounds = bounds;
    }
  }
};
</script>

<style>
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
</style>
