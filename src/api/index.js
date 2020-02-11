import { openDB } from "idb";
import firebase from "../firebase";

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
    const uid = firebase.auth().currentUser.uid;
    const query = firebase
      .firestore()
      .collection("articles")
      .where("uid", "==", uid)
      .orderBy("updated", "desc");

    return (await query.get()).docs.map(doc =>
      Object.assign({}, { id: doc.id }, doc.data())
    );
  },

  async getFileById(id) {
    const query = firebase
      .firestore()
      .collection("articles")
      .doc(id);
    const data = await (await query.get()).data();
    return Object.assign({}, { id }, data);
  },

  async addFile() {
    const uid = firebase.auth().currentUser.uid;
    const newArticle = {
      title: "Untitled",
      text: "",
      created: new Date(),
      updated: new Date(),
      uid
    };
    const docRef = await firebase
      .firestore()
      .collection("articles")
      .add(newArticle);
    return Object.assign({}, newArticle, { id: docRef.id });
  },

  async updateFile(file) {
    return await firebase
      .firestore()
      .collection("articles")
      .doc(file.id)
      .set(file);
  },

  async updateFileLocal(file) {
    return (await dbPromise).put("articles", file);
  },

  async deleteFile(file) {
    return await firebase
      .firestore()
      .collection("articles")
      .doc(file.id)
      .delete();
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
