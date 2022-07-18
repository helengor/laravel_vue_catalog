import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"

import catalog from '@/components/catalogs/CatalogStore'
import auth from '@/components/auth/AuthStore'
import modal from '@/components/addons/Modal/ModalStore'
import error from '@/components/addons/Error/ErrorStore'
import loading from '@/components/addons/Loading/LoadingStore'
import breadcrumbs from '@/components/addons/Breadcrumbs/BreadcrumbsStore'

const store = createStore({

    plugins: [createPersistedState()],
    modules: {
        catalog,
	    modal,
        auth,
        error,
        loading,
        breadcrumbs,
	},
  })

  export default store
