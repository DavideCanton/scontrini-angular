import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class TestService {

  private makeHeaders(token: string): HttpHeaders {
    return new HttpHeaders({ Authentication: `Bearer ${token}` });
  }

  getResp(): Observable<string> {
    return Observable.of(localStorage.getItem('culo') || '')
      .map(this.makeHeaders)
      .mergeMap(headers => Observable.of('cacca'));
  }
}
