# vuex-bound [![Build Status](https://travis-ci.org/Vanilla-IceCream/vuex-bound.svg?branch=master)](https://travis-ci.org/Vanilla-IceCream/vuex-bound) [![Coverage Status](https://coveralls.io/repos/github/Vanilla-IceCream/vuex-bound/badge.svg?branch=master)](https://coveralls.io/github/Vanilla-IceCream/vuex-bound?branch=master)

Vue two-way binding (v-model) for Vuex state and mutations.

## Install

```bash
$ npm i vuex-bound -S
# or
$ yarn add vuex-bound
```

## Usage

Because each model must be written once.

```html
<template>
  <div>
    <input v-model="text1">
    <input v-model="text2">
  </div>
</template>

<script>
[...]
  computed: {
    text1: {
      get() {
        return this.$store.state.obj.message;
      },
      set(value) {
        this.$store.commit('updateText1', value);
      },
    },
    text2: {
      get() {
        return this.$store.state.obj.message;
      },
      set(value) {
        this.$store.commit('updateText2', value);
      },
    },
  },
[...]
</script>
```

```js
[...]
  mutations: {
    updateText1(state, message) {
      state.obj.message = message;
    },
    updateText2(state, message) {
      state.obj.message = message;
    },
  },
[...]
```

So packaged as a utility function.

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
    ...mapModelsToState('obj.message', [
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
    ...updateModel('obj.message'),
  },
[...]
```
