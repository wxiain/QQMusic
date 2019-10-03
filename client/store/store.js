import actions from './actions';
import getters from './getters';
import mutations  from './mutations';
import state from './state';
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});
