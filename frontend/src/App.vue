<template>
  <div id="app">
    <div class="flex flex-col">
      <nav class="bg-gray-800 p-1 mt-0 fixed w-full z-10 pin-t">
        <div class="container mx-auto flex flex-wrap items-center">
          <div class="flex flex-col w-1/2 justify-start text-white font-semibold">
            <a class="text-white no-underline hover:text-white hover:no-underline" href="#">
              <span class="text-sm pl-2">Seat Planner</span>
            </a>
            <div class="w-full text-xs pl-2 text-gray-500">
        Made with
        <font-awesome-icon icon="heart" size="xs" style="color:Tomato; margin-right:2px"/>__by
        <a class="underline" href="https://github.com/basarozcan">@basarozcan</a>
      </div>
          </div>
          <div class="flex justify-between w-1/2 md:justify-end text-xs">
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
            </ul>
          </div>
        </div>
      </nav>
      <div class="min-h-screen flex justify-center mx-auto">
        <div class="flex overflow-x-scroll pt-16">
          <div class="inserters"></div>
          <guest-table v-for="column in columns" :key="column.title" :column="column"></guest-table>
          <vue-tailwind-modal :showing="showGuestModal" @close="guestModalVisible(false)">
            <guest-adder :tables="getTableNames"></guest-adder>
          </vue-tailwind-modal>
          <vue-tailwind-modal :showing="showTableModal" @close="tableModalVisible(false)">
            <table-adder></table-adder>
          </vue-tailwind-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueTailwindModal from "vue-tailwind-modal";
import { mapGetters, mapState, mapActions } from 'vuex'

import GuestTable from "./components/Table.vue";
import TableAdder from "./components/TableAdder.vue";
import GuestAdder from "./components/GuestAdder.vue";
export default {
  name: "App",
  components: {
    VueTailwindModal,
    GuestTable,
    TableAdder,
    GuestAdder
  },
  computed: {
    ...mapGetters(['getTableNames']),
    ...mapState(['columns','showGuestModal','showTableModal']),    
  },
  methods: {
    ...mapActions(['addTable','fetchTables','guestModalVisible','tableModalVisible']),
  },
  mounted() {
    this.fetchTables()
  }
};
</script>

<style scoped>
.dmv-text-xs {
  font-size: 0.75rem;
}
</style>
