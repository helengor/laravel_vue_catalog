import axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';

const cacheReq = axios.create({
    baseURL: '/',
    adapter: cacheAdapterEnhancer(axios.defaults.adapter)
});

const api = axios.create({});

export function sendRequest(state, params){


    let callback    =   params.callback ||
                        function(response){console.log(response)};

    let error       =   params.error || function(ex){console.log(ex)};

    let type        =   params.type || 'get';


    const storage   =   JSON.parse(localStorage.getItem('vuex'));
    let token       =  (storage && storage.auth && storage.auth.user && storage.auth.user.token) ?
                        storage.auth.user.token : null;

    let headers     =  {
                        'Cache-Control': 'no-cache',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                        }

    let req         =   api;
    let arg         =   [params.url, params.data, {headers: headers}];

    if(typeof params.type === 'undefined'){
        req = cacheReq;
        arg = [ params.url,
                state.getters["error/errored"] ?
                    {cache: false, headers: headers} : {headers: headers}];
    }

    state.commit('loading/SET_LOADING', { loading: true }, { root: true });

    req[type](...arg)
    .then(response => {
        if(response.error && response.error.message)
        {
            error.call(state, response);
            state.dispatch("error/set_error", response, {root: true});
        } else
        {
            callback.call(state, response);
            state.commit('error/SET_ERROR', { errored: {} }, {root: true });
        }
    })
    .catch(ex => {
        error.call(state, ex);
        state.dispatch("error/set_error", ex, {root: true});
    })
    .finally(() => {
        state.commit('loading/SET_LOADING', { loading: false }, { root: true })
    })
}
