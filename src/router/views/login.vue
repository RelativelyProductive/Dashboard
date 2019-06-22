<script>
export default {
  page: {
    title: 'Log in',
  },
  data: function() {
    return {
      profile: null,
      name: null,
    }
  },
  computed: {},
  created() {
    window.addEventListener('keyup', (e) => {
      if (e.key.toLowerCase() === 'enter') {
        this.$auth.login()
      }
    })
  },
  mounted: function() {
    this.$nextTick(function() {
      this.profile = this.$auth.getProfile()
      if (!this.profile) this.profile = this.$auth.getPersonalization()
    })
  },
  methods: {},
}
</script>

<template>
  <div class="container mx-auto">
    <div class="greeting">
      <h1>Hello, {{ profile ? profile.given_name : '' }}</h1>
      <input v-if="!profile" v-model="name" class="name" />
    </div>
    <div :class="(profile && profile.given_name) || name ? 'info' : 'info invisible'"
      >Press enter to log in</div
    >
  </div>
</template>

<style scoped>
.container {
  @apply min-h-full flex flex-col justify-center items-center;
}

.greeting {
  @apply flex flex-row justify-center;
}

.info {
  @apply text-gray-500 text-center;

  opacity: 0;
  transition: opacity 300ms cubic-bezier(0.165, 0.63, 0.14, 0.82),
    transform 500ms cubic-bezier(0.165, 0.63, 0.14, 0.82);
  transform: rotate(0deg) translateX(0) translateY(20px);
}

.greeting:hover + .info {
  opacity: 1;
  transform: rotate(0deg) translateX(0) translateY(10px);
}

.name {
  @apply text-6xl border-black border-solid border-b-2 ml-4 w-2/5 text-center outline-none leading-snug;
}
</style>
