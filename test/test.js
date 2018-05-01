import Vuex from 'vuex';
import { createLocalVue, shallow } from '@vue/test-utils';

import { mapModelsToState, updateModel } from '../src';

process.chdir(__dirname);

const localVue = createLocalVue();

localVue.use(Vuex);

describe('vuex-bound', () => {
  it('should handle mapModelsToState for modules', () => {
    const Component = {
      template: `
        <input id="foo" v-model="foo">
      `,
      computed: {
        ...mapModelsToState('a/b', ['foo']),
      },
    };

    const store = new Vuex.Store({
      modules: {
        a: {
          namespaced: true,
          modules: {
            b: {
              namespaced: true,
              state: { foo: '' },
              actions: {},
              mutations: { ...updateModel() },
              getters: {},
            },
          },
        },
      },
    });

    const wrapper = shallow(Component, { localVue, store });
    wrapper.setData({ foo: 'bar' });

    expect(wrapper).toBeDefined();
  });

  it('should handle mapModelsToState for global', () => {
    const Component = {
      template: `
        <input id="foo" v-model="foo">
      `,
      computed: {
        ...mapModelsToState(['foo']),
      },
    };

    const store = new Vuex.Store({
      state: { foo: 'foo' },
      mutations: { ...updateModel() },
    });

    const wrapper = shallow(Component, { localVue, store });
    wrapper.setData({ foo: 'bar' });

    expect(wrapper).toBeDefined();
  });

  it('should handle updateModel', () => {
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
