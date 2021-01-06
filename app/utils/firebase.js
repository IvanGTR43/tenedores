import firebase from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyDX7kMuWl5BUKVAHecuavyWty27CDDM1MY",
    authDomain: "tenedores-45f77.firebaseapp.com",
    projectId: "tenedores-45f77",
    storageBucket: "tenedores-45f77.appspot.com",
    messagingSenderId: "728970738456",
    appId: "1:728970738456:web:0c89ff8dbaa851d271bc6d"
}

export const firebaseApp = firebase.initializeApp(firebaseConfig);