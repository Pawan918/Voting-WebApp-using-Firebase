import { collection, getDocs,addDoc, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { useDbStore } from "./db";
export const useSurveyStore = defineStore("survey",{
    state : ()=>({
        surveyData : [],
    }),
    actions : {
        async getSurveyData(){
            try{
                const database = useDbStore();
                // let isSnap = false
                await onSnapshot(collection(database.db,"survey"),doc =>{
                    this.surveyData = [];
                    // console.log('snapshot called');
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
                const docRef = await addDoc(collection(database.db,"survey"),{
                    question : data.question,
                    options : data.option
                 });
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
                console.log(id);
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