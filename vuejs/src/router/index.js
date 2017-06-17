/* @flow */
import Vue from 'vue';
import Router from 'vue-router';
import Shell from '../components/Shell';
import Another from '../components/Another';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: window.location.pathname,
  routes: [
    {
      path: '/',
      name: 'Root',
      component: Shell
    },
    {
      path: '/another',
      name: 'Another',
      component: Another
    }
  ]
});

export default router;
