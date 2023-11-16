<template>
    <div class="flex justify-end items-center h-20 px-4 lg:px-10 bg-slate-500 text-white font-averta-bold">
        <div class="flex gap-8 items-center justify-center ">
            <NuxtLink v-if="isLoggedIn">
                <UButton class=" bg-[#731DD8] hover:bg-[#731DD8]" size="lg" @click="logOutHandler">Log Out</UButton>
            </NuxtLink>
            <NuxtLink v-else to="/login">
                <UButton class=" bg-[#731DD8] hover:bg-[#731DD8]" size="lg">Log In</UButton>
            </NuxtLink>
            <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" v-if="isLoggedIn" class="cursor-pointer" @click="profileHandler"/>
        </div>

    </div>
</template>

<script setup>

import { useUserStore } from "~/stores/user";

const userStore = useUserStore();
const toast = useToast();
const router = useRouter();

let { isLoggedIn, userDetails } = storeToRefs(userStore);
const logOutHandler = async () => {
    const res = await userStore.signOutUser()
    isLoggedIn.value = false;
    userDetails.value = null;
    router.push('/login')
    toast.add({ title: res.message })
}
const profileHandler = ()=> {
    router.push('/profile')
}
</script>