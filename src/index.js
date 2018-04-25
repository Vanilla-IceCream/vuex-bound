// TODO: reducer
// export const getModuleName = (state) =>
//   name =>
//     name.split('.').reduce((acc, val) => acc[val], state);

export const normalize = (func) => {
  return (namespace, map) => {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    }

    return func(namespace, map);
  };
};

export const mapModelsToState = normalize((moduleName, keys) => {
  const obj = {};

  // global
  if (moduleName === '') {
    keys.forEach((key) => {
      obj[key] = {
        get() {
          return this.$store.state[key];
        },
        set(value) {
          this.$store.commit('update', { label: key, value });
        },
      };
    });

    return obj;
  }

  // namespaced
  const arr = moduleName.split('/');

  keys.forEach((key) => {
    obj[key] = {
      get() {
        // TODO: reducer
        // arr.reduce((acc, val, index) => {
        //   if (arr.length === index + 1) {
        //     return this.$store.state[][key];
        //   }
        // }, []);

        if (arr.length === 1) {
          return this.$store.state[arr[0]][key];
        }

        if (arr.length === 2) {
          return this.$store.state[arr[0]][arr[1]][key];
        }

        if (arr.length === 3) {
          return this.$store.state[arr[0]][arr[1]][arr[2]][key];
        }
      },
      set(value) {
        if (arr.length === 1) {
          const module = arr[0];
          this.$store.commit(`${module}/update`, { label: key, value });
        }

        if (arr.length === 2) {
          const [moduleParent, moduleChild] = [arr[0], arr[1]];
          this.$store.commit(`${moduleParent}/${moduleChild}/update`, { label: key, value });
        }

        if (arr.length === 3) {
          const [moduleParent, moduleChild, moduleSubChild] = [arr[0], arr[1], arr[2]];
          this.$store.commit(`${moduleParent}/${moduleChild}/${moduleSubChild}/update`, { label: key, value });
        }
      },
    };
  });

  return obj;
});

export const updateModel = () => ({
  update(state, { label, value }) {
    state[label] = value;
  },
});
