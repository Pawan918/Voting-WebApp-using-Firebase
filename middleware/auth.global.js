export default defineNuxtRouteMiddleware((to, from) => {
  const store = useUserStore();
  setTimeout(() => {
    if (!store.isLoggedIn && to.path === "/dashboard") {
      return navigateTo("/login");
    } else if (!store.isLoggedIn && to.path === "/") return navigateTo("/login");
    else if (!store.isLoggedIn && to.path === "/profile") return navigateTo("/login");
    else if (store.isLoggedIn && to.path === "/login") return navigateTo("/dashboard");
    else if(!store?.userDetails?.isAdmin && to.path === '/details') return navigateTo("/dashboard")
  }, 1000);
});
