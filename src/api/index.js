import { openDB } from "idb";

const dbPromise = openDB("md-editor", 1, {
  upgrade(db, oldVersion) {
    switch (oldVersion) {
      case 0:
      // placeholder case
      // eslint-disable-next-line no-fallthrough
      case 1:
        // eslint-disable-next-line no-case-declarations
        const store = db.createObjectStore("articles", {
          keyPath: "id",
          autoIncrement: true
        });
        store.createIndex("updated", "updated");
      // eslint-disable-next-line no-fallthrough
      default:
        break;
    }
  }
});

export default {
  async getAllFiles() {
    return (await dbPromise).getAllFromIndex("articles", "updated");
  }
};
