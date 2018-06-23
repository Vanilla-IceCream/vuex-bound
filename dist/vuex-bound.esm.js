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

var mapModel = normalizeNamespace(function (namespace, models) {
  var res = {};

  normalizeMap(models).forEach(function (_ref) {
    var key = _ref.key,
        val = _ref.val;

    res[key] = {
      get: function get() {
        if (typeof val === 'function') val(this.$store.state);

        if (!namespace) return this.$store.state[key];

        return namespace.split('/').reduce(function (prev, cur) {
          return prev[cur];
        }, this.$store.state)[key];
      },
      set: function set(value) {
        var type = !namespace ? 'updateModel' : namespace.split('/').join('/') + '/updateModel';

        this.$store.commit(type, { label: key, value: value });
      }
    };
  });

  return res;
});

var updateModel = function updateModel() {
  return {
    updateModel: function updateModel(state, _ref2) {
      var label = _ref2.label,
          value = _ref2.value;

      state[label] = value;
    }
  };
};

export { normalizeMap, normalizeNamespace, mapModel, updateModel };
//# sourceMappingURL=vuex-bound.esm.js.map
