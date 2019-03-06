const map = require('@glimmer/reference').map;
const TEMPLATE_ONLY_COMPONENT = require("@glimmer/runtime").TEMPLATE_ONLY_COMPONENT;
const SimpleComponentManager = require("@glimmer/runtime").SimpleComponentManager;
// const HelloGlimmer = require('../../src/ui/components/HelloGlimmer/component');
// import ComponentDefinitionImpl from '@glimmer/component/src/component-definition';
const NativeComponentManager = require("./native-component-manager").NativeComponentManager;
const NativeComponent = require("./native-component").NativeComponent;
const opcodeCompiler = require('@glimmer/opcode-compiler');
const EnvironmentImpl = require('@glimmer/runtime').EnvironmentImpl;
const DocumentNode = require('../dom/DocumentNode');


const {
  Component,
  MINIMAL_CAPABILITIES,
  DEFAULT_CAPABILITIES
} = opcodeCompiler;
// prettier-ignore
const TABLE = [
  // handle 0 is the increment helper
  args => map(args.positional.at(0), (i) => (new Array(i) ).fill('auto').join(' ')),

  // handle 1 is a template only component
  TEMPLATE_ONLY_COMPONENT,

  {
    state: {
      name: 'HelloGlimmer',
      capabilities: DEFAULT_CAPABILITIES,
      ComponentClass: NativeComponent,
      handle: 2,
      hasSymbolTable: true
    },
    manager: new NativeComponentManager(),
  }
];

module.exports = {
  resolve(handle) {
    if (handle < TABLE.length) {
      return TABLE[handle];
    }
  }
}
