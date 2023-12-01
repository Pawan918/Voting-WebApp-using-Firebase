import { collection,addDoc, doc, updateDoc, deleteDoc, onSnapshot,setDoc,increment } from "firebase/firestore";
import { useDbStore } from "./db";
import { useAuthStore } from "./auth";
export const useSurveyStore = defineStore("survey",{
    state : ()=>({
        surveyData : [],
    }),
    actions : {
        async getSurveyData(){
            try{
                const database = useDbStore();
                 onSnapshot(collection(database.db,"survey"),doc =>{
                    this.surveyData = [];
                    doc.forEach((data)=>{
                       this.surveyData.push({
                           id: data.id,
                           ...data.data()
                       })
                   })
                })
                    return {
                        status : 200,
                        message : "data Successfully fetched"
                    }
            }catch(error){
                const errorCode = error.code;
                const errorMessage = error.message;

                return {
                    status : errorCode,
                    errorMessage
                }
            }       
        },
        async addSurveyData(data){
            try{
                const database = useDbStore();
                const auth = useAuthStore();
                const docRef = await addDoc(collection(database.db,"survey"),{
                    question : data.question,
                    options : data.option
                 });
                 const countRef = doc(database.db,"users",auth.authDetails.uid)
                 await setDoc(countRef,{
                     count : increment(1)
                     },{merge:true})
                 if(docRef){
                    console.log(docRef.id);
                    return {
                        status : 200,
                        message : "data Successfully Added"
                    }
                 }
            }catch(error){
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                return {
                    status : errorCode,
                    errorMessage
                }
            }
        },
        async updateSurveyData(data){
            try{
                const database = useDbStore();
                const docRef =  doc(database.db,"survey",data.id);
                await updateDoc(docRef,{
                    question :  data.question,
                    options : data.option
                })
                    return {
                        status : 200,
                        message : "data Successfully Added"
                    }
            }catch(error){
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                return {
                    status : errorCode,
                    errorMessage
                }
            }
        },
        async deleteSurveyData(id){
            try{
                const database = useDbStore();
                await deleteDoc(doc(database.db, 'survey',id));
                    return {
                        status : 200,
                        message : "data Successfully Added"
                    }
            }catch(error){
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                return {
                    status : errorCode,
                    errorMessage
                }
            }
        }
    }
})