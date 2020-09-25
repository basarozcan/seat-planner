<template>
  <div class="bg-gray-200 rounded-lg px-3 py-1 column-width rounded mr-4">
    <div class="flex justify-between mb-1 text-gray-700 font-semibold font-sans tracking-wide">
      <p class="table-title hover:bg-gray-100 hover:shadow-lg">
        <span @click="editTableEvent(column)">
          {{column.name}}
          <span class="table-title-edit-icon">
            <font-awesome-icon icon="edit" size="xs" style="color:cornflowerblue" />
          </span>
        </span>

      </p>
      <p class="text-xs self-center">{{totalGuestOnTable}} guests</p>
    </div>
    <div class="h-screen">
      <draggable :list="column.guests" :animation="200" ghost-class="ghost-card" group="guests" handle=".handle"
        class="items-stretch h-full w-full pb-24" :data-table-id="column._id" @end="onEnd">
        <guest-card v-for="(guest) in column.guests" :key="guest._id" :guest="guest" class="item"></guest-card>
      </draggable>
    </div>
  </div>
</template>

<script>
  import draggable from "vuedraggable";
  import GuestCard from "./GuestCard.vue";
  import {
    mapState,
    mapActions
  } from 'vuex'

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
      ...mapActions(['guestChangeTable', 'selectTable', 'tableEditModalVisible']),
      onEnd(evt) {
        const guestId = evt.item.dataset.guestId;
        const fromTableId = evt.from.dataset.tableId;
        const toTableId = evt.to.dataset.tableId;
        this.guestChangeTable({
          guestId,
          fromTableId,
          toTableId
        })
      },
      editTableEvent(table) {
        this.selectTable(table);
        this.tableEditModalVisible(true);
      },
    },
    computed: {
      ...mapState(['counter']),
      totalGuestOnTable: function () {
        let sum = 0;
        this.column.guests.forEach(function (person) {
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

  .table-title {
    @apply p-1 rounded-lg text-sm cursor-pointer;
  }

  .table-title-edit-icon {
    @apply hidden;
  }

  .table-title:hover .table-title-edit-icon {
    @apply inline-block;
  }
</style>