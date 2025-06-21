import { createPinia } from 'pinia'
import { useUserStore } from './modules/user'
// import createPersistPlugin from './persist.js'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const store = createPinia()
// store.use(createPersistPlugin())
store.use(piniaPluginPersistedstate)

export { store, useUserStore }
