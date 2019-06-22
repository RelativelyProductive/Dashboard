<template>
  <div class="container">
    <Transition name="fade" mode="out-in">
      <!-- your content here -->
      <RouterView :key="$route.fullPath" />
    </Transition>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss">
// Allow element/type selectors, because this is global CSS.
// stylelint-disable selector-max-type, selector-class-pattern

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
