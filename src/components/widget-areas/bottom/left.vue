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
    this.model = this.$store.getters['layout/getBottomLeft']
  },
}
</script>

<template>
  <draggable v-if="model" :disabled="!isEditMode" :class="'widget-area '" group="ui">
    <div v-for="(item, index) in model" :key="index">
      <component :is="item.widget.component" v-if="item && item.widget" class="widget"></component>
    </div>
  </draggable>
  <div v-else :class="'widget-area '"></div>
</template>

<!-- <style scoped></style> -->
