import Vue from "vue";
import Vuex from "vuex";

import api from "../api";

Vue.use(Vuex);

const GET_ALL_FILES = "GET_ALL_FILES";
const ADD_FILE = "ADD_FILE";

export default new Vuex.Store({
  state: {
    files: [],
    newFile: null
  },

  mutations: {
    [GET_ALL_FILES](state, { files }) {
      state.files = files;
    },

    [ADD_FILE](state, { file }) {
      state.newFile = file;
    }
  },

  actions: {
    async getAllFiles({ commit }) {
      const files = await api.getAllFiles();
      commit(GET_ALL_FILES, { files });
    },

    async addFile({ commit }) {
      const file = await api.addFile();
      commit(ADD_FILE, { file });
    }
  },
  modules: {}
});
