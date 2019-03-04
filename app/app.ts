// /*
// In NativeScript, the app.js file is the entry point to your application.
// You can use this file to perform app-level initialization, but the primary
// purpose of the file is to pass control to the app’s first module.
// */
// const nativescriptGlimmer = require("nativescript-glimmer");
// const strip = require("@glimmer/util").strip;
// nativescriptGlimmer(strip`
// <page>
//   <actionbar title="{{this.title}}">
//     <label text="Hello From {{this.title}}"  class="action-label"></label>
//   </actionbar>
//
//   <scrollview sdkExampleTitle sdkToggleNavButton>
//     <gridlayout class="m-15" rows="{{repeat-auto this.items.length}}">
//       {{#each this.items key="@index" as |item i|}}
//         <Row @i={{i}} @item={{item}} />
//       {{/each}}
//     </gridlayout>
//   </scrollview>
// </page>
// `, { title: 'Glimmer Native', items: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'] });

// /*
// Do not place any code after the application has been started as it will not
// be executed on iOS.
// */

const nativescriptGlimmer = require("nativescript-glimmer");
const DocumentNode = require("nativescript-glimmer/lib/dom/DocumentNode");
const ElementNode = require("nativescript-glimmer/lib/dom/ElementNode");
const registerElements = require('nativescript-glimmer/lib/dom/setup-registry');

import { ComponentManager, setPropertyDidChange } from '@glimmer/component';
import App from './main';

registerElements();

const document = new DocumentNode();
let rootFrame = new ElementNode('frame');
document.appendChild(rootFrame);

const app = new App(document, rootFrame);

// const containerElement = document.getElementById('app');

setPropertyDidChange(() => {
  app.scheduleRerender();
});

app.registerInitializer({
  initialize(registry) {
    registry.register(`component-manager:/hello-glimmer/component-managers/main`, ComponentManager);
  }
});

// app.renderComponent('HelloGlimmer', rootFrame, null);
app.boot();
nativescriptGlimmer(document, rootFrame, app, 'HelloGlimmer');
