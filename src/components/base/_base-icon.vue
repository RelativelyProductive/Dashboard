<template>
  <FontAwesomeIcon v-if="source === 'font-awesome'" v-bind="$attrs" :icon="name" />
  <span v-else-if="source === 'custom'" v-bind="$attrs" :class="customIconClass" />
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library as fontAwesomeIconLibrary } from '@fortawesome/fontawesome-svg-core'
import camelCase from 'lodash/camelCase'

// https://fontawesome.com/icons
fontAwesomeIconLibrary.add(
  require('@fortawesome/free-solid-svg-icons/faSitemap').definition,
  require('@fortawesome/free-solid-svg-icons/faCog').definition,
  require('@fortawesome/free-solid-svg-icons/faSignOutAlt').definition,
  require('@fortawesome/free-solid-svg-icons/faSync').definition,
  require('@fortawesome/free-solid-svg-icons/faUser').definition,
  require('@fortawesome/free-solid-svg-icons/faUsers').definition,
  require('@fortawesome/free-solid-svg-icons/faColumns').definition,
  require('@fortawesome/free-solid-svg-icons/faCrown').definition,
  require('@fortawesome/free-solid-svg-icons/faBell').definition,
  require('@fortawesome/free-solid-svg-icons/faAdjust').definition,
  require('@fortawesome/free-solid-svg-icons/faCloudSun').definition,
  require('@fortawesome/free-solid-svg-icons/faChevronUp').definition,
  require('@fortawesome/free-solid-svg-icons/faChevronDown').definition,
  require('@fortawesome/free-solid-svg-icons/faChevronRight').definition,
  require('@fortawesome/free-solid-svg-icons/faChevronLeft').definition,
  require('@fortawesome/free-solid-svg-icons/faChevronCircleUp').definition,
  require('@fortawesome/free-solid-svg-icons/faChevronCircleDown').definition,
  require('@fortawesome/free-solid-svg-icons/faChevronCircleRight').definition,
  require('@fortawesome/free-solid-svg-icons/faChevronCircleLeft').definition,
  require('@fortawesome/free-solid-svg-icons/faCheckCircle').definition,
  require('@fortawesome/free-solid-svg-icons/faTimesCircle').definition,
  require('@fortawesome/free-solid-svg-icons/faAngleUp').definition,
  require('@fortawesome/free-solid-svg-icons/faAngleDown').definition,
  require('@fortawesome/free-solid-svg-icons/faAngleRight').definition,
  require('@fortawesome/free-solid-svg-icons/faAngleLeft').definition,
  require('@fortawesome/free-solid-svg-icons/faCircle').definition,
  require('@fortawesome/free-solid-svg-icons/faDotCircle').definition
)

export default {
  components: {
    FontAwesomeIcon,
  },
  inheritAttrs: false,
  props: {
    source: {
      type: String,
      default: 'font-awesome',
    },
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    // Gets a CSS module class, e.g. iconCustomLogo
    customIconClass() {
      return this.$style[camelCase('icon-custom-' + this.name)]
    },
  },
}
</script>
