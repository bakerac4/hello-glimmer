const State = require("@glimmer/object-reference").State;
const Context = require("@glimmer/opcode-compiler").Context;
const artifacts = require("@glimmer/program").artifacts;

const r = require("@glimmer/runtime");
const { renderAot, renderSync, AotRuntime } = r;

const ctx = require('./context');
const { RESOLVER_DELEGATE, Compilable } = ctx;

const RUNTIME_RESOLVER = require('./resolver');

//Name, parent node
module.exports = async function renderComponent(str, node) {
  let c = Context(RESOLVER_DELEGATE);
  let main = Compilable(str).compile(c);
  let payload = artifacts(c);
  let runtime = AotRuntime(document, payload, RUNTIME_RESOLVER);
  let state = State(data);
  let cursor = { element: element, nextSibling: null };


  let iterator = renderAot(runtime, main, cursor, state);
  return result = renderSync(runtime.env, iterator);
}
