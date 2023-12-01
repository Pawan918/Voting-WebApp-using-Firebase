<template>
    <UContainer>
        <ClientOnly>
            <div v-for="(survey , index) in surveyData" :key="survey.id" class="mt-5">
                <PollingSurvey :survey="survey" :index="index"/>
            </div>
        </ClientOnly>
    </UContainer>
</template>
<script setup>
const surveyStore = useSurveyStore();
surveyStore.getSurveyData();
const { surveyData } = storeToRefs(surveyStore)

</script> 