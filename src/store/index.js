import Vue from 'vue'
import Vuex from 'vuex'
import services from '@/services'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        users: [],
        filter: "",
    },
    getters: {
        users: state => state.users,
        filter: state => state.filter,
    },
    mutations: {
        addUsers: (state, users) => {
            users.forEach(user => {
                state.users.push(user)
            });
        },

        setFilter: (state, filter) => {
            state.filter = filter
        }
    },
    actions: {
        getUsers: async({ commit }) => {
            const response = await services.getUser();
            commit('addUsers', response);
        },

        setFilter: async({ commit }, search) => {
            commit('setFilter', search);
        }
    },
    modules: {}
})