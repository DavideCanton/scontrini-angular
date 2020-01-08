import { Component, Inject, NgZone, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent, TableColumn } from '@swimlane/ngx-datatable';
import { IMessageProducer, IMessages, MESSAGE_PRODUCER } from 'app/services/messages/messages-types';
import * as moment from 'moment';

import { Scontrino } from '../../models/scontrino';
import { ScontriniStoreService } from '../../services/scontrini-store';
import { Utils } from '../../utils/utils';

@Component({
    templateUrl: './scontrini-list.component.html',
    styleUrls: ['./scontrini-list.component.scss']
})
export class ScontriniListComponent implements OnInit
{
    loading = false;
    columns: TableColumn[];
    scontrini: Scontrino[];

    @ViewChild('isPersonaleRow', { static: true }) isPersonaleRow: TemplateRef<any>;
    @ViewChild('currencyTemplate', { static: true }) currencyTemplate: TemplateRef<any>;
    @ViewChild('dateTemplate', { static: true }) dateTemplate: TemplateRef<any>;
    @ViewChild(DatatableComponent, { static: true }) datatable: DatatableComponent;

    constructor(
        private store: ScontriniStoreService,
        @Inject(MESSAGE_PRODUCER) private producer: IMessageProducer<IMessages>,
        private router: Router,
        private zone: NgZone) { }

    ngOnInit()
    {

        this.columns = [
            { prop: 'id' },
            {
                prop: 'importoDavide',
                cellTemplate: this.currencyTemplate
            },
            {
                prop: 'importoMonia',
                cellTemplate: this.currencyTemplate
            },
            { prop: 'descrizione' },
            {
                prop: 'personale',
                cellTemplate: this.isPersonaleRow
            },
            {
                prop: 'data',
                name: 'Data',
                cellTemplate: this.dateTemplate,
                comparator: (d1: moment.Moment, d2: moment.Moment) => Utils.dateComparator(d1, d2)
            }
        ];

        this.loadData();

        this.producer.title.emit('Lista scontrini');
    }

    loadData()
    {
        this.scontrini = this.store.scontrini;
    }

    select(scontrino: Scontrino)
    {
        this.datatable.selected = [scontrino];
        this.onSelect({ selected: this.datatable.selected });
    }

    onSelect(o: { selected: Scontrino[] })
    {
        this.zone.run(() =>
        {
            const id = o.selected[0].id;
            this.router.navigate(['/scontrini', id]);
        });
    }
}
