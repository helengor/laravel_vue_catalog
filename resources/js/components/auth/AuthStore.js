import axios from 'axios'
import router from '@/router/index'
import * as request from '@/helpers/request'

const store = {
    namespaced: true,
    state: {
        user: {},
        loggedin: false,
    },
    getters: {
        getUser: state => state.user,
        loggedIn: state => state.loggedin,
      },
    actions: {
        protection: (state) => {
            axios.get('/sanctum/csrf-cookie').then(response => {
            });
        },
        login: (state, payload) => {
            request.sendRequest(
                state,
                {
                    url: '/api/V1/login',
                    callback: (response) => {state.commit('SET_USER', response.data)},
                    type: 'post',
                    data: payload
                }
            );
        },
        logout: (state, payload) => {
            request.sendRequest(
                state,
                {
                    url: '/api/V1/logout',
                    callback: (response) => {
                        router.push({ name: 'home' });
                        state.commit('error/SET_DEFAULT_STATE', {}, { root: true });
                        state.commit('auth/SET_USER', {}, { root: true });
                    },
                    type: 'post',
                    data: payload
                }
            );
        },
        registration: (state, payload) => {
            request.sendRequest(
                state,
                {
                    url: '/api/V1/registration',
                    callback: (response) => {state.commit('SET_USER', response.data)},
                    type: 'post',
                    data: payload
                }
            );
        },
    },
    mutations: {
        SET_USER: (state, payload) => {
            state.user = payload;
            state.loggedin = _.isEmpty(payload) ? false : true;
          },
    }
  }

  export default store
