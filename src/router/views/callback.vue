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
  <div class="spinner">
    <!-- <img src="../assets/loading.svg" alt="Loading" /> -->
  </div>
</template>

<style scoped>
.spinner {
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #383838;
}
</style>
