<template>
    <UForm class="h-screen bg-stone-800">
        <UContainer class="bg-stone-800 py-8 " >
            <UCard :ui="{ body : { base : 'flex '}}" >
                <div class="w-1/2">
                    <img :src="imgUrl"/>
                </div>
                <div class="w-1/2 flex justify-center items-center bg-white flex-col gap-4">
                    <h1 class="text-3xl font-bold" v-if="isSignIn">Sign In</h1>
                    <h1 class="text-3xl font-bold" v-else>Log In</h1>
                    <div class="flex flex-col gap-4">
                        <div class="flex gap-4">
                            <label for="email" class="w-32">E-mail : </label>
                            <UInput type="email" name="email" placeholder="Enter Your Email" class="h-7 pl-2" v-model="email" :required="true" />
                        </div>
                        <div class="flex gap-4" v-if="isSignIn">
                            <label for="name" class="w-32">Name : </label>
                            <UInput name="text" placeholder="Enter Your Name" class="h-7 pl-2" v-model="name" :required="true"  type="text" />
                        </div>
                        <div class="flex gap-4 " v-if="isSignIn">
                            <label for="admin" class="w-32">Role : </label>
                            <USelect v-model="adminSelected" :options="adminOptions" class="h-7 pl-2"  placeholder="Select" type="password" :required="true"/>
                        </div>
                        <div class="flex gap-4">
                            <label for="password" class="w-32">Password : </label>
                            <UInput type="password" name="password" placeholder="Enter Your password" class="h-7 pl-2" v-model="password" />
                        </div>
                        <div class="flex gap-4" v-if="isSignIn">
                            <label for="confirmPassword" class="w-32">confirmPassword : </label>
                            <UInput name="confirmPassword" placeholder="Enter Your password" class="h-7 pl-2" v-model="confirmPassword" type="password" :required="true"/>
                        </div>
                    </div>
                    <UButton class=" bg-[#731DD8] hover:bg-[#731DD8]" size="lg" v-if="isSignIn" @click="siginHandler">
                        SignIn
                    </UButton>
                    <UButton class="bg-[#731DD8] hover:bg-[#731DD8] mx-auto" size="lg" v-else @click="loginHandler">LogIn</UButton>
                    <div v-if="isSignIn">
                        If Already Signed In
                        <span class="underline hover:text-[blue] cursor-pointer" @click="() => (isSignIn = false)">LogIn</span>
                    </div>
                    <div v-else>
                        If Not Signed In
                        <span class="underline hover:text-[blue] cursor-pointer" @click="() => (isSignIn = true)">
                            SignIn</span>
                    </div>
                </div>
            </UCard>
        </UContainer>
    </UForm>
</template>
<script setup>
const toast = useToast()
const isSignIn = ref(true);
const authStore = useAuthStore();
const email = ref("");
const password = ref("");
const confirmPassword = ref("")
const name = ref("");
const router = useRouter();

const adminOptions = [ "admin", "guest"];
const adminSelected = ref("");

const imgUrl= 'https://plus.unsplash.com/premium_photo-1681487814165-018814e29155?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

const loginHandler = async () => {
    if(email === "" || password === ""){
        toast.add({ title: "Enter all fields to signup"})
    }
    const user = await authStore.logIn(email.value, password.value);
    if (user.status === 200) {
        router.push("/dashboard");
    }
    toast.add({ title : user.message})
    
};
const siginHandler = async () => {
    if(email === "" || password === "" || adminSelected === ""){
        toast.add({ title: "Enter all fields to signup"})
    }
    const user = await authStore.signIn(email.value, password.value, adminSelected.value, name.value);
    if (user.status === 200) {
        router.push("/dashboard");
    }
};

</script>