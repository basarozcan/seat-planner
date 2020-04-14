<template>
  <div
    class="pr-3 h-6 rounded-full text-xs font-semibold flex items-center"
    :class="`text-blue-700`"
  >
    <span class="rounded-full mr-1">
      <font-awesome-icon icon="male" style="color:black"/>
    </span>
    <span>
      <slot></slot>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: "teal"
    }
  }
};
</script>
