export const normalizeMap = (map) => {
  return Array.isArray(map)
    ? map.map(key => ({ key, val: key }))
    : Object.keys(map).map(key => ({ key, val: map[key] }))
};

export const normalizeNamespace = (func) => {
  return (namespace, map) => {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    }

    return func(namespace, map);
  };
};

export const mapModelsToState = normalizeNamespace((namespace, models) => {
  const res = {};

  normalizeMap(models).forEach(({ key, val }) => {
    res[key] = {
      get() {
        if (!namespace) {  // global
          if (typeof val === 'function') {  // func
            val(this.$store.state);
          } else {  // arr
            return this.$store.state[key];
          }
        } else {  // modules
          if (typeof val === 'function') {  // func
            val(this.$store.state);
          } else {  // arr
            return namespace.split('/')
              .reduce((prev, cur) => prev[cur], this.$store.state)[key];
          }
        }
      },
      set(value) {
        if (!namespace) {  // global
          this.$store.commit('update', { label: key, value });
        } else {  // modules
          this.$store.commit(`${namespace.split('/').join('/')}/update`, { label: key, value });
        }
      },
    };
  });

  return res;
});

export const updateModel = () => ({
  update(state, { label, value }) {
    // TODO: get nested state
    state[label] = value;
  },
});
