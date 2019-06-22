<script>
import WidgetAreaBottomLeft from '@components/widget-areas/bottom/left'
import WidgetAreaBottomCenter from '@components/widget-areas/bottom/center'
import WidgetAreaBottomRight from '@components/widget-areas/bottom/right'

export default {
  components: {
    WidgetAreaBottomLeft,
    WidgetAreaBottomCenter,
    WidgetAreaBottomRight,
  },
}
</script>

<template>
  <div :class="'widget-area '">
    <WidgetAreaBottomLeft />
    <WidgetAreaBottomCenter />
    <WidgetAreaBottomRight />
  </div>
</template>

<!-- <style scoped></style> -->
