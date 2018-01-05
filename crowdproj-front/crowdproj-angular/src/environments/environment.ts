// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { CompilerOptions } from '@angular/core';

export const environment = {
    production: false,
    useOldBrowsers: false
};

// return no providers if fail to get translation file for locale
const noProviders: CompilerOptions[] = [];

export function getTranslationProviders(): Promise<CompilerOptions[]> {
        return Promise.resolve(noProviders);
}
