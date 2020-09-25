<template>
  <div class="px-3 h-6 rounded text-xs font-semibold flex items-center"
    :class="`bg-${badgeColor}-100 text-${badgeColor}-700`">
    <span class="w-2 h-2 rounded-full mr-1" :class="`bg-${badgeColor}-400`"></span>
    <span>{{guest}}</span>
  </div>
</template>

<script>
  export default {
    props: {
      guest: {
        type: String
      }
    },
    computed: {
      badgeColor() {

        const mappings = {
          Family: "purple",
          Friends: "teal",
          Bestmen: "blue",
          Colleagues: "orange",
          default: "teal"
        };
        return mappings[this.guest] || mappings.default;
      }
    },
  };
</script>