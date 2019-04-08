# vuex-bound [![Build Status](https://travis-ci.org/Vanilla-IceCream/vuex-bound.svg?branch=master)](https://travis-ci.org/Vanilla-IceCream/vuex-bound) [![Coverage Status](https://coveralls.io/repos/github/Vanilla-IceCream/vuex-bound/badge.svg?branch=master)](https://coveralls.io/github/Vanilla-IceCream/vuex-bound?branch=master)

Vue two-way binding (v-model) for Vuex state and mutations.

## Installation and Usage

### CJS or ESM

```bash
$ npm i vuex-bound -S
# or
$ yarn add vuex-bound
```

```js
// for commonjs
const { mapModel, updateModel } = require('vuex-bound');

// for es modules
import { mapModel, updateModel } from 'vuex-bound';
```

### UMD

```
// dev
https://unpkg.com/vuex-bound@1.2.0/dist/vuex-bound.umd.js
// or shorten (use the latest version)
https://unpkg.com/vuex-bound

// prod
https://unpkg.com/vuex-bound@1.2.0/dist/vuex-bound.umd.min.js
```

```html
<script src="https://unpkg.com/vue" defer></script>
<script src="https://unpkg.com/vue-router" defer></script>
<script src="https://unpkg.com/vuex" defer></script>
<script src="https://unpkg.com/vuex-bound" defer></script>
```

```js
const { mapModel, updateModel } = VuexBound;
```

## Getting Started

### Global

```js
import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import { updateModel } from 'vuex-bound';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    foo: '',
    bar: { baz: '' },
  },
  actions: {},
  mutations: { ...updateModel() },
  getters: {},
  plugins: [createLogger({ collapsed: false })],
});

export default store;
```

```html
<template>
  <div>
    <!-- basic -->
    <input v-model="foo"> {{ foo }}

    <!-- custom name -->
    <input v-model="fooCustom"> {{ fooCustom }}

    <!-- nested object -->
    <input v-model="barBaz"> {{ barBaz }}
  </div>
</template>

<script>
import { mapModel } from 'vuex-bound';

export default {
  [...]
  computed: {
    // your model
    ...mapModel(['foo']),
    // equal to
    ...mapModel({ foo: state => state.foo }),

    // custom name
    ...mapModel({ fooCustom: state => state.foo }),

    // nested object
    ...mapModel({ barBaz: state => state.bar.baz }),
  },
  [...]
};
</script>
```

### Modules

```js
import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import { updateModel } from 'vuex-bound';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    a: {
      namespaced: true,
      modules: {
        b: {
          namespaced: true,
          state: {
            foo: '',
            bar: { baz: '' },
          },
          actions: {},
          mutations: { ...updateModel() },
          getters: {},
        },
      },
    },
  },
  plugins: [createLogger({ collapsed: false })],
});

export default store;
```

```html
<template>
  <div>
    <!-- basic -->
    <input v-model="foo"> {{ foo }}

    <!-- custom name -->
    <input v-model="fooCustom"> {{ fooCustom }}

    <!-- nested object -->
    <input v-model="barBaz"> {{ barBaz }}
  </div>
</template>

<script>
import { mapModel } from 'vuex-bound';

export default {
  [...]
  computed: {
    // your model
    ...mapModel('a/b', ['foo']),
    // equal to
    ...mapModel('a/b', { foo: state => state.foo }),

    // custom name
    ...mapModel('a/b', { fooCustom: state => state.foo }),

    // nested object
    ...mapModel('a/b', { barBaz: state => state.bar.baz }),
  },
  [...]
};
</script>
```
