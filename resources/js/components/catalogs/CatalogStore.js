import * as request from '@/helpers/request'
import * as constants from '@/helpers/constants'

const store = {
    namespaced: true,
    state: {
        catalog_root: [],
        catalog_folder: [],
        catalog_mode_current: constants.CATALOG_MODE_SHOW,
        catalog_mode_default: constants.CATALOG_MODE_SHOW,
    },
    getters: {
        catalog_root: state => {
          return state.catalog_root;
        },
        catalog_folder: state => {
            return state.catalog_folder;
          },
        catalog_mode: state => {
            return state.catalog_mode_current;
          },
      },
    actions: {
        get_catalog_root: (state) => {
            request.sendRequest(
                state,
                {
                    url: '/api/V1/catalogs',
                    callback: (response) => {state.commit('catalog/SET_CATALOG_ROOT', response.data.data, { root: true })}
                }
            );
          },
        get_catalog_folder : (state, payload) => {
            request.sendRequest(
                state,
                {
                    url: '/api/V1/catalogs/'+payload,
                    callback: (response) => {
                        state.commit('catalog/SET_CATALOG_FOLDER', response.data.data, { root: true });


                        let breadcrumbs = [];
                        let payload_breadcrumbs = response.data.data.breadcrumbs;
                        while(payload_breadcrumbs)
                        {
                            breadcrumbs.push({'id': payload_breadcrumbs['id'], 'name': payload_breadcrumbs['name']});
                            payload_breadcrumbs = payload_breadcrumbs['breadcrumbs'];
                        }

                        state.commit('breadcrumbs/SET_BREADCRUMBS', breadcrumbs.reverse(), { root: true });
                    }
                }
            );
        },
        edit_catalog_name: (state, payload) => {
            request.sendRequest(
                state,
                {
                    url: '/api/V1/catalogs/'+payload.id,
                    callback: (response) => {state.commit('catalog/SET_CATALOG_FOLDER_CHILD', response.data.data, { root: true })},
                    type: 'put',
                    data: {name: payload.name}
                }
            );
        },
        edit_doc_name: (state, payload) => {
            request.sendRequest(
                state,
                {
                    url: '/api/V1/documents/'+payload.id,
                    callback: (response) => {state.commit('catalog/SET_CATALOG_FOLDER_DOC', response.data.data, { root: true })},
                    type: 'put',
                    data: {name: payload.name}
                }
            );
        },
        new_catalog_item: (state, payload) => {
            request.sendRequest(
                state,
                {
                    url: '/api/V1/catalogs/',
                    callback: (response) => {state.commit('catalog/ADD_CATALOG_FOLDER_CHILD', response.data.data, { root: true })},
                    type: 'post',
                    data: payload
                }
            );
        },
        new_document_item: (state, payload) => {
            request.sendRequest(
                state,
                {
                    url: '/api/V1/documents/',
                    callback: (response) => {state.commit('catalog/ADD_CATALOG_FOLDER_DOC', response.data.data, { root: true })},
                    type: 'post',
                    data: payload
                }
            );
        }
    },
    mutations: {
        SET_CATALOG_ROOT: (state, payload) => {
            state.catalog_root = payload;
          },
        SET_CATALOG_FOLDER: (state, payload) => {
            state.catalog_folder = payload;
          },
        SET_CATALOG_FOLDER_CHILD: (state, payload) => {
            let array_index = state.catalog_folder.childs.findIndex(item => item.id == payload.id);

            if(array_index > -1)
            {
                state.catalog_folder.childs[array_index] = payload;
            }
          },
        SET_CATALOG_FOLDER_DOC: (state, payload) => {
            let array_index = state.catalog_folder.documents.findIndex(item => item.id == payload.id);

            if(array_index > -1)
            {
                state.catalog_folder.documents[array_index] = payload;
            }
          },
        ADD_CATALOG_FOLDER_CHILD: (state, payload) => {
            let array_index = state.catalog_folder.childs.findIndex(item => item.id == payload.id);

            if(array_index == -1 && payload.parent_id == state.catalog_folder.id)
            {
                state.catalog_folder.childs.push(payload);
            }
          },
        ADD_CATALOG_FOLDER_DOC: (state, payload) => {
            let array_index = state.catalog_folder.documents.findIndex(item => item.id == payload.id);

            if(array_index == -1 && payload.catalog_id == state.catalog_folder.id)
            {
                state.catalog_folder.documents.push(payload);
            }
          },
        SET_CATALOG_MODE: (state, mode)  => {
            state.catalog_mode_current = mode;
        },
        SET_CATALOG_MODE_DEFAULT: (state)  => {
            state.catalog_mode_current = state.catalog_mode_default;
        },
    },
  }

  export default store
