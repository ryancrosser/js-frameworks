<template>
  <nav class="navbar navbar-inverse"
       style="border-radius: 0;margin-bottom:0;">
    <div class="container-fluid">
      <div class="navbar-header">
        </button>
        <a class="navbar-brand"
           href="#">JS Framework - {{framework}}</a>
      </div>
      <div id="navbar"
           class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <li>
            <router-link :to="{ name: 'Root'}"
                         exact>Home</router-link>
          </li>
          <li>

            <router-link :to="{ name: 'Another'}"
                         exact>Another</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'top-menu',
  props: ['framework']
};
</script>

<style>
a.router-link-active,
li.router-link-active a {
  color: white !important;
}

a.router-link-exact-active,
li.router-link-exact-active a {
  color: white !important;
}
</style>
