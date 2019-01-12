import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Scontrino } from 'app/models/scontrino';
import { IScontriniRetriever } from 'app/services/interfaces/scontrini-retriever';
import { mapJsonArray } from 'at-json-rxjs';
import { Observable } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';

const URL = 'http://localhost:5000';
const URL_SCONTRINI = `${URL}/scontrini`;
const URL_DESC = `${URL}/descriptions`;

@Injectable()
export class ScontriniHttpService implements IScontriniRetriever {

  constructor(private http: HttpClient) {
  }

  retrieveScontrini(): Observable<Scontrino[]> {
    return this.http.get<{ results: any[] }>(URL_SCONTRINI).pipe(
      map(r => r.results),
      mapJsonArray(Scontrino)
    );
  }

  save(s: Scontrino): Observable<boolean> {
    const headers = {
      'Content-Type': 'application/json'
    };

    if (s.id === 0) {
      return this.http.post(URL_SCONTRINI, s.serialize(), { headers }).pipe(
        mapTo(true)
      );
    }
    else {
      return this.http.put(URL_SCONTRINI, s.serialize(), { headers }).pipe(
        mapTo(true)
      );
    }
  }

  getDescriptions(text: string): Observable<string[]> {
    const url = `${URL_DESC}/${text}`;
    return this.http.get<string[]>(url);
  }
}
