import { Injectable } from '@angular/core';
import { IScontriniRetriever } from '../interfaces/scontrini-retriever';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { Scontrino } from '../../models/scontrino';
import * as moment from 'moment';

@Injectable()
export class ScontriniMockService implements IScontriniRetriever {
  n = 2;

  constructor() { }

  retrieveScontrini(): Observable<Scontrino> {
    const scontrini = [];

    for (let i = 0; i < this.n; ++i)
     {
      const s = new Scontrino();
      s.id = i + 1;
      s.importoDavide = i * 2 + 1;
      s.importoMonia = i * 3 - 2;
      s.descrizione = `Articolo ${i}`;
      s.personale = i % 4 === 0;
      s.dataMoment = moment().add(i, 'day');
      scontrini.push(s);
    }

    return Observable.from(scontrini);
  }

}
