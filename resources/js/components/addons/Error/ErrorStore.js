import * as constants from '@/helpers/constants'

const store = {
    namespaced: true,
    state: {
        errored: {},
    },
    getters: {
        errored: state => state.errored,
      },
    actions: {
        set_error: (state, ex) => {
            let errored = constants.RESPONSE_ERROR_DEFAULT;

            if (ex.response && ex.response.status)
            {
                switch (ex.response.status){
                    case 401:
                        errored = constants.RESPONSE_ERROR_401;
                        state.commit('error/SET_DEFAULT_STATE', {}, { root: true });
                        state.commit('auth/SET_USER', {}, { root: true });
                    break;
                    case 404:
                        errored = constants.RESPONSE_ERROR_404;
                    break;
                }
            }

            if(ex.error && ex.error.message)
            {
                errored = {title: "Ошибка!", message: response.error.message};
            }

            state.commit('error/SET_ERROR', { errored: errored }, { root: true });
        },
    },
    mutations: {
        SET_ERROR: (state, payload)  => {
            state.errored = payload.errored
          },
        SET_DEFAULT_STATE: (state) => {
            state.catalog_root = [];
            state.catalog_folder = [];
            state.breadcrumbs = [];
            state.catalog_mode_current = constants.CATALOG_MODE_SHOW;
            state.catalog_mode_default = constants.CATALOG_MODE_SHOW;
            window.localStorage.clear();
        },
    }
  }

  export default store
