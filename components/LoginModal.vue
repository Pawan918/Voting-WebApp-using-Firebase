<template>
    <ClientOnly>
    <form class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-between flex-col gap-4 text-black p-10 bg-slate-400 rounded-lg z-10" >
        <UIcon name="i-mdi-close" class="absolute top-2 right-3 text-2xl cursor-pointer" @click="modalClose" />
        <h1 class="text-2xl" v-if="isSignIn">Sign In</h1>
        <h1 class="text-2xl" v-else>Log In</h1>
        <div class="flex gap-4">
            <label for="email" class="w-32">Email : </label>
            <UInput type="email" name="email" placeholder="Enter Your Email" class=" h-7 pl-2" v-model="email" :required="true"/>
        </div>
        <div class="flex gap-4" v-if="isSignIn">
            <label for="name" class="w-32">Name : </label>
            <UInput  name="text" placeholder="Enter Your Name" class="h-7 pl-2" v-model="name" />
        </div>
        <div class="flex gap-4">
            <label for="password" class="w-32">Password : </label>
            <UInput type="password" name="password" placeholder="Enter Your password" class=" h-7 pl-2" v-model="password" :required="true"/>
        </div>
        <div class="flex gap-4 w-full"  v-if="isSignIn">
            <label for="admin" class="w-32 ">Admin : </label>
            <USelect v-model="adminSelected" :options="adminOptions" class="h-7 pl-2"/>
        </div>
        <div class="flex gap-4"  v-if="isSignIn">
            <label for="confirmPassword" class="w-32">confirmPassword : </label>
            <UInput name="password" placeholder="Enter Your password" class=" h-7 pl-2" v-model="password" />
        </div>
        <div class="p-2 text-xl bg-[red] text-white cursor-pointer rounded-md" v-if="isSignIn" @click="siginHandler">SignIn
        </div>
        <UButton class="bg-[#731DD8] hover:bg-[#731DD8]" size="lg" v-else @click="loginHandler">LogIn</UButton>
        <div  v-if="isSignIn">If Already Signed In <span class="underline hover:text-[blue] cursor-pointer"
                @click="() => isSignIn = false">LogIn</span></div>
        <div  v-else>If Not Signed In <span class="underline hover:text-[blue] cursor-pointer"
                @click="() => isSignIn = true"> SignIn</span></div>
    </form>
</ClientOnly>
</template>
<script setup>
const isSignIn = ref(true);
const authStore = useAuthStore();
const email = ref("");
const password = ref("");
const name = ref("");
const router = useRouter()
const { isModalOpen } = storeToRefs(userStore)


const adminOptions = ["Yes","No"]

const adminSelected = ref('No')

const modalClose = () => {
    isModalOpen.value = false
}
const loginHandler = async() => {
    const user = await authStore.logIn(email.value, password.value)
    email.value = ""
    password.value = ""
    if (user.status === 200) {
        router.push('/dashboard')
    }
}
const siginHandler = async() => {
    const user = await authStore.signIn(email.value, password.value)
    email.value = ""
    password.value = ""
    if (user.status === 200) {
        router.push('/dashboard')
    }
}

</script>