<script>
// import store from '@state/store'
import { layoutComputed } from '@state/helpers'
import draggable from 'vuedraggable'

export default {
  components: {
    draggable,
  },
  data() {
    return {
      model: null,
    }
  },
  computed: {
    ...layoutComputed,
  },
  mounted() {
    this.model = this.$store.getters['layout/getBottomRight']
  },
}
</script>

<template>
  <draggable v-if="model" :disabled="!isEditMode" :class="'widget-area '" group="ui">
    <div v-for="(item, index) in model" :key="index" class="widget" style="text-align: right">
      <component :is="item.widget.component" v-if="item && item.widget"></component>
    </div>
  </draggable>
  <div v-else :class="'widget-area '"></div>
</template>

<!-- <style scoped></style> -->
