<template>
  <div id="app">
    <div class="flex flex-col">
      <Header />
      <div class="min-h-screen flex justify-center mx-auto">
        <div class="flex overflow-x-scroll pt-16">
          <div class="inserters"></div>
          <guest-table v-for="column in getTables" :key="column.title" :column="column"></guest-table>
          <vue-tailwind-modal :showing="showGuestModal" @close="guestModalVisible(false)">
            <guest-adder :tables="getTableNames"></guest-adder>
          </vue-tailwind-modal>
          <vue-tailwind-modal :showing="showGuestEditModal" @close="guestEditModalVisible(false)">
            <guest-edit-form :tables="getTableNames"></guest-edit-form>
          </vue-tailwind-modal>
          <vue-tailwind-modal :showing="showTableModal" @close="tableModalVisible(false)">
            <table-adder></table-adder>
          </vue-tailwind-modal>
          <vue-tailwind-modal :showing="showTableEditModal" @close="tableEditModalVisible(false)">
            <table-edit-form></table-edit-form>
          </vue-tailwind-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapState,
    mapActions
  } from "vuex";
  import VueTailwindModal from "vue-tailwind-modal";

  import GuestTable from "../components/Table.vue";
  import TableAdder from "../components/TableAdder.vue";
  import GuestAdder from "../components/GuestAdder.vue";
  import GuestEditForm from "../components/GuestEditForm.vue";
  import TableEditForm from "../components/TableEditForm.vue";
  import Header from "../components/Header.vue";

  export default {
    name: "Main",
    components: {
      VueTailwindModal,
      GuestTable,
      TableAdder,
      GuestAdder,
      Header,
      GuestEditForm,
      TableEditForm,
    },
    computed: {
      ...mapGetters(["getTableNames", "getTables"]),
      ...mapState(["showGuestModal", "showGuestEditModal", "showTableModal", "showTableEditModal"]),
    },
    methods: {
      ...mapActions([
        "guestModalVisible",
        "guestEditModalVisible",
        "tableModalVisible",
        "tableEditModalVisible"
      ]),
    },
  };
</script>

<style scoped>
  .dmv-text-xs {
    font-size: 0.75rem;
  }
</style>