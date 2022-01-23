import React, { createContext } from "react";

import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import config from "../config/firebase";

const FirebaseContext = createContext();

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.firestore();

const Firebase = {
  getCurrentUser: () => {
    return firebase.auth().currentUser;
  },

  createUser: async (user) => {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);
      const uid = await Firebase.getCurrentUser().uid;

      db.collection("users").doc(uid).set({
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        city: user.city,
        uid: uid,
      });

      delete user.password;

      return { ...user, uid };
    } catch (error) {
      console.log("Error in @createUser ", error.message);
    }
  },

  getUserInfo: async (uid) => {
    try {
      const user = await db.collection("users").doc(uid).get();
      console.log("uid: ", uid);
      console.log("data: ", user.data());
      if (user.exists) {
        return user.data();
      }
    } catch (error) {
      console.log("Error in @getUserInfo ", error);
    }
  },

  getAdminInfo: async (uid) => {
    try {
      const admin = await db.collection("admins").doc(uid).get();
      console.log("uid admin: ", uid);
      console.log("data admin: ", admin.data());
      if (admin.exists) {
        return true;
      }
    } catch (error) {
      console.log("Error in @getadminInfo ", error);
    }
  },

  uploadPhotoAsync: async (uri) => {
    const uid = firebase.auth().currentUser.uid;

    const path = `photos/${uid}/${Date.now()}.jpg`;

    return new Promise(async (res, rej) => {
      const respone = await fetch(uri);
      const file = await respone.blob();

      let upload = firebase.storage().ref(path).put(file);

      upload.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        }
      );
    });
  },

  logOut: async () => {
    try {
      await firebase.auth().signOut();
      return true;
    } catch (error) {
      console.log("Error in logOut ", error);
    }
    return false;
  },

  signIn: async (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },
};

const FirebaseProvider = (props) => {
  return (
    <FirebaseContext.Provider value={Firebase}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext, FirebaseProvider };
