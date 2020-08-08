<template>
  <div
    class="bg-white shadow rounded px-3 pt-2 pb-2 border border-white mb-2"
    :data-guest-id="guest._id"
  >
    <div class="flex flex-row">
      <div class="flex-grow pr-1">
        <div class="flex justify-between">
          <p
            class="text-gray-700 font-semibold font-sans tracking-wide text-sm"
          >
            {{ guest.name }}
          </p>
        </div>
        <div class="flex justify-between">
          <div class="flex flex-1 mt-1 items-center">
            <guest v-if="guest.qty">{{ guest.qty }}</guest>
            <badge v-if="guest.type" :guest="guest.type" />
          </div>
          <button
            alt="edit guest card"
            class="flex mt-1 justify-between items-center text-center text-sm border-blue-200 rounded px-2 py-1 hover:border-blue-500 hover:bg-blue-200 h-6 w-auto"
            @click="editGuestEvent(guest)"
          >
            <font-awesome-icon
              icon="edit"
              size="xs"
              style="color:cornflowerblue"
            />
          </button>
          <button
            alt="remove guest card"
            class="flex mt-1 justify-between items-center text-center text-sm border-red-200 rounded px-2 py-1 hover:border-red-500 hover:bg-red-200 h-6 w-auto"
            @click="removeGuestEvent"
          >
            <font-awesome-icon icon="trash" size="xs" style="color:Tomato" />
          </button>
        </div>
      </div>
      <div
        class="flex cursor-move items-center bg-gray-200 handle border border-gray-200 rounded p-1 hover:border-green-500 hover:bg-green-200 px-3"
      >
        <div class="flex justify-between items-center text-sm">
          <font-awesome-icon
            icon="align-justify"
            size="xs"
            style="color:black items-center"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EventBus from "../eventBus";
import Badge from "./Badge.vue";
import Guest from "./Guest.vue";
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  components: {
    Badge,
    Guest,
  },
  props: {
    guest: {
      type: Object,
      default: () => ({}),
    },
    count: {
      type: String,
    },
  },
  methods: {
    ...mapActions(["removeGuest", "selectGuest", "guestEditModalVisible"]),
    removeGuestEvent() {
      var r = confirm("Please confirm to remove this guest");
      if (r === true) {
        this.removeGuest({ id: this.guest._id });
      }
    },
    editGuestEvent(guest) {
      this.selectGuest(guest);
      this.guestEditModalVisible(true);
    },
  },
};
</script>
