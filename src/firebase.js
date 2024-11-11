// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCVQFv2z3liuGBpP8ZfQ8H7_xOipMtQhyk",
    authDomain: "siena-playbill-admin.firebaseapp.com",
    projectId: "siena-playbill-admin",
    storageBucket: "siena-playbill-admin.firebasestorage.app",
    messagingSenderId: "524720749322",
    appId: "1:524720749322:web:88e4fdec7ec78a8cae18f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Authentication
const auth = getAuth(app);

// Initialize Storage
const storage = getStorage(app);

export { db, auth, storage };