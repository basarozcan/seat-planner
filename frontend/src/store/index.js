import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    columns: [],
    showGuestModal: false,
    showGuestEditModal: false,
    showTableModal: false,
    showBoardModal: false,
    isLoggedIn: false,
    user: [],
    boards: [],
    selectedBoard: [],
    selectedGuest: [],
    isBoardsLoaded: false,
  },
  getters: {
    getTableNames: (state) => {
      return state.columns.map((item) => {
        return { name: item.name, id: item._id };
      });
    },

    getBoards(state) {
      return state.boards;
    },

    getTables(state) {
      return state.columns;
    },

    isOwnerOfBoard(state) {
      return state.selectedBoard.owner_id.some((item) => {
        return item._id === state.user._id;
      });
    },

    isBoardsLoaded(state) {
      return state.isBoardsLoaded;
    },

    isLoggedIn(state) {
      return state.isLoggedIn;
    },

    isSelectedBoardLoaded(state) {
      // check if selected (id entered) board loaded
      return state.selectedBoard.hasOwnProperty("_id");
    },
  },
  mutations: {
    SET_BOARDS(state, data) {
      state.boards = data;
    },

    SET_TABLES(state, data) {
      state.columns = data;
    },

    ADD_TABLE(state, data) {
      state.columns = data;
    },

    SET_GUEST_MODAL_VISIBILITY(state, data) {
      state.showGuestModal = data;
    },

    SET_GUEST_EDIT_MODAL_VISIBILITY(state, data) {
      state.showGuestEditModal = data;
    },

    SET_TABLE_MODAL_VISIBILITY(state, data) {
      state.showTableModal = data;
    },

    SET_BOARD_MODAL_VISIBILITY(state, data) {
      state.showBoardModal = data;
    },

    SET_USER_INFORMATION(state, data) {
      state.user = data;
    },

    SET_USER_LOGGEDIN(state, data) {
      state.isLoggedIn = data;
    },

    SET_BOARDS_LOADED(state, data) {
      state.isBoardsLoaded = data;
    },

    SET_SELECTED_BOARD(state, data) {
      state.selectedBoard = data;
    },

    SET_SELECTED_GUEST(state, data) {
      state.selectedGuest = data;
    },
  },
  actions: {
    async addBoard({ commit, dispatch }, payload) {
      await axios.post(`${process.env.VUE_APP_API_URL}/board`, {
        name: payload.name,
        owner_id: payload.owner_id,
      });
      dispatch("fetchBoards");
    },

    async addTable({ commit, dispatch }, payload) {
      await axios.post(`${process.env.VUE_APP_API_URL}/table`, {
        name: payload.name,
        board: payload.board,
      });
      dispatch("fetchTables");
    },

    async addGuest({ commit, dispatch }, payload) {
      await axios.post(`${process.env.VUE_APP_API_URL}/guest`, payload);
      dispatch("fetchTables");
    },

    async editGuest({ commit, dispatch }, payload) {
      console.log("edit-guest");
      await axios
        .patch(`${process.env.VUE_APP_API_URL}/guest/edit`, payload)
        .then((result) => {
          console.log(result);
          dispatch("fetchTables");
        });
    },

    async fetchTables({ commit, state }) {
      const result = await axios.get(
        `${process.env.VUE_APP_API_URL}/board/${
          state.selectedBoard._id
        }/get-tables/json`
      );
      // console.log("boarding => ", result.data);
      commit("SET_TABLES", result.data);
    },

    async removeGuest({ commit }, payload) {
      await axios.delete(`${process.env.VUE_APP_API_URL}/guest/${payload.id}`);
      const fetchAll = await axios.get(
        `${process.env.VUE_APP_API_URL}/table/all/json`
      );
      commit("SET_TABLES", fetchAll.data);
    },

    async guestChangeTable({ commit, state }, payload) {
      await axios.post(
        `${process.env.VUE_APP_API_URL}/guest/${payload.guestId}/change-table`,
        { table: payload.toTableId }
      );
    },

    async fetchUser({ commit }) {
      await axios
        .get(`${process.env.VUE_APP_API_URL}/auth/check`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((result) => {
          const user = result.data.user || null;
          if (user !== null) {
            // console.log('user logged in');
            commit("SET_USER_INFORMATION", user);
            commit("SET_USER_LOGGEDIN", true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async fetchBoards({ commit, state }) {
      const result = await axios.get(
        `${process.env.VUE_APP_API_URL}/board/all/${state.user._id}/json`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const boards = result.data;
      commit("SET_BOARDS", boards);
      commit("SET_BOARDS_LOADED", true);
    },

    async fetchBoardData({ commit, dispatch }, payload) {
      await axios
        .get(`${process.env.VUE_APP_API_URL}/board/${payload.id}/json`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          // console.log("BOARD-DATA =>", res.data.owner_id[0]._id);
          commit("SET_SELECTED_BOARD", res.data);
          dispatch("fetchTables");
        })
        .catch((err) => {
          console.log("error =>", err);
          commit("SET_SELECTED_BOARD", []);
        });

      // const boardData = result.data
    },

    async logoutUser({ commit }) {
      const result = await axios.get(
        `${process.env.VUE_APP_API_URL}/auth/logout`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // console.log(result.status);
      if (result.status === 200) {
        commit("SET_USER_LOGGEDIN", false);
        commit("SET_USER_INFORMATION", []);
      }
    },

    selectGuest({ commit }, payload) {
      commit("SET_SELECTED_GUEST", payload);
    },

    guestModalVisible({ commit }, payload = true) {
      commit("SET_GUEST_MODAL_VISIBILITY", payload);
    },

    guestEditModalVisible({ commit }, payload = true) {
      commit("SET_GUEST_EDIT_MODAL_VISIBILITY", payload);
    },

    tableModalVisible({ commit }, payload = true) {
      commit("SET_TABLE_MODAL_VISIBILITY", payload);
    },

    boardModalVisible({ commit }, payload = true) {
      commit("SET_BOARD_MODAL_VISIBILITY", payload);
    },
  },
  modules: {},
});
