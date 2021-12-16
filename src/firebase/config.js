import { initializeApp } from "firebase/app";
import {getFirestore ,setDoc,doc} from 'firebase/firestore'
import { signOut ,getAuth, onAuthStateChanged ,createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "firebase/auth";
import { getStorage } from "firebase/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCF69sy-Hz3jfFlkQKZp-zF08n5BQ_CSP4",
    authDomain: "friends-react.firebaseapp.com",
    projectId: "friends-react",
    storageBucket: "friends-react.appspot.com",
    messagingSenderId: "950202166515",
    appId: "1:950202166515:web:48343d89b9a283f4875b86",
    measurementId: "${config.measurementId}"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const stateChange = onAuthStateChanged;
  const newUser= createUserWithEmailAndPassword
  const signIn= signInWithEmailAndPassword
  const storage =getStorage(app)
  const logOut=signOut
  export {firebaseConfig,auth,db,storage,stateChange,newUser ,setDoc,doc,signIn,logOut}  