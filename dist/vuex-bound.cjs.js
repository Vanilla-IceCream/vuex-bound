'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var normalizeMap = function (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
};

var normalizeNamespace = function (func) {
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

  normalizeMap(models).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = {
      get: function get() {
        if (!namespace) {  // global
          if (typeof val === 'function') {  // func
            val(this.$store.state);
          } else {  // arr
            return this.$store.state[key];
          }
        } else {  // modules
          if (typeof val === 'function') {  // func
            val(this.$store.state);
          } else {  // arr
            return namespace.split('/')
              .reduce(function (prev, cur) { return prev[cur]; }, this.$store.state)[key];
          }
        }
      },
      set: function set(value) {
        if (!namespace) {  // global
          this.$store.commit('update', { label: key, value: value });
        } else {  // modules
          this.$store.commit(((namespace.split('/').join('/')) + "/update"), { label: key, value: value });
        }
      },
    };
  });

  return res;
});

var updateModel = function () { return ({
  update: function update(state, ref) {
    var label = ref.label;
    var value = ref.value;

    // TODO: get nested state
    state[label] = value;
  },
}); };

exports.normalizeMap = normalizeMap;
exports.normalizeNamespace = normalizeNamespace;
exports.mapModelsToState = mapModelsToState;
exports.updateModel = updateModel;
//# sourceMappingURL=vuex-bound.cjs.js.map
