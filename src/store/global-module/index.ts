import { globalState } from './state'
import { golbalGetters } from './getters'
import { golbalActions } from './actions'
import { globalMutations } from './mutations'

export const storeOptions = {
  state: globalState,
  getters: golbalGetters,
  actions: golbalActions,
  mutations: globalMutations
}
