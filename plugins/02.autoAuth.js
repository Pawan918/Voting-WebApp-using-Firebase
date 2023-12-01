import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
export default defineNuxtPlugin(async ({payload}) => {
  onAuthStateChanged(getAuth(), async (userDetails) => {
    const { $db } = useNuxtApp()
    if (userDetails) {
      const { userStore,authStore } = payload.pinia;
      userStore.isLoggedIn = true;
      authStore.authDetails = userDetails

      const ref = doc($db,"users",authStore.authDetails.uid)
      const docSnap = await getDoc(ref)
      const data = docSnap.data();
      userStore.userDetails = data
    } else {
      console.log('user not found');
    }
  });
  })
