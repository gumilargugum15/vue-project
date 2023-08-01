// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKiEtahtqj5pmVbgjCge2Gewf2oZ1lmI0",
  authDomain: "vue-project-cc572.firebaseapp.com",
  projectId: "vue-project-cc572",
  storageBucket: "vue-project-cc572.appspot.com",
  messagingSenderId: "785189815054",
  appId: "1:785189815054:web:2e93d35be82e873e550d5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//init firestore service
const db = getFirestore();
export default db;