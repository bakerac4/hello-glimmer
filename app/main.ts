import Application, { DOMBuilder, RuntimeCompilerLoader, SyncRenderer } from '@glimmer/application';
import Resolver, { BasicModuleRegistry } from '@glimmer/resolver';
// import moduleMap from './module-map';
// import resolverConfiguration from './resolver-configuration';
export interface Dict<T> {
  [index: string]: T;
}

let map: Dict<any>;
let moduleMap = map;

import { ResolverConfiguration } from '@glimmer/resolver';
let _default: ResolverConfiguration;
let resolverConfiguration = _default;

export default class App extends Application {
  public document: null;
  constructor(document, frame) {
    let moduleRegistry = new BasicModuleRegistry(moduleMap);
    let resolver = new Resolver(resolverConfiguration, moduleRegistry);

    super({
      document,
      builder: new DOMBuilder({ element: frame, nextSibling: null }),
      loader: new RuntimeCompilerLoader(resolver),
      renderer: new SyncRenderer(),
      resolver,
      rootName: 'hello-glimmer'
    });
  }
}
