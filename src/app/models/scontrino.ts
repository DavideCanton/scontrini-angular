import { JsonDate, JsonDecimal } from 'app/models/common';
import { Utils } from 'app/utils/utils';
import { JsonClass, JsonProperty, SerializeFn } from 'at-json';
import * as moment from 'moment';

@JsonClass()
export class Scontrino {
    @JsonProperty()
    id: number;
    @JsonDecimal()
    importoDavide: number;
    @JsonDecimal()
    importoMonia: number;
    @JsonProperty()
    descrizione: string;
    @JsonProperty()
    personale: boolean;
    @JsonDate()
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

        return Utils.formatDateForShow(this.data);
    }

    serialize: SerializeFn;
}
