const application = require("tns-core-modules/application");
const ElementNode = require('./lib/dom/ElementNode');
const State = require("@glimmer/object-reference").State;
const Context = require("@glimmer/opcode-compiler").Context;
const artifacts = require("@glimmer/program").artifacts;
const r = require("@glimmer/runtime");
const { renderAot, renderSync, AotRuntime } = r;
const ctx = require('./lib/glimmer/context');
const DocumentNode = require('./lib/dom/DocumentNode');
const registerElements = require('./lib/dom/setup-registry');
const { RESOLVER_DELEGATE, Compilable } = ctx;
const RUNTIME_RESOLVER = require('./lib/glimmer/resolver');

module.exports = function nativescriptGlimmer(str, data) {
    let document = new DocumentNode();
    //setup a frame so we always have somewhere to hang our css
    let frame = new ElementNode('frame');
    frame.setAttribute("id", "app-root-frame");
    //
    // document.appendChild(rootFrame);
    let c = Context(RESOLVER_DELEGATE);
    let main = Compilable(str).compile(c);
    let payload = artifacts(c);
    let runtime = AotRuntime(document, payload, RUNTIME_RESOLVER);
    let state = State(data);
    let cursor = { element: frame, nextSibling: null };

    return new Promise((resolve, reject) => {
        //wait for launch
        application.on(application.launchEvent, () => {

            let iterator = renderAot(runtime, main, cursor, state);
            result = renderSync(runtime.env, iterator);

            // This is super hacky and likely needs to be abstracted away.
            frame.nativeView.navigate({
                create: () => {
                  return frame.firstElement().nativeView
                }
            });
        })

        try {
            application.run({
                create() {
                    return frame.nativeView;
                }
            });
        } catch (e) {
            reject(e);
        }
    });
}
