import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBzK2lTiIyZQC5w6w4ffUpRtncpLuYhgmU",
  authDomain: "quotation-app-435f7.firebaseapp.com",
  projectId: "quotation-app-435f7",
  storageBucket: "quotation-app-435f7.appspot.com",
  messagingSenderId: "182176984048",
  appId: "1:182176984048:web:959b261d2b9bfa9b198b35",
  measurementId: "G-PWYZNH4BJ2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
