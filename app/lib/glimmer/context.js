const precompile = require("@glimmer/compiler").precompile;
const opcodeCompiler = require('@glimmer/opcode-compiler');
const {
  Component,
  MINIMAL_CAPABILITIES,
  DEFAULT_CAPABILITIES
} = opcodeCompiler;

const CAPABILITIES = {
  attributeHook: true,
  createArgs: true,
  createCaller: false,
  createInstance: true,
  dynamicLayout: false,
  dynamicScope: false,
  dynamicTag: true,
  elementHook: true,
  prepareArgs: false,
  updateHook: true,
  wrapped: false,
};


/**
 * Ideally we precompile all the templates through a
 * through a plugin at build time. This is done just
 * for demo purposes.
 */
function Compilable(source) {
  return Component(precompile(source));
}

exports.Compilable = Compilable;

// COMPONENTS and HELPERS are normally created as a sideffect of compiling
const COMPONENTS = {
  Row: {
    source: `<label class="h3 m-5" height="30" row="{{@i}}" text="{{@item}}"></label>`,
    handle: 1,
    capabilities: MINIMAL_CAPABILITIES
  },
  HelloGlimmer: {
    source: `
      <actionbar title="{{this.title}}">
        <label text="Hello From {{this.title}}"  class="action-label"></label>
      </actionbar>
    `,
    handle: 2,
    capabilities: CAPABILITIES
  }
};
const HELPERS = {
  'repeat-auto': 0
};

exports.RESOLVER_DELEGATE = {
  lookupComponent(
    name
  ) {
    let component = COMPONENTS[name];
    if (component === null) return null;

    let { handle, source, capabilities } = component;

    return {
      handle,
      compilable: Compilable(source),
      capabilities
    };
  },

  lookupHelper(name) {
    if (name in HELPERS) return HELPERS[name];
  }
};
