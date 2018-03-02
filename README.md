# vuex-bound [![Build Status](https://travis-ci.org/Vanilla-IceCream/vuex-bound.svg?branch=master)](https://travis-ci.org/Vanilla-IceCream/vuex-bound) [![Coverage Status](https://coveralls.io/repos/github/Vanilla-IceCream/vuex-bound/badge.svg?branch=master)](https://coveralls.io/github/Vanilla-IceCream/vuex-bound?branch=master)

Two-way binding for Vuex.

## Install

```bash
$ npm i vuex-bound -S
# or
$ yarn add vuex-bound
```

## Usage

```js
// constants.js
export const INITIAL = {
  nickname: '',
  autoplay: false,
};

// formControls -> parent module
// templateDriven -> child module
export const STATE_NAME = 'formControls.templateDriven';
```

```html
<template>
  <div>
    <div>
      <v-text-field name="nickname" label="Nickname" v-model="nickname"></v-text-field>
      <div>{{ $td.nickname }}</div>
    </div>

    <div>
      <v-switch label="Autoplay" style="width: 120px" v-model="autoplay"></v-switch>
      <div>{{ $td.autoplay }}</div>
    </div>
  </div>
</template>

<script>
import { mapModelsToState } from 'vuex-bound';

import { STATE_NAME } from './constants';

export default {
  computed: {
    $td() {
      return this.$store.state.formControls.templateDriven;
    },
    ...mapModelsToState(STATE_NAME, [
      'nickname',
      'autoplay',
    ]),
  },
};
</script>
```


```js
// mutations.js
import { updateModel } from 'vuex-bound';

import { STATE_NAME } from './constants';

export default {
  ...updateModel(STATE_NAME),
};
```

```js
// index.js
import TemplateDriven from './TemplateDriven';
import { INITIAL as state } from './constants';
import mutations from './mutations';

// child module
const templateDriven = {
  state,
  mutations,
};

export { TemplateDriven, templateDriven };
```

```js
// index.js
import FormControls from './FormControls';
import { INITIAL as state } from './constants';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

// child module
import { TemplateDriven, templateDriven } from './template-driven';

// parent module
const formControls = {
  state,
  actions,
  mutations,
  getters,
  modules: {
    templateDriven,
  },
};

export { FormControls, formControls, TemplateDriven };
```

```js
// store.js
import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import { formControls } from '~/form-controls';

import { INITIAL as state } from './constants';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
    formControls,
  },
  plugins: [
    createLogger({ collapsed: false }),
  ],
});
```
