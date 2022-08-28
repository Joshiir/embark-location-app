import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFysp8eH-8n-LYniVShEkpU8pb0GmPdyU",
  authDomain: "embark-project.firebaseapp.com",
  projectId: "embark-project",
  storageBucket: "embark-project.appspot.com",
  messagingSenderId: "112140955167",
  appId: "1:112140955167:web:644b8d29a8d82697276f2a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Checks for authentication with Firebase
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

/**
 * Get the current authenticated User ID
 * @returns Authenticated User ID
 */
export const getUserId = () => {
    return auth.currentUser.uid
}
