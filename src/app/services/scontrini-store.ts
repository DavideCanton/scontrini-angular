import { Injectable } from '@angular/core';

import { Scontrino } from '../models/scontrino';

@Injectable({
    providedIn: 'root'
})
export class ScontriniStoreService {

    scontrini: Scontrino[];

    getScontrino(id: number): Scontrino | null {
        return this.scontrini.find(x => x.id === id) || null;
    }
}
