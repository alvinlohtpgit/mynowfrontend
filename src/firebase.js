import { firebase } from "@firebase/app";
import "@firebase/firestore";

var firebaseApp;

if(firebase.apps.length === 0) {
    firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyCTXOg7TV8XoUYvrFDY9bJ64uFv-19wITw",
        authDomain: "mynowpage.firebaseapp.com",
        databaseURL: "https://mynowpage.firebaseio.com",
        projectId: "mynowpage",
        storageBucket: "mynowpage.appspot.com",
        messagingSenderId: "753481217839"
    });
}

export const db = firebaseApp.firestore();