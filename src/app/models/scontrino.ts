import { JsonDate, JsonDecimal } from 'app/models/common';
import { Utils } from 'app/utils/utils';
import { JsonClass, JsonProperty, SerializeFn } from 'at-json';
import * as moment from 'moment';

@JsonClass()
export class Scontrino
{
    @JsonProperty()
    id: number = 0;
    @JsonDecimal()
    importoDavide: number = 0;
    @JsonDecimal()
    importoMonia: number = 0;
    @JsonProperty()
    descrizione: string = '';
    @JsonProperty()
    personale: boolean = false;
    @JsonDate()
    data: moment.Moment | null = null;

    get dateString(): string
    {
        if(!this.data)
            return '';

        return Utils.formatDateForShow(this.data);
    }

    serialize: SerializeFn;
}
