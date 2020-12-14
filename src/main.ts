import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as HelixUI from "helix-ui";

import { AppModule } from './app/app.module';
import { environment } from 'env/environment';

console.log("env angular front end ", environment);


if (environment.production) {
  enableProdMode();
}

const start = async () => {
  await HelixUI.default.initialize();
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
}

start();