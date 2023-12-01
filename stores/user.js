
import { defineStore } from "pinia";
import { doc, onSnapshot } from "firebase/firestore";
import { useDbStore } from "./db";
import { useAuthStore } from "./auth";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    userDetails : {},
    isLoggedIn : false,
  }),
  actions: {
    async getUserDetails(){
      try{
        const database = useDbStore()
        const auth = useAuthStore();
         onSnapshot(doc(database.db,"users",auth.authDetails.uid),
          { includeMetadataChanges: true },
         (doc)=>{
          this.userDetails = doc.data();
        },(error)=>{
          console.log(error);
        })
        return {
          status: 200,
          message: "Successfully Logged In",
        };
      }catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        return {
          status: errorCode,
          message: errorMessage,
        };
      }
    }
}
});
