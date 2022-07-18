const DEFAULT_MODAL = {
    title: 'Внимание!',
    body: '',
    show: true,
    button_ok: false,
    button_cancel: false
}

const store = {
	namespaced: true,
	state: {
		modal:
            {
                title: '',
                body: '',
                show: false,

            },
	},
	getters: {
		modal: (state) => state.modal,
	},
    actions:{
        show: (state, payload) => {
            let settings =
            {
                title:          payload.title         || DEFAULT_MODAL.title,
                body:           payload.body          || DEFAULT_MODAL.body,
                show:           payload.show          || DEFAULT_MODAL.show,
                button_ok:      payload.button_ok     || DEFAULT_MODAL.button_ok,
                button_cancel:  payload.button_cancel || DEFAULT_MODAL.button_cancel,
            }
            state.commit('modal/SHOW', settings, { root: true })
        },
        hide: (state, payload) => {
            state.commit('modal/HIDE', payload, { root: true })
        },
    },
	mutations: {
		SHOW: (state, payload) => state.modal = payload,
		HIDE: (state, payload) => {
            state.modal = {
                title: '',
                body: '',
                show: false,
            }
        },
	},
}

export default store
