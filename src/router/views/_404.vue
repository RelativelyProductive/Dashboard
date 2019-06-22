<script>
export default {
  page: {
    title: '404',
    meta: [{ name: 'description', content: '404' }],
  },
  props: {
    resource: {
      type: String,
      default: '',
    },
  },
}
</script>

<template>
  <div class="container mx-auto">
    <h1>
      404
      <template v-if="resource">
        {{ resource }}
      </template>
      Not Found
    </h1>
  </div>
</template>

<style scoped>
.container {
  @apply min-h-full flex flex-col justify-center items-center;
}
</style>
