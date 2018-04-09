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
        <input id="foo" v-model="foo">
        <input id="bar" v-model="bar">
      </div>
    `;

    store = new Vuex.Store({
      state: {},
      modules: {
        a: {
          namespaced: true,
          state: {
            foo: '',
            bar: '',
          },
          mutations: {
            ...updateModel(),
          },
          modules: {
            b: {
              namespaced: true,
              state: {
                foo: '',
                bar: '',
              },
              mutations: {
                ...updateModel(),
              },
              modules: {
                c: {
                  namespaced: true,
                  state: {
                    foo: '',
                    bar: '',
                  },
                  mutations: {
                    ...updateModel(),
                  },
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
        ...mapModelsToState('a', [
          'foo',
          'bar',
        ]),
        ...mapModelsToState('a.b', [
          'foo',
          'bar',
        ]),
        ...mapModelsToState('a.b.c', [
          'foo',
          'bar',
        ]),
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
