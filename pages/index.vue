<template>
    <div class="flex justify-center items-center h-screen relative">
        <UButton class="bg-[#731DD8] hover:-[#731DD8]" label="Add Data" icon="i-mdi-add" size="xl"  @click="modalOpen"></UButton>
    </div>
    
    <PollsAdd v-if="isModalOpen" :survey-data="survey"/>
</template>
<script setup>
const isModalOpen = ref(false)
const modalOpen = ()=>{
    isModalOpen.value = true
}
const modalClose = ()=>{
    isModalOpen.value = false
}

</script>
