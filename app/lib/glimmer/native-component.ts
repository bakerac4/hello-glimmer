const Utils = require('@glimmer/util');
const { unreachable, expect, keys, assign, combine } = Utils;
const Reference = require('@glimmer/reference');
const { VersionedPathReference, UpdatableReference, UpdatableDirtyableTag, Tag, CONSTANT_TAG } = Reference;
import { metaFor, trackedGet } from '@glimmer/tracking';
import { CURRENT_TAG } from '@glimmer/reference';
// export const EMBERISH_GLIMMER_CAPABILITIES = assign({}, BASIC_CAPABILITIES, {
//   dynamicTag: true,
//   createArgs: true,
//   attributeHook: true,
//   updateHook: true,
//   createInstance: true,
// });
const DESTROYING = Symbol('destroying');
const DESTROYED = Symbol('destroyed');

export interface Bounds {
  firstNode: Node;
  lastNode: Node;
}

export interface ComponentFactory {
  create(injections: object): NativeComponent;
}

export class NativeComponent {
  constructor(owner: Owner, args: T) {
    this.args = args;
  }
  get args() {
    trackedGet(this, 'args');
    return this.__args__;
  }
  set args(args) {
    this.__args__ = args;
    metaFor(this)
      .updatableTagFor('args')
      .inner.update(CURRENT_TAG);
  }
  args: T;
  [DESTROYING] = false;
  [DESTROYED] = false;
  private __args__: any;
  bounds: Bounds;
  get element(): HTMLElement {
    let { bounds } = this;
    assert(bounds && bounds.firstNode === bounds.lastNode, `The 'element' property can only be accessed on components that contain a single root element in their template. Try using 'bounds' instead to access the first and last nodes.`);
    return bounds.firstNode as HTMLElement;
  }
  get isDestroying() {
    return this[DESTROYING];
  }

  get isDestroyed() {
    return this[DESTROYED];
  }
  willDestroy() {}
  didInsertElement() {}
  didUupdate() {}
  // constructor() {
  //   this.dirtinessTag = UpdatableDirtyableTag.create();
  //   this.parentView = null;
  //   this.title = 'Hi';
  // }
  // create(_a) {
  //   var args = _a.attrs;
  //   var c = new this({ attrs: args });
  //   for (var _i = 0, _b = keys(args); _i < _b.length; _i++) {
  //       var key = _b[_i];
  //       c[key] = args[key];
  //   }
  //   return c;
  // }
  // recompute() { }
  // destroy() { }
  // didInitAttrs() { }
  // didReceiveAttrs() { }
  // willInsertElement() { }
  // willUpdate() { }
  // willRender() { }
  // didInsertElement() { }
  // didUpdate() { }
  // didRender() { }
}
// var NativeComponent = /** @class */ (function () {
//   function NativeComponent(_args) {
//       this.dirtinessTag = UpdatableDirtyableTag.create();
//       this.parentView = null;
//   }
//   NativeComponent.create = function (_a) {
//       var args = _a.attrs;
//       var c = new this({ attrs: args });
//       for (var _i = 0, _b = keys(args); _i < _b.length; _i++) {
//           var key = _b[_i];
//           c[key] = args[key];
//       }
//       return c;
//   };
//   NativeComponent.prototype.recompute = function () {
//       getSelf(this).dirty();
//   };
//   NativeComponent.prototype.destroy = function () { };
//   NativeComponent.prototype.didInitAttrs = function (_options) { };
//   NativeComponent.prototype.didUpdateAttrs = function (_diff) { };
//   NativeComponent.prototype.didReceiveAttrs = function (_diff) { };
//   NativeComponent.prototype.willInsertElement = function () { };
//   NativeComponent.prototype.willUpdate = function () { };
//   NativeComponent.prototype.willRender = function () { };
//   NativeComponent.prototype.didInsertElement = function () { };
//   NativeComponent.prototype.didUpdate = function () { };
//   NativeComponent.prototype.didRender = function () { };
//   return NativeComponent;
// }());
// exports.NativeComponent = NativeComponent;
