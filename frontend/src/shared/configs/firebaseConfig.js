import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const app = initializeApp ({
  apiKey: "AIzaSyCFTLfIfQN7NVU0o5tdU67VLb1lbmBmPNQ",
  authDomain: "t-collection-7facb.firebaseapp.com",
  projectId: "t-collection-7facb",
  storageBucket: "t-collection-7facb.appspot.com",
  messagingSenderId: "576017774873",
  appId: "1:576017774873:web:c482ba51d6bcd414692d88",
  measurementId: "G-2YDJ34V9B1"
});

const storage = getStorage(app);
export {storage};