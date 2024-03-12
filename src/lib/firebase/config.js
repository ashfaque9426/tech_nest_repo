// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: process.env.firebase_apiKey,
//     authDomain: process.env.firebase_authDomain,
//     projectId: process.env.firebase_projectId,
//     storageBucket: process.env.firebase_storageBucket,
//     messagingSenderId: process.env.firebase_messagingSenderId,
//     appId: process.env.firebase_appId
// };

const firebaseConfig = {
    apiKey: "AIzaSyAlLjM5BkNrzlzSl2miiHgLMWTQw0OHsy0",
    authDomain: "tech-nest-auth.firebaseapp.com",
    projectId: "tech-nest-auth",
    storageBucket: "tech-nest-auth.appspot.com",
    messagingSenderId: "259278685967",
    appId: "1:259278685967:web:d47f88798450ead2a9207a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;