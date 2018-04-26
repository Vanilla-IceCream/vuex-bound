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
        const deep = arr.reduce((prev, cur) => {
          if (prev && prev[cur]) {
            return prev[cur];
          }

          return null;
        }, this.$store.state);

        return deep ? deep[key] : null;
      },
      set(value) {
        arr.forEach((item, index) => {
          if (arr.length === index + 1) {
            const typeName = `${arr.join('/')}/update`;
            this.$store.commit(typeName, { label: key, value });
          }
        });
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
