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
  state: { foo: '', bar: '' },
  actions: {},
  mutations: { ...updateModel() },
  getters: {},
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
    <input v-model="foo"> {{ $b.foo }}
    <input v-model="bar"> {{ $b.bar }}
  </div>
</template>

<script>
import { mapModelsToState } from 'vuex-bound';

// you will not need it
// const { mapState, mapActions, mapGetters } = createNamespacedHelpers('a/b');

// maybe you can do this
// const namespace = 'a/b';
// ...mapModelsToState(namespace, ['foo', 'bar']),
// ...mapGetters(namespace, Object.keys(getters)),
// ...mapActions(namespace, Object.keys(actions)),

export default {
  [...]
  computed: {
    // your state
    $b: () => this.$store.state.a.b,
    // you will not need it
    // ...mapState({ /* ... */ })

    // your models
    ...mapModelsToState('a/b', ['foo', 'bar']),

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

## To Do

Without namespace

```js
import { mapModelsToState } from 'vuex-bound';

[...]
  computed: {
    ...mapModelsToState(['foo', 'bar']),
  },
[...]
```
