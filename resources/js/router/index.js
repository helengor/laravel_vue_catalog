import { createWebHistory, createRouter } from "vue-router";
import routes from './routes';
import store from '../store/index.js';

const router = createRouter({
    history: createWebHistory(),
    routes,
  });

router.beforeEach((to, from, next)=>{

    if ( to.name !== 'home' && !store.getters["auth/loggedIn"] ){
      next('/')
    } else {
      next();
    }

})

  export default router
