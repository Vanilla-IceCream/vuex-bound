export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

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

        if (arr.length === 3) {
          return this.$store.state[arr[0]][arr[1]][arr[2]][keys[i]];
        }
      },
      set(value) {
        if (arr.length === 1) {
          const module = capitalize(arr[0]);
          this.$store.commit(`update${module}`, { label: [keys[i]], value });
        }

        if (arr.length === 2) {
          const [moduleParent, moduleChild] = [capitalize(arr[0]), capitalize(arr[1])];
          this.$store.commit(`update${moduleParent}${moduleChild}`, { label: [keys[i]], value });
        }

        if (arr.length === 3) {
          const [moduleParent, moduleChild, moduleSubChild] = [capitalize(arr[0]), capitalize(arr[1]), capitalize(arr[2])];
          this.$store.commit(`update${moduleParent}${moduleChild}${moduleSubChild}`, { label: [keys[i]], value });
        }
      },
    };
  }

  return obj;
};

export const updateModel = (commitName) => {
  const arr = commitName.split('.');

  if (arr.length === 1) {
    const module = capitalize(arr[0]);

    return {
      [`update${module}`](state, { label, value }) {
        state[label] = value;
      },
    };
  }

  if (arr.length === 2) {
    const [moduleParent, moduleChild] = [capitalize(arr[0]), capitalize(arr[1])];

    return {
      [`update${moduleParent}${moduleChild}`](state, { label, value }) {
        state[label] = value;
      },
    };
  }

  if (arr.length === 3) {
    const [moduleParent, moduleChild, moduleSubChild] = [capitalize(arr[0]), capitalize(arr[1]), capitalize(arr[2])];

    return {
      [`update${moduleParent}${moduleChild}${moduleSubChild}`](state, { label, value }) {
        state[label] = value;
      },
    };
  }
};
