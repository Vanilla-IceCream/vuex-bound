# vuex-bound [![Build Status](https://travis-ci.org/Vanilla-IceCream/vuex-bound.svg?branch=master)](https://travis-ci.org/Vanilla-IceCream/vuex-bound) [![Coverage Status](https://coveralls.io/repos/github/Vanilla-IceCream/vuex-bound/badge.svg?branch=master)](https://coveralls.io/github/Vanilla-IceCream/vuex-bound?branch=master)

Vue two-way binding (v-model) for Vuex state and mutations.

## Install

```bash
$ npm i vuex-bound -S
# or
$ yarn add vuex-bound
```

## Usage

```js
import { updateModel } from 'vuex-bound';

const store = new Vuex.Store({
  state: {},
  actions: {},
  mutations: {},
  getters: {},
  modules: {
    a: {
      namespaced: true,
      state: { afoo: '', abar: '' },
      actions: {},
      mutations: { ...updateModel() },
      getters: {},
      modules: {
        b: {
          namespaced: true,
          state: { bfoo: '', bbar: '' },
          actions: {},
          mutations: { ...updateModel() },
          getters: {},
          modules: {
            c: {
              namespaced: true,
              state: { cfoo: '', cbar: '' },
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
    <div>
      <input v-model="afoo">
      <input v-model="abar">
    </div>

    <div>
      <input v-model="bfoo">
      <input v-model="bbar">
    </div>

    <div>
      <input v-model="cfoo">
      <input v-model="cbar">
    </div>
  </div>
</template>

<script>
import { mapModelsToState } from 'vuex-bound';

[...]
  computed: {
    ...mapModelsToState('a', ['afoo', 'abar']),
    ...mapModelsToState('a.b', ['bfoo', 'bbar']),
    ...mapModelsToState('a.b.c', ['cfoo', 'cbar']),
  },
[...]
</script>
```
