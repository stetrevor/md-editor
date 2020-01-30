import Vue from "vue";
import Vuex from "vuex";

import api from "../api";

Vue.use(Vuex);

const GET_ALL_FILES = "GET_ALL_FILES";
const ADD_FILE = "ADD_FILE";
const SET_EDITING_FILE = "SET_EDITING_FILE";
const SAVE_FILE = "SAVE_FILE";

export default new Vuex.Store({
  state: {
    files: [],
    newFile: null,
    editingFile: null
  },

  mutations: {
    [GET_ALL_FILES](state, { files }) {
      state.files = files;
    },

    [ADD_FILE](state, { file }) {
      state.newFile = file;
    },

    [SET_EDITING_FILE](state, { file }) {
      state.editingFile = file;
    },

    [SAVE_FILE](state, { file }) {
      const index = state.files.findIndex(f => f.id === file.id);
      state.files.splice(index, 1, file);
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
    },

    setEditingFile({ commit }, { file }) {
      commit(SET_EDITING_FILE, { file });
    },

    async saveFile({ commit }, { file }) {
      await api.updateFile(file);
      commit(SAVE_FILE, { file });
    }
  },
  modules: {}
});
