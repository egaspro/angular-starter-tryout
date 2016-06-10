import 'angular2-universal/polyfills';

import {bootstrap, enableProdMode, BROWSER_ROUTER_PROVIDERS, BROWSER_HTTP_PROVIDERS} from 'angular2-universal';

import {App} from './app/app';

enableProdMode();

// (<any>window).go = function test(){

bootstrap(App, [
  ...BROWSER_ROUTER_PROVIDERS,
  ...BROWSER_HTTP_PROVIDERS
]);
// }