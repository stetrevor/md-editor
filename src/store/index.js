import Vue from "vue";
import Vuex from "vuex";

import api from "../api";

Vue.use(Vuex);

const GET_ALL_FILES = "GET_ALL_FILES";
const ADD_FILE = "ADD_FILE";
const SET_EDITING_FILE = "SET_EDITING_FILE";
const SAVE_FILE = "SAVE_FILE";
const DELETE_FILE = "DELETE_FILE";
const UPDATE_SETTINGS = "UPDATE_SETTINGS";

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
    },

    [DELETE_FILE](state, { file }) {
      const index = state.files.findIndex(f => f.id === file.id);
      state.files.splice(index, 1);
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

    async setEditingFile({ commit, state }, { id }) {
      let file = state.files.find(f => f.id === id);

      if (file === undefined) {
        file = await api.getFileById(id);
        state.files.push(file);
      }
      commit(SET_EDITING_FILE, { file });
    },

    async saveFile({ commit }, { file }) {
      await api.updateFile(file);
      commit(SAVE_FILE, { file });
    },

    async deleteFile({ commit }, { file }) {
      await api.deleteFile(file);
      commit(DELETE_FILE, { file });
    }
  },

  modules: {
    settings: {
      state: {
        settings: {
          fontFamily: "Vesper Libre",
          textLuminancePercentage: 34,
          fontSize: 12,
          lineHeight: 15
        }
      },

      mutations: {
        [UPDATE_SETTINGS](state, settings) {
          for (const setting of settings) {
            Vue.set(state.settings, setting.name, setting[setting.name]);
          }
        }
      },

      actions: {
        async saveSettings({ commit }, settings) {
          await api.saveSettings(settings);
          commit(UPDATE_SETTINGS, settings);
        },

        async getSettings({ commit }) {
          const settings = await api.getSettings();
          commit(UPDATE_SETTINGS, settings);
        }
      }
    }
  }
});
