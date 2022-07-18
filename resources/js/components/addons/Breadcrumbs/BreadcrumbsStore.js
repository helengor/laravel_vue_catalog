const store = {
    namespaced: true,
    state: {
        breadcrumbs: [],
    },
    getters: {
        breadcrumbs: state => {return state.breadcrumbs},
      },
    mutations: {
        SET_BREADCRUMBS: (state, payload) => {state.breadcrumbs = payload},
    },
  }

  export default store
