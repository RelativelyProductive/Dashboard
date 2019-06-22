<template>
  <input
    :type="type"
    class="input"
    :value="value"
    @input="$emit('update', $event.target.value)"
    v-on="$listeners"
  />
</template>

<script>
export default {
  model: {
    event: 'update',
  },
  props: {
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: [String, Number],
      default: '',
    },
  },
}
</script>
