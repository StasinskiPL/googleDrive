import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: "drive-76289.appspot.com",
  messagingSenderId: "178057932351",
  appId: process.env.REACT_APP_FIREBASE_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};


const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const storage = app.storage();
const firestore = app.firestore()

export const database = {
  folders: firestore.collection("folders"),
  files: firestore.collection("files"),
  getTimeStampe: firebase.firestore.FieldValue.serverTimestamp,
}


export default app;
