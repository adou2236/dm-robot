import { createStore, useStore as baseUseStore, Store } from 'vuex';
import user from './modules/user'
import config from './modules/config'
import message from './modules/message'



const modules = {
    user,
    config,
    message
}


export const store = createStore({ modules });
export const key = Symbol();


export function useStore() {
    return baseUseStore(key);
}
