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
        if (!namespace) {  // for global
          if (typeof val === 'function') {  // handle objects
            val(this.$store.state);  // TODO: nested state
          } else {  // handle arrays
            return this.$store.state[key];
          }
        } else {  // for modules
          if (typeof val === 'function') {  // handle objects
            val(this.$store.state);  // TODO: nested state
          } else {  // handle arrays
            return namespace.split('/')
              .reduce((prev, cur) => prev[cur], this.$store.state)[key];
          }
        }
      },
      set(value) {
        if (!namespace) {  // for global
          this.$store.commit('update', { label: key, value });
        } else {  // for modules
          this.$store.commit(`${namespace.split('/').join('/')}/update`, { label: key, value });
        }
      },
    };
  });

  return res;
});

export const updateModel = () => ({
  update(state, { label, value }) {
    state[label] = value;
  },
});
