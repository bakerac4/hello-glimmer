// /*
// In NativeScript, the app.js file is the entry point to your application.
// You can use this file to perform app-level initialization, but the primary
// purpose of the file is to pass control to the app’s first module.
// */
//
// const nativescriptGlimmer = require("./nativescript-glimmer");
// const DocumentNode = require("nativescript-glimmer/lib/dom/DocumentNode");
// const ElementNode = require("nativescript-glimmer/lib/dom/ElementNode");
// const registerElements = require('nativescript-glimmer/lib/dom/setup-registry');
//
// import { ComponentManager, setPropertyDidChange } from '@glimmer/component';
// import App from './src/main';
//
// registerElements();
//
// const document = new DocumentNode();
// let rootFrame = new ElementNode('frame');
// document.appendChild(rootFrame);
// rootFrame.setAttribute("id", "app");
//
// const app = new App(document, rootFrame);
//
// // const containerElement = document.getElementById('app');
//
// setPropertyDidChange(() => {
//   app.scheduleRerender();
// });
//
// app.registerInitializer({
//   initialize(registry) {
//     registry.register(`component-manager:/hello-glimmer/component-managers/main`, ComponentManager);
//   }
// });
//
// // app.renderComponent('HelloGlimmer', rootFrame, null);
// // app.boot();
//
// nativescriptGlimmer(document, rootFrame, app, 'HelloGlimmer');
const registerElements = require('./lib/dom/setup-registry');
registerElements();

const nativescriptGlimmer = require("./nativescript-glimmer");
const application = require("tns-core-modules/application");
const strip = require("@glimmer/util").strip;
nativescriptGlimmer(strip`
<page>
  <HelloGlimmer />
  <scrollview sdkExampleTitle sdkToggleNavButton>
    <gridlayout class="m-15" rows="{{repeat-auto this.items.length}}">
      {{#each this.items key="@index" as |item i|}}
        <Row @i={{i}} @item={{item}} />
      {{/each}}
    </gridlayout>
  </scrollview>
</page>
`, { title: 'Glimmer Native', items: ['a', 'b', 'c'] });
