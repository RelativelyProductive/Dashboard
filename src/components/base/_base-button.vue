<template>
  <component
    :is="tag"
    :type="nativeType"
    :disabled="disabled || loading"
    :class="[
      { 'btn-round': round },
      { 'btn-block': block },
      { 'btn-just-icon': icon },
      { [`btn-${type}`]: type && !outline },
      { [`btn-outline-${type}`]: type && outline },
      { [`btn-${size}`]: size },
      { 'btn-link': simple },
    ]"
    class="btn"
    v-on="$listeners"
  >
    <slot name="loading">
      <i v-if="loading" class="fa fa-spinner fa-spin" />
    </slot>
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'button',
    },
    round: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: Boolean,
      default: false,
    },
    outline: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    simple: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'default',
      validator: (value) => {
        let acceptedValues = [
          'default',
          'primary',
          'info',
          'success',
          'warning',
          'danger',
        ]
        return acceptedValues.indexOf(value) !== -1
      },
    },
    size: {
      type: String,
      default: '',
      validator: (value) => {
        let acceptedValues = ['sm', 'lg']
        return acceptedValues.indexOf(value) !== -1
      },
    },
    nativeType: {
      type: String,
      default: 'button',
    },
  },
}
</script>
