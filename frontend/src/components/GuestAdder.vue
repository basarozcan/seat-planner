<template>
  <div class="px-3 py-3 rounded w-full">
    <div class="flex justify-between mb-4">
      <p class="text-gray-700 font-semibold font-sans tracking-wide text-base">Add new guest</p>
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
        >
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
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-2">
      <div class="w-full md:w-1/2 px-3 mb-4 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-city"
        >Table Name</label>
        <div class="relative">
          <select
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            v-model="tableNo"
          >
            <option v-for="table in tables" :key="table.id" :value="table.id">{{table.name}}</option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
            </svg>
          </div>
        </div>
      </div>
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
            <option v-for="tag in tags" :key="tag">{{tag}}</option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row-reverse items-center justify-between">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        @click="addGuestEvent"
      >Add</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  components: {},
  props: {
    tables: { type: Array }
  },
  data() {
    return {
      guestName: null,
      guestQty: 1,
      tableNo: this.tables[0].id,
      tagName: 'Family',
      tags: [
        'Family',
        'Friends',
        'Bestmen',
        'Colleagues'
      ],
    };
  },
  methods: {
    ...mapActions(['addGuest','guestModalVisible']),
    addGuestEvent: function() {
      this.addGuest({
        name: this.guestName,
        qty: this.guestQty,
        table: this.tableNo,
        type: this.tagName,
      })
      this.guestName = "";
      this.guestModalVisible(false)
    }
  },
  mounted(){
    this.$refs.guestname.focus()
  }
};
</script>

<style scoped>
.column-width {
  min-width: 280px;
  width: 280px;
}
</style>
