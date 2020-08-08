import Main from "./pages/Main"
import Welcome from "./pages/Welcome"
import Dashboard from "./pages/Dashboard"
import store from "./store";

export const routes = [
  { 
    path: '/board/:id', 
    component: Main,
    async beforeEnter (to, form, next){
      // if board is not maintained by this user -> return to /
      // if board is not exist -> return to /
      // console.log('before-enter-board',to.params.id);
      // console.log(store.state.isLoggedIn);
      await store.dispatch('fetchUser')
      
      if(store.state.isLoggedIn){
        await store.dispatch('fetchBoardData', { id: to.params.id })

        if (store.getters.isSelectedBoardLoaded && store.getters.isOwnerOfBoard){
          // if board exists and owner is this user
          next()
        }else{
          // if board not exists or owner is not this user
          next('/')
        }
        
      }else{
        // if not logged in
        next('/')
      }
    }
  },
  {
    path: '/',
    component: Welcome
  },
  {
    path: '/dashboard',
    component: Dashboard
  },
]