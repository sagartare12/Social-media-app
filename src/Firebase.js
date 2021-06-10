import  firebase from 'firebase'


const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAjBEOmPqIl9s0-Wb-9VPzOGAXdi3or26w",
  authDomain: "instagram-clone-fa83c.firebaseapp.com",
  projectId: "instagram-clone-fa83c",
  storageBucket: "instagram-clone-fa83c.appspot.com",
  messagingSenderId: "141533907382",
  appId: "1:141533907382:web:520abbf12e12ee3b7e1917",
  measurementId: "G-JS1Z69SCRE"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db , auth , storage };