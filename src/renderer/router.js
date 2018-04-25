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
          path: 'layout',
          name: 'layout',
          component: require('@/components/layouts/BaseLayout').default,
          children: [
            {
              path: 'realty',
              name: 'realty',
              component: require('@/components/realty/Realty').default
            },
            {
              path: 'clients',
              name: 'clients',
              component: require('@/components/clients/Clients').default
            },
            {
              path: '/clients/:id',
              name: 'clientcard',
              component: require('@/components/clients/ClientCard').default
            },
            {
              path: '/realty/:id',
              name: 'realtycard',
              component: require('@/components/realty/RealtyCard').default
            },
            {
              path: 'transactions',
              name: 'transactions',
              component: require('@/components/transactions/Transaction').default
            },
            {
              path: '/transactions/:id',
              name: 'transactioncard',
              component: require('@/components/transactions/TransactionCard').default
            },
            {
              path: 'users',
              name: 'users',
              component: require('@/components/users/Users').default
            }
          ]
        },
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
