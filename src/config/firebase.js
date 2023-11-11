
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAA6bN9B1Y1KmXlnmODPXEZJ0XEKY0H-TA",
  authDomain: "document-crud-494fe.firebaseapp.com",
  projectId: "document-crud-494fe",
  storageBucket: "document-crud-494fe.appspot.com",
  messagingSenderId: "289644198312",
  appId: "1:289644198312:web:5a5b42c29e039f37e4859d",
  measurementId: "G-0475JQ8MWF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);