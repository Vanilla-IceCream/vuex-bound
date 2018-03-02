export const mapModelsToState = (state, keys) => {
  const obj = {};
  const arr = state.split('.');

  for (let i = 0, l = keys.length; i < l; i++) {
    obj[keys[i]] = {
      get() {
        if (arr.length === 1) {
          return this.$store.state[arr[0]][keys[i]];
        }

        if (arr.length === 2) {
          return this.$store.state[arr[0]][arr[1]][keys[i]];
        }
      },
      set(value) {
        if (arr.length === 1) {
          const module = arr[0].charAt(0).toUpperCase() + arr[0].slice(1);
          this.$store.commit(`update${module}`, { label: [keys[i]], value });
        }

        if (arr.length === 2) {
          const moduleParent = arr[0].charAt(0).toUpperCase() + arr[0].slice(1);
          const moduleChild = arr[1].charAt(0).toUpperCase() + arr[1].slice(1);
          this.$store.commit(`update${moduleParent}${moduleChild}`, { label: [keys[i]], value });
        }
      },
    };
  }

  return obj;
};

export const updateModel = (commitName) => {
  const arr = commitName.split('.');

  if (arr.length === 1) {
    const module = arr[0].charAt(0).toUpperCase() + arr[0].slice(1);

    return {
      [`update${module}`](state, { label, value }) {
        state[label] = value;
      },
    };
  }

  if (arr.length === 2) {
    const moduleParent = arr[0].charAt(0).toUpperCase() + arr[0].slice(1);
    const moduleChild = arr[1].charAt(0).toUpperCase() + arr[1].slice(1);

    return {
      [`update${moduleParent}${moduleChild}`](state, { label, value }) {
        state[label] = value;
      },
    };
  }
};
