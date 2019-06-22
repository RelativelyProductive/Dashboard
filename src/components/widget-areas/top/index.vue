<script>
import WidgetAreaTopLeft from '@components/widget-areas/top/left'
import WidgetAreaTopCenter from '@components/widget-areas/top/center'
import WidgetAreaTopRight from '@components/widget-areas/top/right'

export default {
  components: {
    WidgetAreaTopLeft,
    WidgetAreaTopCenter,
    WidgetAreaTopRight,
  },
}
</script>

<template>
  <div :class="'widget-area flex items-start '">
    <WidgetAreaTopLeft />
    <WidgetAreaTopCenter />
    <WidgetAreaTopRight />
  </div>
</template>

<!-- <style scoped></style> -->
