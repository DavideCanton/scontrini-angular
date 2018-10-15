import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Scontrino } from '../models/scontrino';
import { IScontriniRetriever, SCONTRINI_SERVICE_TOKEN } from '../services/interfaces/scontrini-retriever';
import { ScontriniStoreService } from '../services/scontrini-store';
import { FormGroupFacade } from '../utils/form-group-facade';

export interface IScontrinoForm {
    importoDavide: number;
    importoMonia: number;
    descrizione: string;
    personale: boolean;
    data: Date;
}

@Component({
    templateUrl: './scontrino.component.html',
    styleUrls: ['./scontrino.component.scss']
})
export class ScontrinoComponent implements OnInit {
    facade: FormGroupFacade<IScontrinoForm>;

    id$ = new BehaviorSubject<number>(0);

    isCollapsed = false;

    constructor(
        private service: ScontriniStoreService,
        @Inject(SCONTRINI_SERVICE_TOKEN) private retriever: IScontriniRetriever,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder) {

        this.facade = new FormGroupFacade(fb);

        this.facade.buildFrom({
            importoDavide: {
                initialValue: 0
            },
            importoMonia: {
                initialValue: 0
            },
            data: {
                initialValue: new Date()
            },
            descrizione: {
                initialValue: ''
            },
            personale: {
                initialValue: false
            }
        },
            {
                validator: (g: FormGroup) => {
                    if (!this.facade || !this.facade.group) return null;

                    const { importoDavide, importoMonia } = this.facade.getValues();
                    if (!_.isNil(importoDavide) || !_.isNil(importoMonia))
                        return null;

                    return {
                        compound: 'One must be filled'
                    };
                }
            });
    }

    ngOnInit() {
        this.route.paramMap.pipe(
            map(p => +p.get('id') || 0),
            map(id => {
                if (id)
                    return this.service.getScontrino(id);
                else
                    return null;
            }))
            .subscribe(s => {
                this.id$.next(s ? s.id : 0);

                if (s) {
                    this.facade.patchValues({
                        data: s.data.toDate(),
                        descrizione: s.descrizione,
                        importoDavide: s.importoDavide,
                        importoMonia: s.importoMonia,
                        personale: s.personale
                    });
                }
            });
    }

    onSubmit() {
        const {
            importoDavide,
            importoMonia,
            personale,
            data,
            descrizione
        } = this.facade.getValues();

        const scontrino = new Scontrino();

        scontrino.importoDavide = importoDavide;
        scontrino.importoMonia = importoMonia;
        scontrino.personale = personale;
        scontrino.data = moment(data);
        scontrino.descrizione = descrizione;
        scontrino.id = this.id$.getValue();

        this.retriever.save(scontrino).subscribe(() => {
            this.router.navigateByUrl('/scontrini');
        });

        return false;
    }
}
