import { Observable } from 'rxjs/Observable';
import { Scontrino } from '../../models/scontrino';
import { InjectionToken } from '@angular/core';

export interface IScontriniRetriever {
    retrieveScontrini(): Observable<Scontrino>;
}

export const IScontriniRetrieverConfigToken = new InjectionToken<IScontriniRetriever>('app.IScontriniRetriever');
