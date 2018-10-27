import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { Scontrino } from '../../models/scontrino';

export interface IScontriniRetriever {
    save(scontrino: Scontrino): Observable<boolean>;
    retrieveScontrini(): Observable<Scontrino[]>;
    getDescriptions(text: string): Observable<string[]>;
}

export const SCONTRINI_SERVICE_TOKEN = new InjectionToken<IScontriniRetriever>('scontrini-service');
