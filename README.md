# vuex-bound [![Build Status](https://travis-ci.org/Vanilla-IceCream/vuex-bound.svg?branch=master)](https://travis-ci.org/Vanilla-IceCream/vuex-bound) [![Coverage Status](https://coveralls.io/repos/github/Vanilla-IceCream/vuex-bound/badge.svg?branch=master)](https://coveralls.io/github/Vanilla-IceCream/vuex-bound?branch=master)

Vue two-way binding (v-model) for Vuex state and mutations.

## Install

### CJS or ESM

```bash
$ npm i vuex-bound -S
# or
$ yarn add vuex-bound
```

```js
const { mapModel, updateModel } = require('vuex-bound');

import { mapModel, updateModel } from 'vuex-bound';
```

### UMD

```
https://unpkg.com/vuex-bound@0.7.0/dist/vuex-bound.umd.js
https://unpkg.com/vuex-bound@0.7.0/dist/vuex-bound.umd.min.js
```

```js
const { mapModel, updateModel } = VuexBound;
```

## Usage

### Global

```js
import { updateModel } from 'vuex-bound';

const store = new Vuex.Store({
  state: { foo: '', bar: '' },
  actions: {},
  mutations: { ...updateModel() },
  getters: {},
  plugins: [
    process.env.NODE_ENV === 'development' && createLogger({ collapsed: false }),
  ].filter(Boolean),
});
```

```html
<template>
  <div>
    <input v-model="foo"> {{ $app.foo }} or {{ foo }}
    <input v-model="bar"> {{ $app.bar }} or {{ bar }}
  </div>
</template>

<script>
export default {
  [...]
  computed: {
    // your state
    $app: () => this.$store.state,
    // you will not need it
    // ...mapState(['foo', 'bar'])

    // your models
    ...mapModel(['foo', 'bar']),
    // equal to
    ...mapModel({
      foo: state => state.foo,
      bar: state => state.bar,
    }),

    // your getters
    ...mapGetters(Object.keys(getters)),
  },
  methods: {
    // your actions
    ...mapActions(Object.keys(actions)),
  },
  [...]
};
</script>
```

### Modules

```js
import { updateModel } from 'vuex-bound';

const store = new Vuex.Store({
  modules: {
    a: {
      namespaced: true,
      state: { foo: '', bar: '' },
      actions: {},
      mutations: { ...updateModel() },
      getters: {},
      modules: {
        b: {
          namespaced: true,
          state: { foo: '', bar: '' },
          actions: {},
          mutations: { ...updateModel() },
          getters: {},
          modules: {
            c: {
              namespaced: true,
              state: { foo: '', bar: '' },
              actions: {},
              mutations: { ...updateModel() },
              getters: {},
            },
          },
        },
      },
    },
  },
  plugins: [
    process.env.NODE_ENV === 'development' && createLogger({ collapsed: false }),
  ].filter(Boolean),
});
```

```html
<template>
  <div>
    <input v-model="foo"> {{ $b.foo }} or {{ foo }}
    <input v-model="bar"> {{ $b.bar }} or {{ bar }}
  </div>
</template>

<script>
import { mapModel } from 'vuex-bound';

// you will not need it
// const { mapState, mapActions, mapGetters } = createNamespacedHelpers('a/b');

// maybe you can do this
// const namespace = 'a/b';
// ...mapModel(namespace, ['foo', 'bar']),
// ...mapGetters(namespace, Object.keys(getters)),
// ...mapActions(namespace, Object.keys(actions)),

export default {
  [...]
  computed: {
    // your state
    $b: () => this.$store.state.a.b,
    // you will not need it
    // ...mapState('a/b', ['foo', 'bar'])

    // your models
    ...mapModel('a/b', ['foo', 'bar']),
    // equal to
    ...mapModel('a/b', {
      foo: state => state.foo,
      bar: state => state.bar,
    }),

    // your getters
    ...mapGetters('a/b', Object.keys(getters)),
  },
  methods: {
    // your actions
    ...mapActions('a/b', Object.keys(actions)),
  },
  [...]
};
</script>
```
