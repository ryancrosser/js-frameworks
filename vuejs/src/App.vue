<template>
  <div id="app">
    <top-menu framework="VueJS"></top-menu>
    <div class="container-fluid">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import topMenu from '@/components/TopMenu';

import 'bootstrap-css-only/css/bootstrap.css';

export default {
  name: 'app',
  components: {
    'top-menu': topMenu
  }
};
</script>

<style lang="scss">
@import "../node_modules/leaflet/dist/leaflet.css";

.un-row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.un-col {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
</style>
