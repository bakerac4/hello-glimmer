const Utils = require('@glimmer/util');
const { unreachable, expect, keys, assign, combine } = Utils;
const Reference = require('@glimmer/reference');
const { VersionedPathReference, UpdatableReference, UpdatableDirtyableTag, Tag, CONSTANT_TAG } = Reference;
const NativeComponent = require("./native-component").NativeComponent;

var NativeComponentManager = /** @class */ (function () {
    function NativeComponentManager() {
    }
    NativeComponentManager.prototype.getCapabilities = function (state) {
        return state.capabilities;
    };
    NativeComponentManager.prototype.prepareArgs = function () {
        return null;
    };
    NativeComponentManager.prototype.create = function (_environment, definition, _args, _dynamicScope, _callerSelf, _hasDefaultBlock) {
      let args = _args.named.capture();
      let klass = definition.ComponentClass || NativeComponent;
      let attrs = args.value();
      let component = klass.create({ attrs });

      component.didInitAttrs({ attrs });
      component.didReceiveAttrs({ oldAttrs: null, newAttrs: attrs });
      component.willInsertElement();
      component.willRender();

      return { args, component };
    };
    NativeComponentManager.prototype.getSelf = function (component) {
        return new UpdatableReference(component);
    };
    NativeComponentManager.prototype.getTag = function (args, component) {
        // // const tag = { args: { tag: tag }
        // const tag = args.tag;
        //  return combine([tag, getSelf(component).tag]);
         return CONSTANT_TAG;
    };
    NativeComponentManager.prototype.didCreateElement = function () {};
    NativeComponentManager.prototype.didRenderLayout = function (component, bounds) {
        component.bounds = bounds;
    };
    NativeComponentManager.prototype.didCreate = function (component) {
      // component.didInsertElement();
      // component.didRender();
    };
    NativeComponentManager.prototype.update = function (args, component) {
      let oldAttrs = component.attrs;
      let newAttrs = args.value();

      component.attrs = newAttrs;
      component.didUpdateAttrs({ oldAttrs, newAttrs });
      component.didReceiveAttrs({ oldAttrs, newAttrs });
      component.willUpdate();
      component.willRender();
    };
    NativeComponentManager.prototype.didUpdateLayout = function () {};
    NativeComponentManager.prototype.didUpdate = function (component) {
      component.didUpdate();
      component.didRender();
    };
    NativeComponentManager.prototype.getDestructor = function (component) {
      return {
        destroy() {
          component.destroy();
        },
      };
    };
    return NativeComponentManager;
}());
exports.NativeComponentManager = NativeComponentManager;
