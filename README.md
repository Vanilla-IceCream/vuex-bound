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
// commonjs
const { mapModel, updateModel } = require('vuex-bound');

// es modules
import { mapModel, updateModel } from 'vuex-bound';
```

### UMD

```
// dev
https://unpkg.com/vuex-bound@1.1.0/dist/vuex-bound.umd.js

// prod
https://unpkg.com/vuex-bound@1.1.0/dist/vuex-bound.umd.min.js
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
  state: { foo: '', bar: '' },
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
    <input v-model="foo"> {{ app$.foo }} or {{ foo }}
    <input v-model="bar"> {{ app$.bar }} or {{ bar }}
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { mapModel } from 'vuex-bound';

export default {
  [...]
  computed: {
    // your state
    app$: () => this.$store.state,
    // you will not need it
    // ...mapState(['foo', 'bar'])

    // your model
    ...mapModel(['foo', 'bar']),
    // equal to
    ...mapModel({
      foo: state => state.foo,
      bar: state => state.bar,
    }),

    // your getters
    ...mapGetters(/* ... */),
  },
  methods: {
    // your actions
    ...mapActions(/* ... */),
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
          state: { foo: '', bar: '' },
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
    <input v-model="foo"> {{ b$.foo }} or {{ foo }}
    <input v-model="bar"> {{ b$.bar }} or {{ bar }}
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { mapModel } from 'vuex-bound';

// you will not need it
// const { mapState, mapActions, mapGetters } = createNamespacedHelpers('a/b');

// maybe you can do this
// const namespaced = 'a/b';
// ...mapModel(namespaced, ['foo', 'bar']),
// ...mapGetters(namespaced, /* ... */),
// ...mapActions(namespaced, /* ... */),

export default {
  [...]
  computed: {
    // your state
    b$: () => this.$store.state.a.b,
    // you will not need it
    // ...mapState('a/b', ['foo', 'bar'])

    // your model
    ...mapModel('a/b', ['foo', 'bar']),
    // equal to
    ...mapModel('a/b', {
      foo: state => state.foo,
      bar: state => state.bar,
    }),

    // your getters
    ...mapGetters('a/b', /* ... */),
  },
  methods: {
    // your actions
    ...mapActions('a/b', /* ... */),
  },
  [...]
};
</script>
```
