import Vuex from 'vuex';
import { createLocalVue, shallowMount } from '@vue/test-utils';

import { mapModelsToState, updateModel } from '../src';

process.chdir(__dirname);

const localVue = createLocalVue();

localVue.use(Vuex);

describe('vuex-bound', () => {
  it('should handle mapModelsToState with array for modules', () => {
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
              state: { foo: 'foo' },
              mutations: { ...updateModel() },
            },
          },
        },
      },
    });

    const wrapper = shallowMount(Component, { localVue, store });

    expect(store.state.a.b.foo).toMatch('foo');

    wrapper.setData({ foo: 'bar' });
    expect(store.state.a.b.foo).toMatch('bar');
  });

  it('should handle mapModelsToState with object for modules', () => {
    const Component = {
      template: `
        <input id="foo" v-model="foo">
      `,
      computed: {
        ...mapModelsToState('a/b', { foo: state => state.foo }),
      },
    };

    const store = new Vuex.Store({
      modules: {
        a: {
          namespaced: true,
          modules: {
            b: {
              namespaced: true,
              state: { foo: 'foo' },
              mutations: { ...updateModel() },
            },
          },
        },
      },
    });

    const wrapper = shallowMount(Component, { localVue, store });

    expect(store.state.a.b.foo).toMatch('foo');

    wrapper.setData({ foo: 'bar' });
    expect(store.state.a.b.foo).toMatch('bar');
  });

  it('should handle mapModelsToState with array for global', () => {
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

    const wrapper = shallowMount(Component, { localVue, store });

    expect(store.state.foo).toMatch('foo');

    wrapper.setData({ foo: 'bar' });
    expect(store.state.foo).toMatch('bar');
  });

  it('should handle mapModelsToState wtih object for global', () => {
    const Component = {
      template: `
        <input id="foo" v-model="foo">
      `,
      computed: {
        ...mapModelsToState({ foo: state => state.foo }),
      },
    };

    const store = new Vuex.Store({
      state: { foo: 'foo' },
      mutations: { ...updateModel() },
    });

    const wrapper = shallowMount(Component, { localVue, store });

    expect(store.state.foo).toMatch('foo');

    wrapper.setData({ foo: 'bar' });
    expect(store.state.foo).toMatch('bar');
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

    expect(state.field).toMatch('change');
  });
});
