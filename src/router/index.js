import Vue from 'vue';
import Router from 'vue-router';
import home from '@/components/home';
import elm from '@/components/elm';
import index from '@/components/index';
import search from '@/components/search';
import detail from '@/components/detail';
import goodsList from '@/components/goodsList';
import replyList from '@/components/replyList';
import shopList from '@/components/shopList';
import login from '@/components/login';
import person from '@/components/person';
import info from '@/components/info';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/elm/city/:id?',
      name: 'elm',
      component: elm
    },
    {
      path: '/index/:geohash?',
      name: 'index',
      component: index
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/detail/:id?',
      name: 'detail',
      component: detail
      // childern: [
      //   {
      //     path: '/goodsList',
      //     name: 'goodsList',
      //     component: goodsList
      //   },
      //   {
      //     path: '/replyList',
      //     name: 'replyList',
      //     component: replyList
      //   }
      // ]
    },
    {
      path: '/shopList/:title?',
      name: 'shopList',
      component: shopList
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/person',
      name: 'person',
      component: person
    },
    {
      path: '/info',
      name: 'info',
      component: info
    }
  ]
})
