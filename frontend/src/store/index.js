import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        columns: [],
        showGuestModal: false,
        showTableModal: false
    },
    getters: {
        getTableNames: (state) => {
            return state.columns.map(item => { return {name: item.name, id: item._id}})
        },
    },
    mutations: {
        SET_TABLES(state, data) {
            state.columns = data
        },
        ADD_TABLE(state, data){
            state.columns = data
        },

        SET_GUEST_MODAL_VISIBILITY(state, data){
            state.showGuestModal = data
        },

        SET_TABLE_MODAL_VISIBILITY(state, data) {
            state.showTableModal = data
        }
    },
    actions: {
        async addTable({ commit }, payload){
            await axios.post(`${process.env.VUE_APP_API_URL}/table`, {'name': payload })
            const fetchAll = await axios.get(`${process.env.VUE_APP_API_URL}/table/all/json`)
            commit('SET_TABLES', fetchAll.data)
        },
        
        async fetchTables({ commit }) {
            const result = await axios.get(`${process.env.VUE_APP_API_URL}/table/all/json`)
            commit('SET_TABLES', result.data)
        },
        
        async addGuest({ commit }, payload) {
            await axios.post(`${process.env.VUE_APP_API_URL}/guest`, payload)
            const fetchAll = await axios.get(`${process.env.VUE_APP_API_URL}/table/all/json`)
            commit('SET_TABLES', fetchAll.data)
        },
        
        async removeGuest({ commit }, payload) {
            await axios.delete(`${process.env.VUE_APP_API_URL}/guest/${payload.id}`)
            const fetchAll = await axios.get(`${process.env.VUE_APP_API_URL}/table/all/json`)
            commit('SET_TABLES', fetchAll.data)
        },
    
        async guestChangeTable({ commit, state }, payload){
            await axios.post(`${process.env.VUE_APP_API_URL}/guest/${payload.guestId}/change-table`, {table: payload.toTableId})
        },

        guestModalVisible({ commit }, payload = true){
            commit('SET_GUEST_MODAL_VISIBILITY', payload)

        },

        tableModalVisible({ commit }, payload = true){
            commit('SET_TABLE_MODAL_VISIBILITY', payload)

        },

    },
    modules: {
    }
})