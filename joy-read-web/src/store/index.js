import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useUserStore } from './modules/user'

const store = createPinia()
store.use(piniaPluginPersistedstate)

export { store, useUserStore }
