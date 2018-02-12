/**
 *
 * Copyright © 2017 Sergey Okatov. All rights reserved.
 * Author: Sergey Okatov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID, MissingTranslationStrategy, CompilerOptions } from '@angular/core';
import { CompilerConfig } from '@angular/compiler';

export const environment = {
    production: true,
    useOldBrowsers: true
};

// return no providers if fail to get translation file for locale
const noProviders: CompilerOptions[] = [];

export function getTranslationProviders(): Promise<CompilerOptions[]> {


    // Get the locale id from the global
    let locale: string;
    (locale = document['locale'] as string)
        || (locale = navigator['language'] as string)
        || (locale = navigator['userLanguage'] as string)
        || (locale = navigator['browserLanguage'] as string)
        || (locale = navigator['systemLanguage'] as string)
    ;

    // No locale or U.S. English: no translation providers
    if (!locale || locale === 'en-US') {
        return Promise.resolve(noProviders);
    }

    return getTranslationsWithSystemJs(locale)
        .then( (translations: string ) => {
            return [
            { provide: TRANSLATIONS, useValue: translations },
            { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
            { provide: LOCALE_ID, useValue: locale },
            { provide: CompilerConfig, useValue: new CompilerConfig({ missingTranslation: MissingTranslationStrategy.Error }) }
        ];})
        .catch(() => {
            console.log('File not found. We have checked that');
            return noProviders;
        }); // ignore if file not found
}

declare var System: any;

function getTranslationsWithSystemJs(locale: string) {
    switch(locale) {
    case 'ru':
        return System.import('raw-loader!../i18n/messages.ru.xlf');
    case 'de':
        return System.import('raw-loader!../i18n/messages.de.xlf');
    default:
        return Promise.resolve(noProviders);
    }
}
