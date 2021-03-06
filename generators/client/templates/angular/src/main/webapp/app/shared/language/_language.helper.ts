import { Injectable } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { TranslateService, TranslationChangeEvent, LangChangeEvent } from 'ng2-translate/ng2-translate';

import { LANGUAGES } from './language.constants';

@Injectable()
export class JhiLanguageHelper {

    constructor (private translateService: TranslateService, private titleService: Title ) { }

    getAll(): Promise<any> {
        return Promise.resolve(LANGUAGES);
    }

    /**
     * update the window title using params in the following
     * precendence
     * 1. titleKey parameter
     * 2. $state.$current.data.pageTitle (current state page title)
     * 3. 'global.title'
     */
    updateTitle(titleKey?: string) {

        if (!titleKey && this.titleService.getTitle() ) {
            titleKey = this.titleService.getTitle();
        }

        this.translateService.get(titleKey || 'global.title').subscribe(title => {
            this.titleService.setTitle(title);
        });
    }
}
