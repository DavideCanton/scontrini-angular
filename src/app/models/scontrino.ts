import * as moment from 'moment';
import { Utils } from '../utils/utils';
import { JsonProperty } from 'at-json';

export class Scontrino {
    @JsonProperty()
    id: number;
    @JsonProperty()
    importoDavide: number;
    @JsonProperty()
    importoMonia: number;
    @JsonProperty()
    descrizione: string;
    @JsonProperty()
    personale: boolean;
    @JsonProperty(Utils.parseDate)
    data: moment.Moment;

    constructor() {
        this.id = undefined;
        this.importoDavide = undefined;
        this.importoMonia = undefined;
        this.descrizione = undefined;
        this.personale = undefined;
        this.data = undefined;
    }

    get dateString(): string {
        if (!this.data)
            return '';

        return Utils.formatDate(this.data);
    }
}
