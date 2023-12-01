import { useDbStore } from "./db";
import { useAuthStore } from "./auth";

import { arrayUnion, doc, setDoc,increment} from "firebase/firestore"; 

export const useUserSurveyStore = defineStore("userSurvey",{
    actions : {
        async addSurveyUser(id,option){
            try{    
                const database = useDbStore();
                const auth = useAuthStore();
                const docRef = doc(database.db,"survey",id)
                    await setDoc(docRef,{
                        voted : arrayUnion({
                            option : option,
                            userId : auth.authDetails.uid
                        }),
                        count : increment(1)
                    },{merge : true})
                const countRef = doc(database.db,"users",auth.authDetails.uid)
                    await setDoc(countRef,{
                        count : increment(1)
                        },{merge:true})
                
                return {
                    status : 200,
                    message : "Option successfully added"
                }
            }catch(error){
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                return {
                  status: errorCode,
                  message: errorMessage,
                };
            }
        },
    }
})