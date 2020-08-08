<template>
  <div class="px-3 py-3 rounded w-full">
    <div class="flex justify-between mb-4">
      <p class="text-gray-700 font-semibold font-sans tracking-wide text-base">Edit guest</p>
    </div>
    <div class="flex flex-wrap -mx-3 mb-2">
      <div class="w-full md:w-1/2 px-3 mb-4 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-city"
        >Full Name</label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
          v-model="guestName"
          @keyup.enter="addGuest"
          placeholder="enter name"
          ref="guestname"
        />
      </div>
      <div class="w-full md:w-1/2 px-3 mb-4 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-state"
        >Total Guest</label>
        <div class="relative">
          <select
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            v-model="guestQty"
          >
            <option v-for="index in 9" :key="index" :selected="index == guestQty">{{index}}</option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-2">
      <div class="w-full md:w-1/2 px-3 mb-4 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-state"
        >Tag</label>
        <div class="relative">
          <select
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            v-model="tagName"
          >
            <option v-for="tag in tags" :key="tag">{{ tag }}</option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row-reverse items-center justify-between">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        @click="editGuestEvent"
      >Edit</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  components: {},
  props: {
    tables: { type: Array },
  },
  data() {
    return {
      guestName: null,
      guestQty: 1,
      tagName: "Family",
      tags: ["Family", "Friends", "Bestmen", "Colleagues"],
    };
  },
  computed: {
    ...mapState(["selectedGuest"]),
  },
  methods: {
    ...mapActions(["editGuest", "guestEditModalVisible"]),
    editGuestEvent: function () {
      this.editGuest({
        id: this.selectedGuest._id,
        name: this.guestName,
        qty: this.guestQty,
        type: this.tagName,
      });
      this.guestName = "";

      this.guestEditModalVisible(false);
    },
  },
  created() {
    console.log(this.selectedGuest);
    this.guestName = this.selectedGuest.name;
    this.guestQty = this.selectedGuest.qty;
    this.tableNo = this.selectedGuest.table[0];
    this.tagsName = this.selectedGuest.type;
  },
  mounted() {
    this.$refs.guestname.focus();
  },
};
</script>

<style scoped>
.column-width {
  min-width: 280px;
  width: 280px;
}
</style>
