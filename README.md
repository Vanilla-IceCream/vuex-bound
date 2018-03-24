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
// store.js
const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
    crud: {
      namespaced: true,
      modules: {
        basic: {
          namespaced: true,
          state,
          actions,
          mutations,
          getters,
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
    <input v-model="text1">
    <input v-model="text2">
  </div>
</template>

<script>
import { mapModelsToState } from 'vuex-bound';

[...]
  computed: {
    ...mapModelsToState('crud.basic', [
      'text1',
      'text2',
    ]),
  },
[...]
</script>
```

```js
import { updateModel } from 'vuex-bound';

[...]
  mutations: {
    ...updateModel(),
  },
[...]
```
