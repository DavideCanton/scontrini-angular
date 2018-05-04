import { JsonProperty, JsonClass, SerializeFn } from 'at-json';
import * as moment from 'moment';
import { Utils } from '../utils/utils';

@JsonClass
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
        this.id = 0;
        this.importoDavide = null;
        this.importoMonia = null;
        this.descrizione = null;
        this.personale = null;
        this.data = null;
    }

    get dateString(): string {
        if (!this.data)
            return '';

        return Utils.formatDate(this.data);
    }

    serialize: SerializeFn;
}
