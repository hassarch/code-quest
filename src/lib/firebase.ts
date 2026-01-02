import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzg8WxYBTxSImMwdcHdc0qvOnCt-z1Gi4",
  authDomain: "code-quest-3923a.firebaseapp.com",
  projectId: "code-quest-3923a",
  storageBucket: "code-quest-3923a.firebasestorage.app",
  messagingSenderId: "290748266210",
  appId: "1:290748266210:web:88a1d323175d21327b50bb",
  measurementId: "G-JNQ1PCT7QQ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
