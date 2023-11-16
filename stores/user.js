
import { defineStore } from "pinia";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { useDbStore } from "./db";
import { doc, setDoc, getDoc } from "firebase/firestore";
export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
    userDetails: null,
    isAdmin : false, 
  }),
  actions: {
    async logIn(email, password) {
      try {
        const database = useDbStore()
        const credentails = await signInWithEmailAndPassword(getAuth(), email, password);
        this.isLoggedIn = true;
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
    async signIn(email, password,isAdmin) {
      try {
        const database = useDbStore()
        const credentails = await createUserWithEmailAndPassword(getAuth(), email, password);
        this.isLoggedIn = true;
        this.userDetails = credentails.user;
        this.isAdmin = isAdmin === "admin" ? true : false;
        const data = await setDoc(doc(database.db,"users",credentails.user.uid),{
          email : this.userDetails.email,
          isAdmin : isAdmin === "admin" ? true : false,
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
        const credential = GoogleAuthProvider.credentialFromResult(userData);
        this.isLoggedIn = true
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
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        return {
          status : errorCode,
          message : errorMessage
        }
      }
    },
    async signOutUser(){
      try{
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
