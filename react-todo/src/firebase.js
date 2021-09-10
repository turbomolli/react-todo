
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { getFirestore, collection, doc, setDoc, getDoc } from "firebase/firestore";
import { createContext, useContext, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUjKZAS6LB6sc1oAoH38L0zzL1Zz-cj2A",
  authDomain: "careventron.firebaseapp.com",
  databaseURL: "https://careventron.firebaseio.com",
  projectId: "careventron",
  storageBucket: "careventron.appspot.com",
  messagingSenderId: "759885170441",
  appId: "1:759885170441:web:04d62aa11976126ff975d8",
  measurementId: "G-S92G5SMHK4"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export function loginWithGoogle2() {
  console.log('click');
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider).then(res => {
    console.log(res);
    const user = res.user;
  }, err => {
    console.log(err);
  });
}

export const loginWithGoogle = async () => {
  const auth = getAuth();
  const db = getFirestore();
  const provider = new GoogleAuthProvider();

  try {
    const res = await signInWithPopup(auth, provider);
    const user = res.user;
    const docRef = doc(db, "users3", user.uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data: ", docSnap.data());
    } else {
      console.log('new user');
      const userRef = collection(db, "users3");
      await setDoc(doc(userRef, user.uid), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
      });
    }

  } catch (err) {
    console.log(err);
  }
} 

export function logout() {
  const auth = getAuth();
  auth.signOut();
}
