// App-specific config

// Using CommonJS instead of ES2015+ export, because we also need to
// provide this object to Webpack in vue.config.js.
module.exports = {
  title: 'Relatively Productive Dashboard',
  description:
    'A Quantified Self and Goal tracker Dashboard built for Relatively Productive listeners',
}
