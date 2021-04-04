// @flow

export const normalizeMap = (map: string[] | Object) => (
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
        if (!namespace) {
          const globalState = this.$store.state;

          if (typeof val === 'function') return val(globalState);
          return globalState[key];
        }

        const moduleState = namespace.split('/')
          .reduce((prev, cur) => prev[cur], this.$store.state);

        if (typeof val === 'function') return val(moduleState);
        return moduleState[key];
      },
      set(value) {
        const type = !namespace ? 'updateModel' : `${namespace.split('/').join('/')}/updateModel`;

        let originState = val;

        if (typeof val === 'function') {
          const valify = String(val);

          originState = valify.substring(
            valify.indexOf('state.') + 6,
            valify.indexOf(';') === -1 ? undefined : valify.indexOf(';'),
          );
        }

        this.$store.commit(type, { label: originState, value });
      },
    };
  });

  return res;
});

export const updateModel = () => ({
  updateModel(state, { label, value }) {
    if (label.includes('.')) {
      const labelKeys = label.split('.')
        .map((lk) => {
          const arr = [];

          if (/\[\d\]/g.test(lk)) {
            const lkString = lk.substring(lk.length - 3, -1);
            const lkIndex = lk.slice(-2, -1);

            arr.push(lkString, lkIndex);
          } else {
            arr.push(lk);
          }

          return arr;
        })
        .reduce((acc, cur) => acc.concat(cur), []);

      for (let i = 0; i < labelKeys.length - 1; i += 1) {
        state = state[labelKeys[i]];
      }

      state[labelKeys[labelKeys.length - 1]] = value;
    } else {
      state[label] = value;
    }
  },
});
