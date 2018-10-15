import { Inject } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Scontrino } from '../models/scontrino';
import { IScontriniRetriever, SCONTRINI_SERVICE_TOKEN } from './interfaces/scontrini-retriever';
import { ScontriniStoreService } from './scontrini-store';

export class ScontriniResolver implements Resolve<Scontrino[]> {
    constructor(
        @Inject(SCONTRINI_SERVICE_TOKEN) private retriever: IScontriniRetriever,
        private store: ScontriniStoreService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Scontrino[]> {

        return this.retriever.retrieveScontrini().pipe(
            tap(s => {
                this.store.scontrini = s;
            })
        );
    }
}
