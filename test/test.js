import Vuex from 'vuex';
import { createLocalVue, shallow } from '@vue/test-utils';

import { mapModelsToState, updateModel } from '../src';

process.chdir(__dirname);

const localVue = createLocalVue();

localVue.use(Vuex);

describe('vuex-bound', () => {
  let [Component, wrapper, store] = [];

  it('should handle mapModelsToState for module name', () => {
    Component = {
      template: `
        <div>
          <input id="text1" v-model="text1">
          <input id="text2" v-model="text2">
        </div>
      `,
      computed: {
        ...mapModelsToState('foo', [
          'text1',
          'text2',
        ]),
      },
    };

    store = new Vuex.Store({
      modules: {
        foo: {
          namespaced: true,
          state: {
            text1: '',
            text2: '',
          },
          mutations: {
            ...updateModel(),
          },
        },
      },
    });

    wrapper = shallow(Component, { localVue, store });

    expect(wrapper).toMatchSnapshot();
  });

  it('should handle mapModelsToState for sub-module name', () => {
    Component = {
      template: `
        <div>
          <input id="text1" v-model="text1">
          <input id="text2" v-model="text2">
        </div>
      `,
      computed: {
        ...mapModelsToState('foo.bar', [
          'text1',
          'text2',
        ]),
      },
    };

    store = new Vuex.Store({
      modules: {
        foo: {
          namespaced: true,
          modules: {
            bar: {
              namespaced: true,
              state: {
                text1: '',
                text2: '',
              },
              mutations: {
                ...updateModel(),
              },
            },
          },
        },
      },
    });

    wrapper = shallow(Component, { localVue, store });

    expect(wrapper).toMatchSnapshot();
  });

  it('should handle mapModelsToState for sub-sub-module name', () => {
    Component = {
      template: `
        <div>
          <input id="text1" v-model="text1">
          <input id="text2" v-model="text2">
        </div>
      `,
      computed: {
        ...mapModelsToState('foo.bar.baz', [
          'text1',
          'text2',
        ]),
      },
    };

    store = new Vuex.Store({
      modules: {
        foo: {
          namespaced: true,
          modules: {
            bar: {
              namespaced: true,
              modules: {
                baz: {
                  namespaced: true,
                  state: {
                    text1: '',
                    text2: '',
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

    wrapper = shallow(Component, { localVue, store });

    expect(wrapper).toMatchSnapshot();
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
