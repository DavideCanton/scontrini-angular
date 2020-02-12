import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Scontrino } from '../models/scontrino';
import { ScontriniStoreService } from './scontrini-store';

@Injectable({ providedIn: 'root' })
export class ScontrinoResolver implements Resolve<Scontrino | null> {
    constructor(
        private store: ScontriniStoreService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Scontrino | null
    {
        const id = route.params['id'];
        return id ? this.store.getScontrino(id) : null;
    }
}
