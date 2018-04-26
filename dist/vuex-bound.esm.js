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

  keys.forEach(function (key) {
    obj[key] = {
      get: function get() {
        var deep = arr.reduce(function (prev, cur) {
          if (prev && prev[cur]) {
            return prev[cur];
          }

          return null;
        }, this.$store.state);

        return deep ? deep[key] : null;
      },
      set: function set(value) {
        var this$1 = this;

        arr.forEach(function (item, index) {
          if (arr.length === index + 1) {
            var typeName = (arr.join('/')) + "/update";
            this$1.$store.commit(typeName, { label: key, value: value });
          }
        });
      },
    };
  });

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
