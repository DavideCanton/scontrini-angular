import * as moment from 'moment';

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

    static dateComparator(d1: moment.Moment | null, d2: moment.Moment | null): number {
        if (!d1 && !d2) return 0;
        if (!d1) return -1;
        if (!d2) return 1;

        if (d1.isSame(d2)) return 0;
        if (d1.isBefore(d2)) return -1;
        return 1;
    }
}

