import Vuex from 'vuex';
import { createLocalVue, shallowMount } from '@vue/test-utils';

import { mapModel, updateModel } from '../src';

process.chdir(__dirname);

const localVue = createLocalVue();

localVue.use(Vuex);

describe('vuex-bound', () => {
  it('should handle mapModel with array for global', () => {
    const Component = {
      template: `
        <input id="foo" v-model="foo">
      `,
      computed: {
        ...mapModel(['foo']),
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

  it('should handle mapModel wtih object for global', () => {
    const Component = {
      template: `
        <input id="foo" v-model="myFoo">
      `,
      computed: {
        ...mapModel({ myFoo: state => state.foo }),
      },
    };

    const store = new Vuex.Store({
      state: { foo: 'foo' },
      mutations: { ...updateModel() },
    });

    const wrapper = shallowMount(Component, { localVue, store });

    expect(store.state.foo).toMatch('foo');

    wrapper.setData({ myFoo: 'bar' });
    expect(store.state.foo).toMatch('bar');
  });

  it('should handle mapModel with array for modules', () => {
    const Component = {
      template: `
        <input id="foo" v-model="foo">
      `,
      computed: {
        ...mapModel('a/b', ['foo']),
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

  it('should handle mapModel with object for modules', () => {
    const Component = {
      template: `
        <input id="foo" v-model="myFoo">
      `,
      computed: {
        ...mapModel('a/b', { myFoo: state => state.foo }),
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

    wrapper.setData({ myFoo: 'bar' });
    expect(store.state.a.b.foo).toMatch('bar');
  });
});
