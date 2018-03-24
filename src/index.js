export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

// TODO: reducer
// export const getModuleName = (state) =>
//   name =>
//     name.split('.').reduce((acc, val) => acc[val], state);

export const mapModelsToState = (moduleName, keys) => {
  const obj = {};
  const arr = moduleName.split('.');

  for (let i = 0, l = keys.length; i < l; i++) {
    obj[keys[i]] = {
      get() {
        // TODO: reducer
        // arr.reduce((acc, val, index) => {
        //   if (arr.length === index + 1) {
        //     return this.$store.state[][keys[i]];
        //   }
        // }, []);

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
          this.$store.commit(`${module}/update`, { label: [keys[i]], value });
        }

        if (arr.length === 2) {
          const [moduleParent, moduleChild] = [capitalize(arr[0]), capitalize(arr[1])];
          this.$store.commit(`${moduleParent}/${moduleChild}/update`, { label: [keys[i]], value });
        }

        if (arr.length === 3) {
          const [moduleParent, moduleChild, moduleSubChild] = [capitalize(arr[0]), capitalize(arr[1]), capitalize(arr[2])];
          this.$store.commit(`${moduleParent}/${moduleChild}/${moduleSubChild}/update`, { label: [keys[i]], value });
        }
      },
    };
  }

  return obj;
};

export const updateModel = () => ({
  update(state, { label, value }) {
    state[label] = value;
  },
});
