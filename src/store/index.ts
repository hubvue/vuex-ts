import { createStore } from '../../lib'
import {storeOptions} from './global-module'

const vuexStore = createStore(storeOptions)
export {
  vuexStore
}

