import Vuex from 'vuex';
import { createLocalVue, shallow } from '@vue/test-utils';

import { mapModelsToState, updateModel } from '../src';

process.chdir(__dirname);

const localVue = createLocalVue();

localVue.use(Vuex);

describe('vuex-bound', () => {
  let [template, store] = [];
  let [Component, wrapper] = [];

  beforeAll(() => {
    template = `
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
    `;

    store = new Vuex.Store({
      state: {},
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
    });
  });

  it('should handle mapModelsToState for module name', () => {
    Component = {
      template,
      computed: {
        ...mapModelsToState('a', ['afoo', 'abar']),
        ...mapModelsToState('a/b', ['bfoo', 'bbar']),
        ...mapModelsToState('a/b/c', ['cfoo', 'cbar']),
      },
    };

    wrapper = shallow(Component, { localVue, store });

    expect(wrapper).toBeDefined();
  });

  it('should handle updateModel for module name', () => {
    const state = {
      field: 'name',
    };

    const payload = {
      label: 'field',
      value: 'change',
    };

    updateModel().update(state, payload);

    expect(state.field).toBe('change');
  });
});
