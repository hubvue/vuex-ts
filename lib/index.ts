import { inject } from "vue"
import {Store, BaseStoreOptions} from './store'

type PublicStoreKeys = 'state' | 'commit' | 'dispatch' | 'getters'
type PublicStore<T extends Store, Keys extends Partial<keyof T> = PublicStoreKeys> = Pick<T, Keys>

export const createStore = <S>(store: BaseStoreOptions<S>): Store<S> => {
  return new Store<S>(store)
}

export const useStore = <S>(injectKey?: string | symbol): PublicStore<Store<S>, PublicStoreKeys> => {
  return inject(injectKey || 'storeKey')
}

export * from './store'
export default Store
