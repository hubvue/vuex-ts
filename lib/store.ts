import {ExtractKey, Type} from './type'
import {App, UnwrapRef, reactive, computed} from 'vue'


type ExtractStoreActions<T extends BaseStoreOptions<T>> = ExtractKey<T, 'actions'>
type ExtractStoreMutations<T extends BaseStoreOptions<T>> = ExtractKey<T, 'mutations'>
type ExtractStoreGetters<T extends BaseStoreOptions<T>> = ExtractKey<T, 'getters'>
type ExtractStoreState<T extends BaseStoreOptions<T>> = ExtractKey<T, 'state'>

type ActionTypes<T extends BaseStoreOptions<T>, U = ExtractStoreActions<T>> = {
  [K in keyof U]: K
}[keyof U]
type MutationTypes<T extends BaseStoreOptions<T>, U = ExtractStoreMutations<T>> = {
  [K in keyof U]: K
}[keyof U]
type GetterKeys<T> = keyof ExtractStoreGetters<T>

type DispatchPayloadType<T extends BaseStoreOptions<T>, Key, U = ExtractStoreActions<T>> =  {
  [K in keyof U]: K extends Key ? U[K] extends (...args: infer P) => unknown ? P[1] : never : never
}[keyof U]
type CommitPayloadType<T extends BaseStoreOptions<T>, Key, U = ExtractStoreMutations<T>> = {
  [K in keyof U]: K extends Key ? U[K] extends (...args: infer P) => unknown ? P[1] : never : never
}[keyof U]

export interface BaseStoreOptions<S = unknown> {
  state?: S;
  getters?: Record<GetterKeys<S>, Getter<S>>;
  actions?: Record<Type, Action<S>>;
  mutations?: Record<Type, Mutation<S>>;
}

export interface ActionContext<S> {
  dispatch: Dispatch<S>;
  commit: Commit<S>;
  state: S;
}

export type Dispatch<S> = <T extends ActionTypes<S>, U = DispatchPayloadType<S, T>>(type: T, payload?: U) => Promise<S | S[] | void>
export type Commit<S> = <T extends MutationTypes<S>, U = CommitPayloadType<S, T>>(type: T, payload?: U) => void
export type Getter<S> = (state: S) => unknown
export type Action<S> = (context: ActionContext<S>, payload?: unknown) => Promise<S>
export type Mutation<S> = (state: S, payload?: unknown) => unknown 



export class Store<S = BaseStoreOptions> {
  readonly _state: {data: UnwrapRef<BaseStoreOptions<S>>}
  getters: Record<GetterKeys<S> , Getter<S>> = {} as Record<GetterKeys<S> , Getter<S>>
  readonly actions: Map<Type, Action<S>[]> = new Map()
  readonly mutations: Map<Type, Mutation<S>[]> = new Map()
  constructor(store: BaseStoreOptions<S>) {
    this._state = reactive({
      data: store
    })
    this.registerActions(store.actions)
    this.registerMutations(store.mutations)
    this.registerGetter(store)
  }
  install(app: App) {
    app.provide('storeKey', this)
  }
  get state(): S {
    return this._state.data as S
  }
  dispatch: Dispatch<S> = (type, payload) => {
    const actions = this.actions.get(type)
    if(!actions) {
      console.log(`${type} action no existent`)
      return Promise.resolve()
    }
    const actionsResult = actions.map(action => {
      return action({
        dispatch: this.dispatch,
        commit: this.commit,
        state: this.state
      }, payload)
    })
    return new Promise((resolve, reject) => {
      Promise.all(actionsResult).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
  commit: Commit<S> = (type, payload) => {
    const mutations = this.mutations.get(String(type))
    if(!mutations) {
      console.log(`${type} mutation no existent`)
      return 
    }
    mutations.forEach(mutation => {
      mutation(this.state, payload)
    })
  }
  registerActions(actions: Record<Type, Action<S>>) {
    Object.keys(actions).forEach(key => {
      let actionList: Action<S>[]
      if(this.actions.has(key)) {
        actionList = this.actions.get(key)
        actionList.push(actions[key])
      } else {
        actionList = [actions[key]]
      }
      this.actions.set(key, actionList)
    })
  }
  registerMutations(mutations: Record<Type, Mutation<S>>) {
    Object.keys(mutations).forEach(key => {
      let mutationList: Mutation<S>[]
      if(this.actions.has(key)) {
        mutationList = this.mutations.get(key)
        mutationList.push(mutations[key])
      } else {
        mutationList = [mutations[key]]
      }
      this.mutations.set(key, mutationList)
    })
  }
  registerGetter(store: BaseStoreOptions<S>) {
    this.getters = new Proxy(store.getters, {
      get(target, getterName, receive) {
        const getter = Reflect.get(target, getterName, receive)
        const computedCache = computed(() => getter(store.state))
        return computedCache.value
      }
    })
  }
}