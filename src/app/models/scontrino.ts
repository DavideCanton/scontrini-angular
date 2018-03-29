import * as moment from 'moment';
import { Utils } from '../utils/utils';

export class Scontrino {
    id: number;
    importoDavide: number;
    importoMonia: number;
    descrizione: string;
    personale: boolean;
    dataMoment: moment.Moment;

    set dataJs(date: Date) {
        this.dataMoment = moment(date);
    }

    set data(date: string) {
        this.dataMoment = Utils.parseDate(date);
    }

    get dateString(): string {
        return Utils.formatDate(this.dataMoment);
    }
}
