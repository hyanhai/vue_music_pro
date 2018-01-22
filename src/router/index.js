import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/homelist'
import player from '@/components/player'
import mv from '@/components/mv'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/player/:id',
      name: 'player',
      component: player
    },
    {
      path: '/mv/:id',
      name: 'mv',
      component: mv
    }
  ]
})
