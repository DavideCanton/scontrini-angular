import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Scontrino } from '../../models/scontrino';
import { IScontriniRetriever } from '../interfaces/scontrini-retriever';
import { JsonMapper } from '../../utils/json-mapper';

@Injectable()
export class ScontriniHttpService implements IScontriniRetriever {

  constructor(private http: Http) { }

  retrieveScontrini(): Observable<Scontrino> {
    return this.http.get('/api/scontrini').mapModel(Scontrino);
  }
}
