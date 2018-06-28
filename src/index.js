export const normalizeMap = map => (
  Array.isArray(map)
    ? map.map(key => ({ key, val: key }))
    : Object.keys(map).map(key => ({ key, val: map[key] }))
);

export const normalizeNamespace = func =>
  (namespace, map) => {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    }

    return func(namespace, map);
  };

export const mapModel = normalizeNamespace((namespace, models) => {
  const res = {};

  normalizeMap(models).forEach(({ key, val }) => {
    res[key] = {
      get() {
        if (typeof val === 'function') val(this.$store.state);

        if (!namespace) return this.$store.state[key];

        return namespace.split('/')
          .reduce((prev, cur) => prev[cur], this.$store.state)[key];
      },
      set(value) {
        const type = !namespace ? 'updateModel' : `${namespace.split('/').join('/')}/updateModel`;

        const valify = String(val);
        const originState = valify.substring(valify.indexOf('.') + 1, valify.indexOf(';'));

        this.$store.commit(type, { label: originState || key, value });
      },
    };
  });

  return res;
});

export const updateModel = () => ({
  updateModel(state, { label, value }) {
    state[label] = value;
  },
});
