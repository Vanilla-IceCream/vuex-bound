'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var capitalize = function (str) { return str.charAt(0).toUpperCase() + str.slice(1); };

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

        if (arr.length === 3) {
          return this.$store.state[arr[0]][arr[1]][arr[2]][keys[i]];
        }
      },
      set: function set(value) {
        if (arr.length === 1) {
          var module = capitalize(arr[0]);
          this.$store.commit(("update" + module), { label: [keys[i]], value: value });
        }

        if (arr.length === 2) {
          var ref = [capitalize(arr[0]), capitalize(arr[1])];
          var moduleParent = ref[0];
          var moduleChild = ref[1];
          this.$store.commit(("update" + moduleParent + moduleChild), { label: [keys[i]], value: value });
        }

        if (arr.length === 3) {
          var ref$1 = [capitalize(arr[0]), capitalize(arr[1]), capitalize(arr[2])];
          var moduleParent$1 = ref$1[0];
          var moduleChild$1 = ref$1[1];
          var moduleSubChild = ref$1[2];
          this.$store.commit(("update" + moduleParent$1 + moduleChild$1 + moduleSubChild), { label: [keys[i]], value: value });
        }
      },
    };
  };

  for (var i = 0, l = keys.length; i < l; i++) loop( i, l );

  return obj;
};

var updateModel = function (commitName) {
  var obj, obj$1, obj$2;

  var arr = commitName.split('.');

  if (arr.length === 1) {
    var module = capitalize(arr[0]);

    return ( obj = {}, obj[("update" + module)] = function (state, ref) {
        var label = ref.label;
        var value = ref.value;

        state[label] = value;
      }, obj);
  }

  if (arr.length === 2) {
    var ref = [capitalize(arr[0]), capitalize(arr[1])];
    var moduleParent = ref[0];
    var moduleChild = ref[1];

    return ( obj$1 = {}, obj$1[("update" + moduleParent + moduleChild)] = function (state, ref) {
        var label = ref.label;
        var value = ref.value;

        state[label] = value;
      }, obj$1);
  }

  if (arr.length === 3) {
    var ref$1 = [capitalize(arr[0]), capitalize(arr[1]), capitalize(arr[2])];
    var moduleParent$1 = ref$1[0];
    var moduleChild$1 = ref$1[1];
    var moduleSubChild = ref$1[2];

    return ( obj$2 = {}, obj$2[("update" + moduleParent$1 + moduleChild$1 + moduleSubChild)] = function (state, ref) {
        var label = ref.label;
        var value = ref.value;

        state[label] = value;
      }, obj$2);
  }
};

exports.capitalize = capitalize;
exports.mapModelsToState = mapModelsToState;
exports.updateModel = updateModel;
//# sourceMappingURL=vuex-bound.cjs.js.map
