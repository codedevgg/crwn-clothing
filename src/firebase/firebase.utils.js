import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAlnLiVOT9TvLyOjHItzoiY2Fze6pbQGEM",
  authDomain: "crwn-db-1b693.firebaseapp.com",
  databaseURL: "https://crwn-db-1b693.firebaseio.com",
  projectId: "crwn-db-1b693",
  storageBucket: "crwn-db-1b693.appspot.com",
  messagingSenderId: "592852667857",
  appId: "1:592852667857:web:f694904c9a1872525f64f0",
  measurementId: "G-GBP9374HN0"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
