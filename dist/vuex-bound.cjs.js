'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mapModelsToState = function (state, keys) {
  var obj = {};
  var arr = state.split('.');

  var loop = function ( i, l ) {
    obj[keys[i]] = {
      get: function get() {
        if (arr.length === 1) {
          return this.$store.state[arr[0]][keys[i]];
        }

        if (arr.length === 2) {
          return this.$store.state[arr[0]][arr[1]][keys[i]];
        }
      },
      set: function set(value) {
        if (arr.length === 1) {
          var module = arr[0].charAt(0).toUpperCase() + arr[0].slice(1);
          this.$store.commit(("update" + module), { label: [keys[i]], value: value });
        }

        if (arr.length === 2) {
          var moduleParent = arr[0].charAt(0).toUpperCase() + arr[0].slice(1);
          var moduleChild = arr[1].charAt(0).toUpperCase() + arr[1].slice(1);
          this.$store.commit(("update" + moduleParent + moduleChild), { label: [keys[i]], value: value });
        }
      }
    };
  };

  for (var i = 0, l = keys.length; i < l; i++) loop( i, l );

  return obj;
};

var updateModel = function (commitName) {
  var obj, obj$1;

  var arr = commitName.split('.');

  if (arr.length === 1) {
    var module = arr[0].charAt(0).toUpperCase() + arr[0].slice(1);

    return ( obj = {}, obj[("update" + module)] = function (state, ref) {
        var label = ref.label;
        var value = ref.value;

        state[label] = value;
      }, obj);
  }

  if (arr.length === 2) {
    var moduleParent = arr[0].charAt(0).toUpperCase() + arr[0].slice(1);
    var moduleChild = arr[1].charAt(0).toUpperCase() + arr[1].slice(1);

    return ( obj$1 = {}, obj$1[("update" + moduleParent + moduleChild)] = function (state, ref) {
        var label = ref.label;
        var value = ref.value;

        state[label] = value;
      }, obj$1);
  }
};

exports.mapModelsToState = mapModelsToState;
exports.updateModel = updateModel;
//# sourceMappingURL=vuex-bound.cjs.js.map
