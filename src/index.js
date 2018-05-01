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

  // modules
  const arr = moduleName.split('/');

  keys.forEach((key) => {
    obj[key] = {
      get() {
        return arr.reduce((prev, cur) => prev[cur], this.$store.state)[key];
      },
      set(value) {
        this.$store.commit(`${arr.join('/')}/update`, { label: key, value });
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
