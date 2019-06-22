<script>
import WidgetAreaLeftTop from '@components/widget-areas/left/top'
import WidgetAreaLeftMiddle from '@components/widget-areas/left/middle'
import WidgetAreaLeftBottom from '@components/widget-areas/left/bottom'

export default {
  components: {
    WidgetAreaLeftTop,
    WidgetAreaLeftMiddle,
    WidgetAreaLeftBottom,
  },
}
</script>

<template>
  <div class="column is-2 widget-area-left">
    <WidgetAreaLeftTop />
    <WidgetAreaLeftMiddle />
    <WidgetAreaLeftBottom />
  </div>
</template>

<!-- <style scoped></style> -->
