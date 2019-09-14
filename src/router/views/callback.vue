<script>
export default {
  page: {
    title: 'Callback',
  },
  created() {
    this.$auth.handleAuthentication()
  },
  methods: {
    handleLoginEvent(data) {
      this.$router.push(data.state.target || '/')
    },
  },
}
</script>

<template>
  <div class="loader">
    <div class="col">
      <h1>Loading..</h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
.loader {
  @apply absolute flex justify-center;

  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: #383838;

  .col {
    @apply flex flex-col justify-center;

    h1 {
      @apply text-white;
    }
  }
}
</style>
