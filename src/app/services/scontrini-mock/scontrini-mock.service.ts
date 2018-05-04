import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, range, of as observableOf, from as observableFrom } from 'rxjs';
import { concatAll, filter, map, take, tap, toArray, defaultIfEmpty, switchMap, concatMap } from 'rxjs/operators';
import { Scontrino } from '../../models/scontrino';
import { mapModel } from '../../utils/json-mapper-rxext';
import { ScontriniRetriever } from '../interfaces/scontrini-retriever';
import { log } from '../../utils/aop';



@Injectable()
export class ScontriniMockService extends ScontriniRetriever {
  n = 100;
  scontrini: Scontrino[];

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

  @log
  retrieveScontrini(): Observable<Scontrino[]> {
    if (this.scontrini)
      return observableOf(this.scontrini);

    return range(0, this.n).pipe(
      map(ScontriniMockService.mapScontrini),
      mapModel(Scontrino)
    )
      .pipe(
        toArray(),
        tap(s => this.scontrini = s)
      );
  }

  @log
  getScontrino(id: number): Observable<Scontrino | null> {

    return this.retrieveScontrini().pipe(
      concatMap(a => observableFrom(a)),
      filter(s => s.id === id),
      take(1),
      defaultIfEmpty(null)
    );
  }
}
