export const useDbStore = defineStore("db",{
    getters : {
        db : ()=>{
            const { $db } = useNuxtApp();
            return $db;
        }
    },
})