<script>
export default {
  props: {
    showText: {
      type: Boolean,
      default: true,
      required: false,
    },
    showIcon: {
      type: Boolean,
      default: false,
      required: false,
    },
    showLocation: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data: function() {
    return {}
  },
  methods: {},
}
</script>

<template>
  <div>
    <BaseIcon class="" name="cloud-sun" />
  </div>
</template>

<!-- <style scoped></style> -->
