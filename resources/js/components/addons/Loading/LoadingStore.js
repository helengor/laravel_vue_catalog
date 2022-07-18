const store = {
    namespaced: true,
    state: {
        loading: false
    },
    getters: {
        loading: state => state.loading,
      },
    mutations: {
        SET_LOADING: (state, payload)  => {
            state.loading = payload.loading;
          },
    }
  }

  export default store
