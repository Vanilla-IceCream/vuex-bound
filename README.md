# vuex-bound [![Build Status](https://travis-ci.org/Vanilla-IceCream/vuex-bound.svg?branch=main)](https://travis-ci.org/Vanilla-IceCream/vuex-bound) [![Coverage Status](https://coveralls.io/repos/github/Vanilla-IceCream/vuex-bound/badge.svg?branch=main)](https://coveralls.io/github/Vanilla-IceCream/vuex-bound?branch=main)

Vue two-way binding (v-model) for Vuex state and mutations.

## Installation and Usage

```bash
$ npm i vuex-bound -S
# or
$ pnpm i vuex-bound -S
# or
$ yarn add vuex-bound
```

```js
// for commonjs
const { mapModel, updateModel } = require('vuex-bound');

// for es modules
import { mapModel, updateModel } from 'vuex-bound';
```

## Getting Started

### Global

```js
/**
 * Vuex 3
 */
import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import { updateModel } from 'vuex-bound';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    foo: '',
    bar: { baz: '' },
    db: [
      { mongo: '3' },
    ],
  },
  getters: {},
  mutations: { ...updateModel() },
  actions: {},
  plugins: [createLogger({ collapsed: false })],
});

export default store;

/**
 * Vuex 4
 */
import { createStore, createLogger } from 'vuex';
import { updateModel } from 'vuex-bound';

export const store = createStore({
  state: {
    foo: '',
    bar: { baz: '' },
    db: [
      { mongo: '3' },
    ],
  },
  getters: {},
  mutations: { ...updateModel() },
  actions: {},
  plugins: [createLogger({ collapsed: false })],
});
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

    <!-- nested object with array -->
    <input v-model="mongo"> {{ mongo }}
  </div>
</template>

<script>
import { mapModel } from 'vuex-bound';

export default {
  computed: {
    // your model
    ...mapModel(['foo']),
    // equal to
    ...mapModel({ foo: state => state.foo }),

    ...mapModel({
      // custom name
      fooCustom: state => state.foo,

      // nested object
      barBaz: state => state.bar.baz,

      // nested object with array
      mongo: state => state.db[0].mongo,
    }),
  },
};
</script>
```

:warning: WARNING

Frankly, `state` is static, you cannot use [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) and rename it because it will not be able to update the value.

### Modules

```js
/**
 * Vuex 3
 */
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
            db: [
              { mongo: '3' },
            ],
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

/**
 * Vuex 4
 */
import { createStore, createLogger } from 'vuex';
import { updateModel } from 'vuex-bound';

export const store = createStore({
  modules: {
    a: {
      namespaced: true,
      modules: {
        b: {
          namespaced: true,
          state: {
            foo: '',
            bar: { baz: '' },
            db: [
              { mongo: '3' },
            ],
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

    <!-- nested object with array -->
    <input v-model="mongo"> {{ mongo }}
  </div>
</template>

<script>
import { mapModel } from 'vuex-bound';

export default {
  computed: {
    // your model
    ...mapModel('a/b', ['foo']),
    // equal to
    ...mapModel('a/b', { foo: state => state.foo }),

    ...mapModel('a/b', {
      // custom name
      fooCustom: state => state.foo,

      // nested object
      barBaz: state => state.bar.baz,

      // nested object with array
      mongo: state => state.db[0].mongo,
    }),
  },
};
</script>
```

## API

### `mapModel`

Type: `mapModel(namespace?: string, map: Array<string> | Object<function>): Object`

### `updateModel`

Type: `updateModel(): Object`
