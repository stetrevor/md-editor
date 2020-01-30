import Vue from "vue";
import Vuex from "vuex";

import api from "../api";

Vue.use(Vuex);

const GET_ALL_FILES = "GET_ALL_FILES";

export default new Vuex.Store({
  state: {
    files: []
  },
  mutations: {
    [GET_ALL_FILES](state, { files }) {
      state.files = files;
    }
  },
  actions: {
    async getAllFiles({ commit }) {
      const files = await api.getAllFiles();
      commit(GET_ALL_FILES, { files });
    }
  },
  modules: {}
});
