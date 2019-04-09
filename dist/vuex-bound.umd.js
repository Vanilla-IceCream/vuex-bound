(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.VuexBound = {})));
}(this, (function (exports) { 'use strict';

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
          if (!namespace) {
            var globalState = this.$store.state;

            if (typeof val === 'function') return val(globalState);
            return globalState[key];
          }

          var moduleState = namespace.split('/').reduce(function (prev, cur) {
            return prev[cur];
          }, this.$store.state);

          if (typeof val === 'function') return val(moduleState);
          return moduleState[key];
        },
        set: function set(value) {
          var type = !namespace ? 'updateModel' : namespace.split('/').join('/') + '/updateModel';

          var valify = String(val);
          var originState = valify.substring(valify.indexOf('.') + 1, valify.indexOf(';'));

          this.$store.commit(type, { label: originState || key, value: value });
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

        if (label.includes('.')) {
          var labelKeys = label.split('.').map(function (lk) {
            var arr = [];

            if (/\[\d\]/g.test(lk)) {
              var lkString = lk.substring(lk.length - 3, -1);
              var lkIndex = lk.slice(-2, -1);

              arr.push(lkString, lkIndex);
            } else {
              arr.push(lk);
            }

            return arr;
          }).reduce(function (acc, cur) {
            return acc.concat(cur);
          }, []);

          for (var i = 0; i < labelKeys.length - 1; i += 1) {
            state = state[labelKeys[i]];
          }

          state[labelKeys[labelKeys.length - 1]] = value;
        } else {
          state[label] = value;
        }
      }
    };
  };

  exports.normalizeMap = normalizeMap;
  exports.normalizeNamespace = normalizeNamespace;
  exports.mapModel = mapModel;
  exports.updateModel = updateModel;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
