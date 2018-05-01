import { Observable } from 'rxjs';
import { Scontrino } from '../../models/scontrino';
import { InjectionToken } from '@angular/core';

export abstract class ScontriniRetriever {
    abstract retrieveScontrini(): Observable<Scontrino[]>;

    abstract getScontrino(id: number): Observable<Scontrino | null>;
}
