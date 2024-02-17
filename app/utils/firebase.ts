import { initializeApp,getApp,getApps } from "firebase/app";
import {User, getAuth, onAuthStateChanged} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDki51Erkg4m2df1SSEsD3z0cBkBUH7NxE",
    authDomain: "fish-tank-d82ad.firebaseapp.com",
    projectId: "fish-tank-d82ad",
    storageBucket: "fish-tank-d82ad.appspot.com",
    messagingSenderId: "408002979663",
    appId: "1:408002979663:web:8a52e659d54f81767bc73a"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const getUser = (callback: (user:User | null) => void) => {
  const unsubscribe = onAuthStateChanged(auth, (userData) => {
    callback(userData)
  })
  return unsubscribe;
}


export {app,auth,db,getUser}