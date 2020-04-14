<template>
  <div class="bg-gray-200 rounded-lg px-3 py-3 column-width rounded mr-4">
    <div class="flex justify-between">
      <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{{column.name}}</p>
      <p class="text-gray-700 font-semibold font-sans tracking-wide text-xs">{{totalGuestOnTable}} guests</p>
    </div>
    <div class="h-screen">
      <draggable
        :list="column.guests"
        :animation="200"
        ghost-class="ghost-card"
        group="guests"
        handle=".handle"
        class="items-stretch h-screen w-full"
        :data-table-id="column._id"
        @end="onEnd"
      >
          <guest-card
            v-for="(guest) in column.guests"
            :key="guest._id"
            :guest="guest"
            class="mt-3 item"
          ></guest-card>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import GuestCard from "./GuestCard.vue";
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    GuestCard,
    draggable
  },
  props: {
    column: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    ...mapActions(['guestChangeTable']),
    onEnd(evt){
      const guestId = evt.item.dataset.guestId;
      const fromTableId = evt.from.dataset.tableId;
      const toTableId = evt.to.dataset.tableId;
      this.guestChangeTable({guestId,fromTableId,toTableId})
    }
  },
  computed: {
    ...mapState(['counter']),
    totalGuestOnTable: function() {
      let sum = 0;
      this.column.guests.forEach(function(person) {
        sum += person.qty;
      });
      return sum;
    }
  }
};
</script>

<style scoped>
.column-width {
  min-width: 280px;
  width: 280px;
}
/* Unfortunately @apply cannot be setup in codesandbox, 
but you'd use "@apply border opacity-50 border-blue-500 bg-gray-200" here */
.ghost-card {
  opacity: 0.5;
  background: #F7FAFC;
  border: 1px solid #4299e1;
}
</style>
