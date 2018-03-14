<template>
  <div class="row">
    <div class="col-xs-3"
         style="height: calc(100vh - 51px);overflow-y: auto;border-right: 2px solid #2f4f4f;">
      <query></query>
    </div>
    <div class="col-xs-9 un-col">
      <div style="height:calc(70vh - 26px); overflow-y:auto">
        <esri-map></esri-map>
      </div>
      <div style="height:calc(30vh - 25px)">
        <grid></grid>
      </div>
    </div>
  </div>
</template>

<script>
import query from '@/components/Query';
import leafletMap from '@/components/RKCMap';
import esriMap from '@/components/EsriMap';
import grid from '@/components/Grid';


export default {
  name: 'Shell',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  },
  components: {
    query,
    'rkc-map': leafletMap,
    'esri-map': esriMap,
    grid
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
