import { Injectable } from '@angular/core';
import { IScontriniRetriever } from '../interfaces/scontrini-retriever';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { Scontrino } from '../../models/scontrino';
import * as moment from 'moment';
import '../../utils/json-mapper-rxext';
import { range } from 'rxjs/observable/range';


@Injectable()
export class ScontriniMockService implements IScontriniRetriever {
  n = 100;

  private static mapScontrini(i: number) {
    return {
      id: i + 1,
      importoDavide: i * 2 + 1,
      importoMonia: i * 3 - 2,
      descrizione: `Articolo ${i}`,
      personale: i % 4 === 0,
      data: moment().add(i, 'days').format('DD/MM/YYYY')
    };
  }

  retrieveScontrini(): Observable<Scontrino> {
    const scontrini = [];

    return range(0, this.n)
      .map(ScontriniMockService.mapScontrini)
      .mapModel(Scontrino);
  }

}
