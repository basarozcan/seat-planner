<template>
  <div class="px-3 py-3 rounded w-full">
    <div class="flex justify-between mb-4">
      <p class="text-gray-700 font-semibold font-sans tracking-wide text-base">Add new board</p>
    </div>
    <div class="flex flex-wrap -mx-3 mb-2">
      <div class="w-full px-3 mb-4 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-city"
        >Board Name</label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
          placeholder="enter board name"
          v-model="boardName"
          @keyup.enter="addBoard"
          ref="boardname"
        >
      </div>
    </div>
    <div class="flex flex-row-reverse items-center justify-between">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        @click="addBoardEvent"
      >Add</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  components: {},
  props: {},
  data() {
    return {
      boardName: null
    };
  },
  computed: {
    ...mapState(['user']),    
  },
  methods: {
    ...mapActions(['addBoard','boardModalVisible']),
    addBoardEvent: function() {
      this.addBoard({name: this.boardName,'owner_id': this.user._id})
      this.boardName = "";
      this.boardModalVisible(false)
    }
  },
  mounted(){
    this.$refs.boardname.focus()
  }
};
</script>

<style scoped>
.column-width {
  min-width: 100%;
  width: 100%;
}
</style>
