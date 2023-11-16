<template>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center flex-col gap-4 text-black p-10 bg-slate-400 rounded-lg z-10">
        <UIcon name="i-mdi-close" class="absolute top-2 right-3 text-2xl cursor-pointer" @click="()=>{ $emit('modalClose');}" />
        <div class="flex gap-4">
            <label for="question" class="w-40">Enter Your Ques : </label>
            <input type="text" name="question" placeholder="Enter Your Question" class="rounded-md h-7 pl-2" v-model="ques" />
        </div>
        <div class="" v-for="(option,index) in pollValue" :key="index" >
            <OptionInput :optionIndex="option" :index="index" @optionValue="onChangeOptionValue"/>
        </div>
        <UButton size="lg" class="bg-[#731DD8] hover:bg-[#731DD8]" @click="addOptionHandler" label="Add Option" />
        <UButton size="lg" class="bg-[#731DD8] hover:bg-[#731DD8]" @click="submitHandler" label="Submit" />
    </div>
</template>
<script setup>
import OptionInput from './polling/OptionInput.vue';
const emit = defineEmits(['modalClose',])
const surveyStore = useSurveyStore();
const isModalOpen = ref(false)
const { surveyData, isUpdate } = defineProps(['surveyData','isUpdate'])
const ques = ref("");

const pollValue = ref([{
    "option" : ""
},{
    "option" : ""
}])
if( surveyData ){
    ques.value = surveyData.question;
    surveyData.options.map((data,index)=>{
        if(index < 2 ){
            pollValue.value[index] = {
                "option" : data.option
            }
        }else{
            pollValue.value.push({ "option" : data.option})
        }
    })
}

const submitHandler = async () => {
    if(!isUpdate){
        await surveyStore.addSurveyData({
            question : ques.value,
            option : pollValue.value
        })
    }else{
        await surveyStore.updateSurveyData({
            id : surveyData.id,
            question : ques.value,
            option : pollValue.value
        })
    }
    emit('modalClose')
}
const addOptionHandler = async()=>{
    pollValue.value.push({ "option" : "" })
}
const onChangeOptionValue = ({option,index})=>{
    pollValue.value[index] = {
        "option" : option
    }

}
</script>