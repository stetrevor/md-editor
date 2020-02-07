import { openDB } from "idb";

const dbPromise = openDB("md-editor", 2, {
  upgrade(db, oldVersion) {
    switch (oldVersion) {
      case 0:
        // eslint-disable-next-line no-case-declarations
        const store = db.createObjectStore("articles", {
          keyPath: "id",
          autoIncrement: true
        });
        store.createIndex("updated", "updated");
      // eslint-disable-next-line no-fallthrough
      case 1:
        db.createObjectStore("settings", {
          keyPath: "name"
        });
      // eslint-disable-next-line no-fallthrough
      default:
        break;
    }
  }
});

export default {
  async getAllFiles() {
    return (await dbPromise).getAllFromIndex("articles", "updated");
  },

  async getFileById(id) {
    return await (await dbPromise).get("articles", id);
  },

  async addFile() {
    const newArticle = {
      title: "Untitled",
      text: "",
      created: new Date(),
      updated: new Date()
    };

    const id = await (await dbPromise).add("articles", newArticle);
    return Object.assign({}, newArticle, { id });
  },

  async updateFile(file) {
    return (await dbPromise).put("articles", file);
  },

  async deleteFile(file) {
    return (await dbPromise).delete("articles", file.id);
  },

  async saveSettings(settings) {
    const tx = (await dbPromise).transaction("settings", "readwrite");
    for (const setting of settings) {
      tx.store.put(setting);
    }
    return await tx.done;
  },

  async getSettings() {
    return (await dbPromise).getAll("settings");
  }
};
