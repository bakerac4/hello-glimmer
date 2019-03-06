const Utils = require('@glimmer/util');
const { unreachable, expect, keys, assign, combine } = Utils;
const Reference = require('@glimmer/reference');
const { VersionedPathReference, UpdatableReference, UpdatableDirtyableTag, Tag, CONSTANT_TAG } = Reference;
// export const EMBERISH_GLIMMER_CAPABILITIES = assign({}, BASIC_CAPABILITIES, {
//   dynamicTag: true,
//   createArgs: true,
//   attributeHook: true,
//   updateHook: true,
//   createInstance: true,
// });
// var nativeComponent = class NativeComponent {
//
//   constructor() {
//     this.dirtinessTag = UpdatableDirtyableTag.create();
//     this.parentView = null;
//     this.title = 'Hi';
//   }
//   create(_a) {
//     var args = _a.attrs;
//     var c = new this({ attrs: args });
//     for (var _i = 0, _b = keys(args); _i < _b.length; _i++) {
//         var key = _b[_i];
//         c[key] = args[key];
//     }
//     return c;
//   }
//   recompute() { }
//   destroy() { }
//   didInitAttrs() { }
//   didReceiveAttrs() { }
//   willInsertElement() { }
//   willUpdate() { }
//   willRender() { }
//   didInsertElement() { }
//   didUpdate() { }
//   didRender() { }
// }
var NativeComponent = /** @class */ (function () {
  function NativeComponent(_args) {
      this.dirtinessTag = UpdatableDirtyableTag.create();
      this.parentView = null;
      this.title = 'Hi';
  }
  NativeComponent.create = function (_a) {
      var args = _a.attrs;
      var c = new this({ attrs: args });
      for (var _i = 0, _b = keys(args); _i < _b.length; _i++) {
          var key = _b[_i];
          c[key] = args[key];
      }
      return c;
  };
  NativeComponent.prototype.recompute = function () {
      getSelf(this).dirty();
  };
  NativeComponent.prototype.destroy = function () { };
  NativeComponent.prototype.didInitAttrs = function (_options) { };
  NativeComponent.prototype.didUpdateAttrs = function (_diff) { };
  NativeComponent.prototype.didReceiveAttrs = function (_diff) { };
  NativeComponent.prototype.willInsertElement = function () { };
  NativeComponent.prototype.willUpdate = function () { };
  NativeComponent.prototype.willRender = function () { };
  NativeComponent.prototype.didInsertElement = function () { };
  NativeComponent.prototype.didUpdate = function () { };
  NativeComponent.prototype.didRender = function () { };
  return NativeComponent;
}());
exports.NativeComponent = NativeComponent;
