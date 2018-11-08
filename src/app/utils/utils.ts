import * as moment from 'moment';
import * as _ from 'lodash';

export class Utils {
    static parseDate(date: string): moment.Moment | null {
        const result = moment(date, moment.ISO_8601, true);
        return result.isValid() ? result : null;
    }

    static formatDate(date: moment.Moment | null): string | null {
        return date ? date.toISOString() : null;
    }

    static formatDateForShow(date: moment.Moment | null): string {
        return date ? date.format('DD/MM/YYYY') : '';
    }
}

type N<T> = NonNullable<T>;
type N1<T, K1 extends keyof N<T>> = N<T>[K1];
type N2<T, K1 extends keyof N<T>, K2 extends keyof N1<T, K1>> = N1<T, K1>[K2];
type N3<T, K1 extends keyof N<T>, K2 extends keyof N1<T, K1>, K3 extends keyof N2<T, K1, K2>> = N2<T, K1, K2>[K3];
type N4<T, K1 extends keyof N<T>, K2 extends keyof N1<T, K1>, K3 extends keyof N2<T, K1, K2>, K4 extends keyof N3<T, K1, K2, K3>> = N3<T, K1, K2, K3>[K4];

export function getSafe<T>(obj: T | null): T | null;
export function getSafe<T, K1 extends keyof T>(obj: T | null, k1: K1): T[K1] | null;
export function getSafe<T, K1 extends keyof N<T>, K2 extends keyof N1<T, K1>>(obj: T | null, k1: K1, k2: K2): N2<T, K1, K2> | null;
export function getSafe<T, K1 extends keyof N<T>, K2 extends keyof N1<T, K1>, K3 extends keyof N2<T, K1, K2>>(obj: T | null, k1: K1, k2: K2, k3: K3): N3<T, K1, K2, K3> | null;
export function getSafe<T, K1 extends keyof N<T>, K2 extends keyof N1<T, K1>, K3 extends keyof N2<T, K1, K2>, K4 extends keyof N3<T, K1, K2, K3>>(obj: T | null, k1: K1, k2: K2, k3: K3, k4: K4): N4<T, K1, K2, K3, K4> | null;
export function getSafe(obj: any, ...keys: string[]): any {
    let cur = obj;

    _.forEach(keys, k => {
        if (!cur) return false;

        cur = cur[k] || null;
    });

    return cur;
}

