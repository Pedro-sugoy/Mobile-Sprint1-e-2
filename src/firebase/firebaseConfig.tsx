import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfFjNcUUqUoMprcbf8VRZ9C-SoXFYH__4",
  authDomain: "challengemobile-a9706.firebaseapp.com",
  projectId: "challengemobile-a9706",
  storageBucket: "challengemobile-a9706.appspot.com",
  messagingSenderId: "1067982850864",
  appId: "1:1067982850864:web:0cf20466e4b054579fd6f5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export default app;
