<template>
    <div class="flex justify-end mr-10 my-5">
        <UButton class="bg-[#731DD8] hover:-[#731DD8]" label="Add New Poll" icon="i-mdi-add" size="xl"  @click="modalOpen"></UButton>
    </div>
    <UContainer>
        <PollingCard v-for="(survey,index) in surveyData" :key="survey.id" :survey="survey" :index="index" />
    </UContainer>
    <PollsAdd v-if="isModalOpen"  @modalClose="modalClose"/>
</template>
<script setup>
const isModalOpen = ref(false)

const surveyStore = useSurveyStore();
surveyStore.getSurveyData();
const { surveyData } = storeToRefs(surveyStore)

const modalOpen = ()=>{
    isModalOpen.value = true
}
const modalClose = ()=>{
    isModalOpen.value = false
}
</script>