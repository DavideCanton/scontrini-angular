/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />
import * as moment from 'moment';
import { inject } from '@angular/core/testing';

export class Utils {
    static parseDate(date: string): moment.Moment | null {
        const result = moment(date, 'DD/MM/YYYY', true);
        return result.isValid() ? result : null;
    }

    static formatDate(date: moment.Moment): string {
        return date.format('DD/MM/YYYY');
    }
}

export async function ait(name: string, deps: any[], fn: Function){
    it(name, async() => {
        await (inject(deps, fn))();
    });
}
