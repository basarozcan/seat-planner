<template>
  <nav class="bg-gray-800 p-1 mt-0 fixed w-full z-10 pin-t">
    <div class="container mx-auto flex flex-wrap items-center">
      <div class="flex flex-col w-1/3 justify-start text-white font-semibold">
        <router-link to="/" class="text-white no-underline hover:text-white hover:no-underline" >
            <span class="text-sm pl-2">Seat Planner</span>
        </router-link>
        <div class="w-full text-xs pl-2 text-gray-500">
          Made with
          <font-awesome-icon icon="heart" size="xs" style="color:Tomato; margin-right:2px"/> by
          <a class="underline" href="https://github.com/basarozcan"> @basarozcan</a>
        </div>
      </div>
      <div class="flex w-1/3 justify-center text-md text-white">
        <p>{{selectedBoard.name}}</p>
      </div>
      <div class="flex justify-between w-1/3 md:justify-end text-xs">
        <ul class="list-reset flex justify-end flex-1 items-center">
          <li class="mr-2">
            <button
              class="inline-block px-2 py-1 text-white no-underline bg-gray-700 rounded hover:bg-gray-400 hover:text-gray-700"
              @click="tableModalVisible()"
            >+Table</button>
          </li>
          <li class="mr-2">
            <button
              class="inline-block text-gray-200 no-underline hover:bg-gray-400 hover:text-gray-700 px-2 py-1 bg-gray-700 rounded"
              @click="guestModalVisible()"
            >+Guest</button>
          </li>
          <li class="group block relative h-8" v-show="isLoggedIn">
            <img :src="user.image" alt="" class="rounded-full group-hover:block h-8">
            <ul class="dropdown-menu absolute hidden text-gray-700 top-0 right-0 mt-8 group-hover:block">
              
              <li><router-link to='/' class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">Back to boards</router-link></li>
              <li><a href="#" @click="logoutEvent()" class="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  name: "Main",
  computed: {
    ...mapState(['user', 'selectedBoard','isLoggedIn']),
  },
  methods: {
    ...mapActions(['guestModalVisible','tableModalVisible',"logoutUser"]),
    logoutEvent(){
      this.logoutUser()
      this.$router.push({path: '/'})
    }
  },
};
</script>

<style>

</style>