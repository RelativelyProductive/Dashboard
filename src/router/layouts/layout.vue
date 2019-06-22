<script>
import appConfig from '@src/app.config'
import MainContent from '@components/content'
import WidgetAreaTop from '@components/widget-areas/top'
// import WidgetAreaLeft from '@components/widget-areas/left'
// import WidgetAreaRight from '@components/widget-areas/right'
import WidgetAreaBottom from '@components/widget-areas/bottom'

export default {
  page: {
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    WidgetAreaTop,
    // WidgetAreaLeft,
    MainContent,
    // WidgetAreaRight,
    WidgetAreaBottom,
  },
}
</script>

<template>
  <div class="container">
    <WidgetAreaTop />
    <div class="container">
      <!-- <WidgetAreaLeft /> -->
      <MainContent />
      <!-- <WidgetAreaRight /> -->
    </div>
    <WidgetAreaBottom />
  </div>
</template>

<style scoped>
/* // Allow element/type selectors, because this is global CSS.
// stylelint-disable selector-max-type, selector-class-pattern */

.container {
  @apply w-full max-w-full;

  height: calc(100% - 64px);
}
</style>
