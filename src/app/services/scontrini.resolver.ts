import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Scontrino } from '../models/scontrino';
import { ScontriniHttpService } from './scontrini-http/scontrini-http.service';
import { ScontriniStoreService } from './scontrini-store';

@Injectable({ providedIn: 'root' })
export class ScontriniResolver implements Resolve<Scontrino[]> {
    constructor(
        private retriever: ScontriniHttpService,
        private store: ScontriniStoreService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Scontrino[]>
    {

        return this.retriever.retrieveScontrini().pipe(
            tap(s =>
            {
                this.store.scontrini = s;
            })
        );
    }
}
