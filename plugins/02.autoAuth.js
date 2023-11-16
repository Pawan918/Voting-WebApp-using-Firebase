import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
export default defineNuxtPlugin(async ({payload}) => {
  onAuthStateChanged(getAuth(), async (userDetails) => {
    const { $db } = useNuxtApp()
    if (userDetails) {
      const { user  } = payload.pinia;
      user.isLoggedIn = true;
      user.userDetails = userDetails

      const ref = await doc($db,"users",user.userDetails.uid)
      const docSnap = await getDoc(ref)
      const data = docSnap.data();
      user.isAdmin = data.isAdmin
    } else {
      console.log('user not found');
    }
  });
  })
