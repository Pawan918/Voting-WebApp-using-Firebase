<template>
    <div class="flex justify-end mr-10 my-5">
        <UButton class="bg-[#731DD8] hover:bg-[#731DD8]" label="Add New Poll" icon="i-mdi-add" size="xl"  @click="modalOpen" v-if="userDetails.isAdmin"></UButton>
        <ULink
            to="/details"
            class="ml-4 flex items-center px-4 rounded-md"
            active-class="text-white bg-[#731DD8]"
            inactive-class="text-white dark:text-gray-400ys dark:hover:text-gray-200 bg-[#731DD8]"
        >Go to Details</ULink>
    </div>
    <UContainer>
        <ClientOnly>
            <PollingCard v-for="(survey,index) in surveyData" :key="survey.id" :survey="survey" :index="index" />
        </ClientOnly>
    </UContainer>
    <PollsAdd v-if="isModalOpen"  @modalClose="modalClose"/>
</template>
<script setup>
const isModalOpen = ref(false)

const surveyStore = useSurveyStore();
const userStore = useUserStore();
surveyStore.getSurveyData();
const { surveyData } = storeToRefs(surveyStore)
const { userDetails } = storeToRefs(userStore)

const modalOpen = ()=>{
    isModalOpen.value = true
}
const modalClose = ()=>{
    isModalOpen.value = false
}
</script>