
import { defineStore } from "pinia";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { useDbStore } from "./db";
import { useUserStore } from './user.js'
import { doc, setDoc, getDoc } from "firebase/firestore";
export const useAuthStore = defineStore("authStore", {
  state: () => ({
    authDetails: null,
  }),
  actions: {
    async logIn(email, password) {
      try {
        const database = useDbStore()
        const user = useUserStore();
        const credentails = await signInWithEmailAndPassword(getAuth(), email, password);
        user.isLoggedIn = true;
        this.userDetails = credentails.user;
        const ref =  doc(database.db,"users",credentails.user.uid)
        const docSnap = await getDoc(ref)
        if(docSnap.exists()){
          const data = docSnap.data();
          this.isAdmin = data.isAdmin
        }
        return {
          status: 200,
          message: "Successfully Logged In",
        };
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        return {
          status: errorCode,
          message: errorMessage,
        };
      }
    },
    async signIn(email, password,isAdmin,name) {
      try {
        const database = useDbStore()
        const user = useUserStore();
        const credentails = await createUserWithEmailAndPassword(getAuth(), email, password);
        user.isLoggedIn = true;
        this.userDetails = credentails.user;
        this.isAdmin = isAdmin === "admin" ? true : false;
        await setDoc(doc(database.db,"users",credentails.user.uid),{
          email : this.userDetails.email,
          isAdmin : isAdmin === "admin" ? true : false,
          name,
          count : 0,
        })
        return {
          status: 200,
          message: "Successfully Logged In",
        };
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        return {
          status: errorCode,
          message: errorMessage,
        };
      }
    },
    async googleSigin() {
      try {
        const provider = new GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
        const userData = await signInWithPopup(getAuth(), provider);
        GoogleAuthProvider.credentialFromResult(userData);
        user.isLoggedIn = true
        this.userDetails = userData.user;
        // console.log(credential);
        return {
          status : 200,
          message : "successfully logged In with Google"
        }
      } catch (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        error.customData.email;
        GoogleAuthProvider.credentialFromError(error);
        return {
          status : errorCode,
          message : errorMessage
        }
      }
    },
    async signOutUser(){
      try{
        const user = useUserStore();
        this.authDetails = null
        user.isLoggedIn = false;
        user.userDetails = null;
        await signOut(getAuth());
        return {
          status : 200,
          message : "successfully signedOut"
        }
      }catch(error) {
        return {
          status : error.message,
          message : "signOut failed"
        }
      };
    }
  },
});
