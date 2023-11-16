<template>
    <div class="h-[200px] main bg-red-200 relative">
        <div class="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2">
            <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" size="3xl"  icon="i-heroicons-photo" class="ring-8 ring-white"  />
        </div>
    </div>
    <div class="mt-12 flex justify-center gap-4 font-semibold text-lg"><span class="font-medium">Name : </span>  {{ userDetails?.email.split("@")[0].toUpperCase() }}</div>
    <div class=" flex mt-2 justify-center gap-4 font-semibold text-lg"> <span class="font-medium">Email :</span>   {{ userDetails?.email }}</div>
    <div class="flex mt-2 justify-center gap-4 font-semibold text-lg"> <span class="font-medium"> Role : </span> {{ isAdmin ? "Admin" : "Guest" }}</div>
    <div class="flex mt-2 justify-center gap-4 font-semibold text-lg" v-if="isAdmin"><span class="font-medium"> Polls Created : </span> {{ isAdmin ? "Admin" : "Guest" }}</div>
    <div class="flex mt-2 justify-center gap-4 font-semibold text-lg" v-else><span class="font-medium"> Polls Voted : </span> {{ isAdmin ? "Admin" : "Guest" }}</div>
</template>
<script setup>
const userStore = useUserStore();
const { userDetails , isAdmin } = storeToRefs(userStore)
</script>
<style scoped>
.main {
    background-image: url(' https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
}
</style>