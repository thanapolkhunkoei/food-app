import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBt-0sOFz3ml3uQs3XL3vtjxc1Cx6TB_aM",
  authDomain: "foodapp-9f7cb.firebaseapp.com",
  databaseURL:
    "https://foodapp-9f7cb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "foodapp-9f7cb",
  storageBucket: "foodapp-9f7cb.appspot.com",
  messagingSenderId: "850115816101",
  appId: "1:850115816101:web:e400be461e8c46d67cbb4c",
};
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
