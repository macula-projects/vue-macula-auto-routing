# vue-macula-auto-routing

Generate Vue Router routing automatically for multipages.

forked from ktsn/vue-auto-routing

You may want to use [vue-cli-plugin-macula-auto-routing](https://github.com/macula-projects/vue-cli-plugin-macula-auto-routing) which includes all useful features on routing.

## Installation

```bash
$ npm install -D vue-macula-auto-routing
```

## Usage

vue-macula-auto-routing resolves Vue Router routing automatically by using [vue-macula-auto-routing](https://github.com/macula-projects/vue-macula-auto-routing). The routes are generated with the same rules with [Nuxt routing](https://nuxtjs.org/guide/routing).

To use this, you import `vue-macula-auto-routing` and pass it into Vue Router constructor options.

```js
// Import generated routes
import routes from './routes'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // Pass the generated routes into the routes option
  routes
})
```

You also need to add a webpack plugin vue-macula-auto-routing provides. The plugin options are the same as [vue-macula-auto-routing options](https://github.com/macula-projects/vue-macula-auto-routing#references)

```js
// webpack.config.js

const VueAutoRoutingPlugin = require('vue-macula-auto-routing/lib/webpack-plugin')

module.exports = {
  // ... other options ...

  plugins: [
    new VueAutoRoutingPlugin({
      // Path to the directory that contains your multi pages and page components.
      pages: 'src/modules',

      // A string that will be added to importing component path (default src/modules/).
      importPrefix: 'src/modules/'
    })
  ]
}
```

## Related Projects

* [vue-cli-plugin-macula-auto-routing](https://github.com/macula-projects/vue-cli-plugin-macula-auto-routing): Vue CLI plugin including auto multi pages and layouts resolution.
* [vue-router-layout](https://github.com/ktsn/vue-router-layout): Lightweight layout resolver for Vue Router.
* [vue-macula-route-generator](https://github.com/macula-projects/vue-macula-route-generator): Low-level utility generating routing which vue-macula-auto-routing using under the hood.

## License

MIT
