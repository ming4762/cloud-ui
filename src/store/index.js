import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import { Config } from '@/store/modules/Config';
import System from '@/store/modules/System';
Vue.use(Vuex);
var store = new Vuex.Store({
    modules: {
        user: user,
        Config: Config,
        System: System
    }
});
export default store;
//# sourceMappingURL=index.js.map