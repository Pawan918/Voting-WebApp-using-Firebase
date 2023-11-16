
<template>
  <UCard class="mt-4">
    <template #header>
      <h1 class="text-2xl font-bold"><span class="font-extrabold mr-4">{{ index + 1 }}. </span>{{ survey.question }}</h1>
    </template>
    <div class="">
      <URadioGroup v-model="selected" :options="options" :disabled="disable"/>
    </div>
    <UButton @click="surveySubmitHandler" class="mt-5  bg-[#731DD8] hover:bg-[#731DD8]" size="lg" label="Submit" :disabled="disable" v-if="!isAdmin"></UButton>
    <UButton class="mt-5 mr-5  bg-[#731DD8] hover:bg-[#731DD8]" label="Update Poll" v-if="isAdmin" @click="updatePoll"/>
    <UButton class="mt-5  bg-[#731DD8] hover:bg-[#731DD8]" label="Delelte Poll" v-if="isAdmin" @click="deletePoll"/>
  </UCard>
  <PollsAdd v-if="isModal" :survey-data="survey" :isUpdate="isUpdate" @modalClose="modalClose"/>
</template>
<script setup>
const isModal = ref(false)
const userSurveyStore = useUserSurveyStore();
const userStore = useUserStore();
const surveyStore = useSurveyStore()
const isUpdate = ref(false)
const { survey, index } = defineProps(['survey', 'index']);
const { isAdmin,userDetails } = storeToRefs(userStore)
const disable = ref(false)
const selected = ref('');
const options = ref([])
if(isAdmin.value){
  disable.value = true
}
survey.options.map((data)=>{
  options.value.push({
    value : data.option,
    label : data.option
  })
})
// if(!isAdmin.value && survey.voted){
//   const userId = survey?.voted.find((data) => data.userId === userDetails.value.uid);
//   if(userId){
//     selected.value = userId.option;
//     disable.value = true
//   }
// }

const surveySubmitHandler = async()=>{
    disable.value = true
    surveyStore.addSurveyUser(survey.id , selected.value)
}
const modalClose = ()=>{
  isModal.value = false
}

const updatePoll = ()=>{
    isModal.value = true
    isUpdate.value = true
}
const deletePoll = ()=>{   
  surveyStore.deleteSurveyData(survey.id);
}
</script>