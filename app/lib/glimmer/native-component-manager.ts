const Utils = require('@glimmer/util');
const { unreachable, expect, keys, assign, combine } = Utils;
const Reference = require('@glimmer/reference');
const { RootReference, VersionedPathReference, UpdatableReference, UpdatableDirtyableTag, Tag, CONSTANT_TAG } = Reference;
const NativeComponent = require("./native-component").NativeComponent;

const EMPTY_SELF = new RootReference(null);
const NOOP_DESTROYABLE = { destroy() {} };

export default class Bounds {
  constructor(__bounds) {
  }

  get firstNode(): Node {
    return this._bounds.firstNode() as Node;
  }

  get lastNode(): Node {
    return this._bounds.lastNode() as Node;
  }
}

export class ComponentStateBucket {
  public name: string;
  public component: Component;
  private args: CapturedArguments;

  constructor(
    definition: DefinitionState,
    args: CapturedArguments,
  ) {
    let { ComponentClass, name } = definition;
    this.args = args;

    if (ComponentClass) {
      if (ComponentClass.class !== undefined) {
        ComponentClass = ComponentClass.class;
      }

      this.component = new ComponentClass(this.namedArgsSnapshot());
      this.component.debugName = name;
    }
  }

  get tag(): Tag {
    return this.args.tag;
  }

  namedArgsSnapshot(): Readonly<Dict<unknown>> {
    let snapshot = this.args.named.value();
    return Object.freeze(snapshot);
  }
}

export class NativeComponentManager {
  getCapabilities(state) {
    return state.capabilities;
  }
  prepareArgs() {
    return null;
  }
  create(environment, definition, args, _dynamicScope, _caller, _hasDefaultBlock) {
    if (definition.ComponentClass) {
      return new ComponentStateBucket(definition, args.capture());
    }
  }
  getSelf(bucket) {
    if (bucket) {
      return new RootReference(bucket.component);
    }
    return EMPTY_SELF;
  }
  didCreateElement() { }
  didRenderLayout(bucket, bounds) {
    if (!bucket) {
      return;
    }
    bucket.component.bounds = new Bounds(bounds);
  }
  didCreate(bucket) {
    if (!bucket) {
      return;
    }
    bucket.component.didInsertElement();
  }
  getTag(bucket) {
    if (!bucket) {
      return CONSTANT_TAG;
    }
    return bucket.tag;
  }
  update() {
    if (!bucket) {
      return;
    }
    bucket.component.args = bucket.namedArgsSnapshot();
  }
  didUpdateLayout() {}
  didUpdate() {}
  getDestructor(bucket) {
    if (!bucket) {
      return NOOP_DESTROYABLE;
    }

    return {
      destroy() {
        bucket.component[DESTROYING] = true;
        bucket.component.willDestroy();
        bucket.component[DESTROYED] = true;
      },
    };
  }
}
//
// var NativeComponentManager = /** @class */ (function () {
//     function NativeComponentManager() {
//     }
//     NativeComponentManager.prototype.getCapabilities = function (state) {
//         return state.capabilities;
//     };
//     NativeComponentManager.prototype.prepareArgs = function () {
//         return null;
//     };
//     NativeComponentManager.prototype.create = function (_environment, definition, _args, _dynamicScope, _callerSelf, _hasDefaultBlock) {
//       let args = _args.named.capture();
//       let klass = definition.ComponentClass || NativeComponent;
//       let attrs = args.value();
//       let component = klass.create({ attrs });
//
//       component.didInitAttrs({ attrs });
//       component.didReceiveAttrs({ oldAttrs: null, newAttrs: attrs });
//       component.willInsertElement();
//       component.willRender();
//
//       return { args, component };
//     };
//     NativeComponentManager.prototype.getSelf = function (component) {
//         return new UpdatableReference(component);
//     };
//     NativeComponentManager.prototype.getTag = function (args, component) {
//         // // const tag = { args: { tag: tag }
//         // const tag = args.tag;
//         //  return combine([tag, getSelf(component).tag]);
//         return this.args.tag;
//     };
//     NativeComponentManager.prototype.didCreateElement = function () {};
//     NativeComponentManager.prototype.didRenderLayout = function (component, bounds) {
//         component.bounds = bounds;
//     };
//     NativeComponentManager.prototype.didCreate = function (manager) {
//       manager.component.didInsertElement();
//       manager.component.didRender();
//     };
//     NativeComponentManager.prototype.update = function (args, component) {
//       let oldAttrs = component.attrs;
//       let newAttrs = args.value();
//
//       component.attrs = newAttrs;
//       component.didUpdateAttrs({ oldAttrs, newAttrs });
//       component.didReceiveAttrs({ oldAttrs, newAttrs });
//       component.willUpdate();
//       component.willRender();
//     };
//     NativeComponentManager.prototype.didUpdateLayout = function () {};
//     NativeComponentManager.prototype.didUpdate = function (manager) {
//       manager.component.didUpdate();
//       manager.component.didRender();
//     };
//     NativeComponentManager.prototype.getDestructor = function (component) {
//       return {
//         destroy() {
//           component.destroy();
//         },
//       };
//     };
//     return NativeComponentManager;
// }());
// exports.NativeComponentManager = NativeComponentManager;
