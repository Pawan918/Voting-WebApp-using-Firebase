import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";
export default defineNuxtPlugin(async nuxtApp =>{
    const firebaseConfig =  {
        apiKey: "AIzaSyBIQ53Mo4N7k0hbW1Ej7djsokrvb1fJov4",
        authDomain: "shopping-app-86a56.firebaseapp.com",
        projectId: "shopping-app-86a56",
        storageBucket: "shopping-app-86a56.appspot.com",
        messagingSenderId: "89794396309",
        appId: "1:89794396309:web:315aef742a10b88537db9c",
        measurementId: "G-3JNP4TE4C3"
        // there could be other properties depending on the project
      };
      const app = initializeApp(firebaseConfig);

      const db = getFirestore(app);

      return {
        provide : {
          db,
        }
      }
})