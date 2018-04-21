import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import AuthGuard from './libs/middlewares/authGuard';
import SignInRedirect from './libs/middlewares/signInRedirect';

export default new Router({
  routes: [
    {
      path: '/',
      component: require('@/components/Home').default,
      name: 'home',
      beforeEnter: AuthGuard,
      children: [
        {
          path: 'test',
          name: 'test',
          component: require('@/components/Test').default
        },
        {
          path: 'catalog',
          name: 'catalog',
          component: require('@/components/layouts/BaseLayout').default,
          children: [
            {
              path: 'units',
              name: 'units',
              component: require('@/components/catalog/Units').default
            },
            {
              path: 'realty',
              name: 'realty',
              component: require('@/components/catalog/Realty').default
            },
            {
              path: 'clients',
              name: 'clients',
              component: require('@/components/catalog/Clients').default
            },
            {
              path: 'transactions',
              name: 'transactions',
              component: require('@/components/catalog/Transactions').default
            },
            {
              path: 'tasks',
              name: 'tasks',
              component: require('@/components/catalog/Tasks').default
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      beforeEnter: SignInRedirect,
      component: require('@/components/Login').default
    }
  ]
})
