import { CompilerOptions } from '@angular/core';

export const environment = {
    production: true,
    useOldBrowsers: false
};

// return no providers if fail to get translation file for locale
const noProviders: CompilerOptions[] = [];

export function getTranslationProviders(): Promise<CompilerOptions[]> {
        return Promise.resolve(noProviders);
}
