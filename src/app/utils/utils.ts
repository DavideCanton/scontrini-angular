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
}
