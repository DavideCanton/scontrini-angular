import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class EventsService {
  private events: Map<string, Subject<any>> = new Map<string, Subject<any>>();

  _setupObs(key: string) {
    if (!this.events.has(key))
      this.events.set(key, new Subject());
  }

  setValue(key: string, value: any) {
    this._setupObs(key);
    this.events.get(key).next(value);
  }

  getObservable<T>(key: string): Observable<T> {
    this._setupObs(key);
    return this.events.get(key).asObservable();
  }

  getObservableDistinct<T>(key: string): Observable<T> {
    return this.getObservable<T>(key).distinctUntilChanged();
  }
}
