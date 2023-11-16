import { useDbStore } from "./db";
import { useUserStore } from "./user";

import { arrayUnion, doc, setDoc,updateDoc,increment, query, collection, where, getDoc } from "firebase/firestore"; 

export const useUserSurveyStore = defineStore("userSurvey",{
    actions : {
        async addSurveyUser(id,option){
            try{    
                const database = useDbStore();
                const user = useUserStore();
                const docRef = doc(database.db,"survey",id)
                    await setDoc(docRef,{
                        voted : arrayUnion({
                            option : option,
                            userId : user.userDetails.uid
                        }),
                        count : increment(1)
                    },{merge : true})
                const countRef = doc(database.db,"users",user.userDetails.uid)
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