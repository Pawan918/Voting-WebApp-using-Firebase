<template>
    <div class="flex gap-4">
        <label :for="`option-${index}`"  class="w-40"> option-{{ index + 1 }} :</label>
        <input type='text' :name="`option-${index}`" placeholder="Enter Your Option" class="rounded-md h-7 pl-2"
        v-model="option" @input
        ="$emit('optionValue', {option,index})"/>
    </div>
</template>
<script setup>
const { optionIndex , index } = defineProps(['optionIndex', 'index'])

const option = ref(optionIndex.option)
</script>