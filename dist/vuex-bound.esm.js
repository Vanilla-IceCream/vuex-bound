var normalize = function (func) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    }

    return func(namespace, map);
  };
};

var mapModelsToState = normalize(function (moduleName, keys) {
  var obj = {};

  // global
  if (moduleName === '') {
    keys.forEach(function (key) {
      obj[key] = {
        get: function get() {
          return this.$store.state[key];
        },
        set: function set(value) {
          this.$store.commit('update', { label: key, value: value });
        },
      };
    });

    return obj;
  }

  // namespaced
  var arr = moduleName.split('/');

  var loop = function ( i, l ) {
    obj[keys[i]] = {
      get: function get() {
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
      set: function set(value) {
        if (arr.length === 1) {
          var module = arr[0];
          this.$store.commit((module + "/update"), { label: [keys[i]], value: value });
        }

        if (arr.length === 2) {
          var ref = [arr[0], arr[1]];
          var moduleParent = ref[0];
          var moduleChild = ref[1];
          this.$store.commit((moduleParent + "/" + moduleChild + "/update"), { label: [keys[i]], value: value });
        }

        if (arr.length === 3) {
          var ref$1 = [arr[0], arr[1], arr[2]];
          var moduleParent$1 = ref$1[0];
          var moduleChild$1 = ref$1[1];
          var moduleSubChild = ref$1[2];
          this.$store.commit((moduleParent$1 + "/" + moduleChild$1 + "/" + moduleSubChild + "/update"), { label: [keys[i]], value: value });
        }
      },
    };
  };

  for (var i = 0, l = keys.length; i < l; i++) loop( i, l );

  return obj;
});

var updateModel = function () { return ({
  update: function update(state, ref) {
    var label = ref.label;
    var value = ref.value;

    state[label] = value;
  },
}); };

export { normalize, mapModelsToState, updateModel };
//# sourceMappingURL=vuex-bound.esm.js.map
