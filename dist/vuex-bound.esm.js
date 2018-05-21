var normalizeMap = function normalizeMap(map) {
  return Array.isArray(map) ? map.map(function (key) {
    return { key: key, val: key };
  }) : Object.keys(map).map(function (key) {
    return { key: key, val: map[key] };
  });
};

var normalizeNamespace = function normalizeNamespace(func) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    }

    return func(namespace, map);
  };
};

var mapModelsToState = normalizeNamespace(function (namespace, models) {
  var res = {};

  normalizeMap(models).forEach(function (_ref) {
    var key = _ref.key,
        val = _ref.val;

    res[key] = {
      get: function get() {
        if (!namespace) {
          // for global
          if (typeof val === 'function') {
            // handle objects
            val(this.$store.state); // TODO: nested state
          } else {
            // handle arrays
            return this.$store.state[key];
          }
        } else {
          // for modules
          if (typeof val === 'function') {
            // handle objects
            val(this.$store.state); // TODO: nested state
          } else {
            // handle arrays
            return namespace.split('/').reduce(function (prev, cur) {
              return prev[cur];
            }, this.$store.state)[key];
          }
        }
      },
      set: function set(value) {
        if (!namespace) {
          // for global
          this.$store.commit('updateModel', { label: key, value: value });
        } else {
          // for modules
          this.$store.commit(namespace.split('/').join('/') + '/updateModel', { label: key, value: value });
        }
      }
    };
  });

  return res;
});

var mapModel = mapModelsToState;

var updateModel = function updateModel() {
  return {
    updateModel: function updateModel(state, _ref2) {
      var label = _ref2.label,
          value = _ref2.value;

      state[label] = value;
    }
  };
};

export { normalizeMap, normalizeNamespace, mapModelsToState, mapModel, updateModel };
//# sourceMappingURL=vuex-bound.esm.js.map
