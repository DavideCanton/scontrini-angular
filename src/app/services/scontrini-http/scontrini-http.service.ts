import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Scontrino } from '../../models/scontrino';
import { mapModel } from '../../utils/json-mapper-rxext';
import { ScontriniRetriever } from '../interfaces/scontrini-retriever';
import { toArray } from 'rxjs/operators';
import { log } from '../../utils/aop';

@Injectable()
export class ScontriniHttpService extends ScontriniRetriever {

  constructor(private http: HttpClient) {
    super();
  }

  @log
  retrieveScontrini(): Observable<Scontrino[]> {
    return this.http.get('/api/scontrini').pipe(
      mapModel(Scontrino),
      toArray()
    );
  }

  @log
  getScontrino(id: number): Observable<Scontrino> {
    return null;
  }
}
