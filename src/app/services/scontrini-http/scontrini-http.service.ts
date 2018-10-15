import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';

import { Scontrino } from '../../models/scontrino';
import { mapModelArray } from '../../utils/json-mapper-rxext';
import { IScontriniRetriever } from '../interfaces/scontrini-retriever';

const URL = 'http://localhost:5000/scontrini';

@Injectable()
export class ScontriniHttpService implements IScontriniRetriever {

  constructor(private http: HttpClient) {
  }

  retrieveScontrini(): Observable<Scontrino[]> {
    return this.http.get<{ results: any[] }>(URL).pipe(
      map(r => r.results),
      mapModelArray(Scontrino)
    );
  }

  save(s: Scontrino): Observable<boolean> {
    const headers = {
      'Content-Type': 'application/json'
    };

    if (s.id === 0) {
      return this.http.post(URL, s.serialize(), { headers }).pipe(
        mapTo(true)
      );
    }
    else {
      return this.http.put(URL, s.serialize(), { headers }).pipe(
        mapTo(true)
      );
    }
  }
}
