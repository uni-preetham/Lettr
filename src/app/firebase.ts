// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// const firebaseConfig = {
//   apiKey: "AIzaSyCZk6RUE-sPQy0XAX9ZM4Q6kVCDhTdE9Yc",
//   authDomain: "loveletter-d6fb8.firebaseapp.com",
//   projectId: "loveletter-d6fb8",
//   storageBucket: "loveletter-d6fb8.firebasestorage.app",
//   messagingSenderId: "762489962298",
//   appId: "1:762489962298:web:d8d2e6086f6eee03729a03"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth}