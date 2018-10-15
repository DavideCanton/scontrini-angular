import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, of, range } from 'rxjs';
import { delay, map, toArray } from 'rxjs/operators';

import { Scontrino } from '../../models/scontrino';
import { mapModel } from '../../utils/json-mapper-rxext';
import { IScontriniRetriever } from '../interfaces/scontrini-retriever';



@Injectable()
export class ScontriniMockService implements IScontriniRetriever {
  n = 10;

  private static mapScontrini(i: number) {
    return {
      id: i + 1,
      importoDavide: i * 200 + 50,
      importoMonia: i * 300 - 26,
      descrizione: `Articolo ${i}`,
      personale: i % 4 === 0,
      data: moment().add(i, 'days').format('DD/MM/YYYY')
    };
  }

  retrieveScontrini(): Observable<Scontrino[]> {
    return range(0, this.n).pipe(
      map(ScontriniMockService.mapScontrini),
      mapModel(Scontrino),
      delay(1000),
      toArray()
    );
  }

  save(s: Scontrino): Observable<boolean> {
    return of(true);
  }
}
