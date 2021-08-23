import app from "firebase/app";
import config from "./config.json";

//Base de datos
import "firebase/firestore";

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(config);
    }

    this.db = app.firestore();
  }
}

const firebase = new Firebase();

export default firebase;
