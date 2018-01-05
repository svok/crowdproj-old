import { enableProdMode,  CompilerOptions } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment, getTranslationProviders } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// Loading i18n providers
getTranslationProviders().then(providers => {
    const options: CompilerOptions[] = providers;
    platformBrowserDynamic().bootstrapModule(AppModule, options);
});
