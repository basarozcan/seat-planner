<template>
  <div class="login-page bg-gray-200 h-screen">
    <div class="container mx-auto p-8">
      <div class="mx-auto max-w-sm">
        <div class="py-10 text-center">LOGO</div>
        <div class="bg-white rounded shadow">
          <div class="login-form" v-show="!isLoggedIn">
            <div class="border-b py-4 text-center">
              <div
                class="login-header font-bold text-black text-xl tracking-widest uppercase"
              >Welcome!</div>
              <div class="login-subtitle text-gray-700 text-md">Please log in</div>
            </div>
            <div class="bg-grey-lightest px-10 py-10">
              <div class="mb-3">
                <a :href="apiUrl + '/auth/github'">
                  <div class="bg-gray-700 py-2 px-4 text-white text-center">Login With Github</div>
                </a>
              </div>
            </div>
          </div>
          <div class="select-dashboard" v-show="isLoggedIn">
            <div class="border-b py-4 text-center">
              <div class="login-header font-bold text-black text-xl tracking-widest">{{user.name}}</div>
              <div class="login-subtitle text-gray-700 text-md">Please select your board or <div class="logout cursor-pointer" @click="logoutEvent">Logout</div></div>
            </div>
            <div class="bg-grey-lightest px-10 py-10 flex flex-wrap -m-2">
              <div class="w-full" v-show="isBoardsLoaded">
                <div class="p-1 w-full" v-for="board in getBoards" :key="board._id">
                  <router-link :to="'/board/' + board._id">
                    <div class="h-full flex items-center hover:border-blue-600 border-gray-300 border px-4 py-2 rounded-lg hover:bg-blue-200">
                      <div class="flex-grow">
                        <h2 class="text-gray-900 title-font font-medium">{{board.name}}</h2>
                        <p class="text-gray-500 text-sm">created_date</p>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
              <div class="p-1 w-full">
                <div
                  class="h-full flex items-center hover:border-blue-600 border-gray-300 border px-4 py-2 rounded-lg cursor-pointer bg-gray-200"
                  @click="boardModalVisible()"
                >
                  <div class="flex-grow">
                    <h2 class="text-gray-900 title-font font-medium">New Board</h2>
                    <p class="text-gray-500 text-sm">Create new empty board</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="min-h-screen flex justify-center mx-auto absolute">
      <div class="flex overflow-x-scroll pt-16">
        <vue-tailwind-modal :showing="showBoardModal" @close="boardModalVisible(false)">
          <board-adder />
        </vue-tailwind-modal>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import VueTailwindModal from "vue-tailwind-modal";

import BoardAdder from "../components/BoardAdder";

export default {
  data() {
    return {
      apiUrl: process.env.VUE_APP_API_URL
    }
  },
  components: {
    VueTailwindModal,
    BoardAdder
  },
  methods: {
    ...mapActions(["fetchBoards","boardModalVisible","logoutUser"]),
    
    logoutEvent(){
      this.logoutUser()
    }
    
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'getBoards','isBoardsLoaded']),
    ...mapState(['user', 'showBoardModal']),
  },

};
</script>

<style>
</style>