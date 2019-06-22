<script>
import WidgetAreaRightTop from '@components/widget-areas/right/top'
import WidgetAreaRightMiddle from '@components/widget-areas/right/middle'
import WidgetAreaRightBottom from '@components/widget-areas/right/bottom'

export default {
  components: {
    WidgetAreaRightTop,
    WidgetAreaRightMiddle,
    WidgetAreaRightBottom,
  },
}
</script>

<template>
  <div class="column is-2 widget-area-right">
    <WidgetAreaRightTop />
    <WidgetAreaRightMiddle />
    <WidgetAreaRightBottom />
  </div>
</template>

<!-- <style scoped></style> -->
