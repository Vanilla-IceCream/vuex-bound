import Vuex from 'vuex';
import { createLocalVue, shallowMount } from '@vue/test-utils';

import { mapModel, updateModel } from '../src';

process.chdir(__dirname);

const localVue = createLocalVue();

localVue.use(Vuex);

describe('vuex-bound', () => {
  describe('global', () => {
    it('should handle array', () => {
      const Component = {
        template: `
          <div>
            <input v-model="foo"> {{ foo }}
          </div>
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

      expect(wrapper.html()).toMatchSnapshot();
      expect(store.state.foo).toMatch('foo');

      wrapper.setData({ foo: 'bar' });
      expect(wrapper.html()).toMatchSnapshot();
      expect(store.state.foo).toMatch('bar');
    });

    it('should handle object', () => {
      const Component = {
        template: `
          <div>
            <input v-model="fooCustom"> {{ fooCustom }}
          </div>
        `,
        computed: {
          ...mapModel({ fooCustom: state => state.foo }),
        },
      };

      const store = new Vuex.Store({
        state: { foo: 'foo' },
        mutations: { ...updateModel() },
      });

      const wrapper = shallowMount(Component, { localVue, store });

      expect(wrapper.html()).toMatchSnapshot();
      expect(store.state.foo).toMatch('foo');

      wrapper.setData({ fooCustom: 'bar' });
      expect(wrapper.html()).toMatchSnapshot();
      expect(store.state.foo).toMatch('bar');
    });

    it('should handle nested object', () => {
      const Component = {
        template: `
          <div>
            <input v-model="fooBarCustom"> {{ fooBarCustom }}
          </div>
        `,
        computed: {
          ...mapModel({ fooBarCustom: state => state.foo.bar }),
        },
      };

      const store = new Vuex.Store({
        state: { foo: { bar: 'fooBar' } },
        mutations: { ...updateModel() },
      });

      const wrapper = shallowMount(Component, { localVue, store });

      expect(wrapper.html()).toMatchSnapshot();
      expect(store.state.foo.bar).toMatch('fooBar');

      wrapper.setData({ fooBarCustom: 'newFooBar' });
      expect(wrapper.html()).toMatchSnapshot();
      expect(store.state.foo.bar).toMatch('newFooBar');
    });

    it('should handle nested object with array', () => {
      const Component = {
        template: `
          <div>
            <input v-model="mongo"> {{ mongo }}
          </div>
        `,
        computed: {
          ...mapModel({ mongo: state => state.db[0].mongo }),
        },
      };

      const store = new Vuex.Store({
        state: {
          db: [
            { mongo: '3' },
          ],
        },
        mutations: { ...updateModel() },
      });

      const wrapper = shallowMount(Component, { localVue, store });

      expect(wrapper.html()).toMatchSnapshot();
      expect(store.state.db[0].mongo).toMatch('3');

      wrapper.setData({ mongo: '4' });
      expect(wrapper.html()).toMatchSnapshot();
      expect(store.state.db[0].mongo).toMatch('4');
    });
  });

  describe('modules', () => {
    it('should handle array', () => {
      const Component = {
        template: `
          <div>
            <input v-model="foo"> {{ foo }}
          </div>
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

      expect(wrapper.html()).toMatchSnapshot();
      expect(store.state.a.b.foo).toMatch('foo');

      wrapper.setData({ foo: 'bar' });
      expect(wrapper.html()).toMatchSnapshot();
      expect(store.state.a.b.foo).toMatch('bar');
    });

    it('should handle object', () => {
      const Component = {
        template: `
          <div>
            <input v-model="fooCustom"> {{ fooCustom }}
          </div>
        `,
        computed: {
          ...mapModel('a/b', { fooCustom: state => state.foo }),
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

      expect(wrapper.html()).toMatchSnapshot();
      expect(store.state.a.b.foo).toMatch('foo');

      wrapper.setData({ fooCustom: 'bar' });
      expect(wrapper.html()).toMatchSnapshot();
      expect(store.state.a.b.foo).toMatch('bar');
    });

    it('should handle nested object', () => {
      const Component = {
        template: `
          <div>
            <input v-model="fooBarCustom"> {{ fooBarCustom }}
          </div>
        `,
        computed: {
          ...mapModel('a/b', { fooBarCustom: state => state.foo.bar }),
        },
      };

      const store = new Vuex.Store({
        modules: {
          a: {
            namespaced: true,
            modules: {
              b: {
                namespaced: true,
                state: { foo: { bar: 'fooBar' } },
                mutations: { ...updateModel() },
              },
            },
          },
        },
      });

      const wrapper = shallowMount(Component, { localVue, store });

      expect(wrapper.html()).toMatchSnapshot();
      expect(store.state.a.b.foo.bar).toMatch('fooBar');

      wrapper.setData({ fooBarCustom: 'newFooBar' });
      expect(wrapper.html()).toMatchSnapshot();
      expect(store.state.a.b.foo.bar).toMatch('newFooBar');
    });

    it('should handle nested object with array', () => {
      const Component = {
        template: `
          <div>
            <input v-model="mongo"> {{ mongo }}
          </div>
        `,
        computed: {
          ...mapModel('a/b', { mongo: state => state.db[0].mongo }),
        },
      };

      const store = new Vuex.Store({
        modules: {
          a: {
            namespaced: true,
            modules: {
              b: {
                namespaced: true,
                state: {
                  db: [
                    { mongo: '3' },
                  ],
                },
                mutations: { ...updateModel() },
              },
            },
          },
        },
      });

      const wrapper = shallowMount(Component, { localVue, store });

      expect(wrapper.html()).toMatchSnapshot();
      expect(store.state.a.b.db[0].mongo).toMatch('3');

      wrapper.setData({ mongo: '4' });
      expect(wrapper.html()).toMatchSnapshot();
      expect(store.state.a.b.db[0].mongo).toMatch('4');
    });
  });
});
