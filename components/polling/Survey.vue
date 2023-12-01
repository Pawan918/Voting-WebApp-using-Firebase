<template>
    <UCard >
        <template #header>
            <h1 class="text-2xl font-bold"><span class="font-extrabold mr-4">{{ index + 1 }}. </span>{{ survey.question }}
            </h1>
        </template>
        <div v-for="(option, index) in option" :key="index">
            <UMeter :value="option.count" :max="survey.count" :label="option.option" indicator />
        </div>
        <div class="mt-5 ml-5 flex gap-2 items-center font-bold text-xl"><UIcon name="i-mdi-account" class="w-8 h-8"/><span>{{ survey.count }}</span></div>
    </UCard>
</template>
<script setup>
const { survey, index } = defineProps(['survey', 'index']);

const option = ref(survey.options)
option.value.forEach((item)=>{
    const voted = survey.voted.filter((voted) => voted.option == item.option)
    item.count = voted.length;
})
</script>