import * as moment from 'moment';

export class Utils {
    static parseDate(date: string): moment.Moment | null {
        const result = moment(date, 'DD/MM/YYYY', true);
        return result.isValid() ? result : null;
    }

    static formatDate(date: moment.Moment): string {
        return date.format('DD/MM/YYYY');
    }
}
