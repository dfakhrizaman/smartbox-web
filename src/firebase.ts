import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD9fnTR1cc4wx_uBAn7pGLAzmQj3C8mujs",
  authDomain: "smartbox-home.firebaseapp.com",
  databaseURL:
    "https://smartbox-home-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smartbox-home",
  storageBucket: "smartbox-home.appspot.com",
  messagingSenderId: "444613284401",
  appId: "1:444613284401:web:4a95e5583a6a551451fb10",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
