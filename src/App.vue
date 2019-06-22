<script>
import appConfig from '@src/app.config'

export default {
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === 'function' ? title(this.$store) : title
      return title ? `${title} | ${appConfig.title}` : appConfig.title
    },
  },
  async created() {
    await this.$auth
      .renewTokens()
      .then((data) => {
        // console.log(data)
      })
      .catch((/* error */) => {
        // Supress the 'not logged in' error as we can illegitimately get that
        // when processing the callback url
        // console.log(error)
      })
  },
}
</script>

<template>
  <div class="main">
    <!--
    Even when routes use the same component, treat them
    as distinct and create the component again.
    -->
    <RouterView />
  </div>
</template>

<!-- This should generally be the only global CSS in the app. -->
<style scoped>
/* // Allow element/type selectors, because this is global CSS.
// stylelint-disable selector-max-type, selector-class-pattern

// Normalize default styles across browsers,
// https://necolas.github.io/normalize.css/
// @import '~normalize.css/normalize.css';
// Style loading bar between pages.
// https://github.com/rstacruz/nprogress
// @import '~nprogress/nprogress.css';

// Design variables and utilities from src/design.
@import '@design/index.scss'; */

.main {
  @apply h-screen w-full flex flex-col font-sans;

  padding: 1rem;

  /* // position: relative;
  // top: 0;
  // height: 100vh;
  // min-height: 100vh; */
}

/* #nprogress .bar {
  // background: $color-link-text;
} */
</style>
