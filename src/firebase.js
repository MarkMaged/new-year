// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBXgCFLjPsuP5wBOStRR45FROgx8eIsyzc",
//   authDomain: "new-year-48e80.firebaseapp.com",
//   projectId: "new-year-48e80",
//   storageBucket: "new-year-48e80.firebasestorage.app",
//   messagingSenderId: "696389614222",
//   appId: "1:696389614222:web:25979f99088053a15e27df",
//   measurementId: "G-38493TV188"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXgCFLjPsuP5wBOStRR45FROgx8eIsyzc",
  authDomain: "new-year-48e80.firebaseapp.com",
  projectId: "new-year-48e80",
  storageBucket: "new-year-48e80.firebasestorage.app",
  messagingSenderId: "696389614222",
  appId: "1:696389614222:web:25979f99088053a15e27df",
  measurementId: "G-38493TV188"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

