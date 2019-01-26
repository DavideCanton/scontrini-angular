import { Component, NgZone, OnInit, TemplateRef, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent, TableColumn } from '@swimlane/ngx-datatable';
import * as moment from 'moment';

import { Scontrino } from '../../models/scontrino';
import { ScontriniStoreService } from '../../services/scontrini-store';
import { Utils } from '../../utils/utils';
import { IMessages, IMessageProducer, MESSAGE_PRODUCER } from 'app/services/messages/messages-types';

@Component({
  templateUrl: './scontrini-list.component.html',
  styleUrls: ['./scontrini-list.component.scss']
})
export class ScontriniListComponent implements OnInit {
  loading = false;
  columns: TableColumn[];
  scontrini: Scontrino[];

  @ViewChild('isPersonaleRow')
  isPersonaleRow: TemplateRef<any>;

  @ViewChild(DatatableComponent)
  datatable: DatatableComponent;

  constructor(
    private store: ScontriniStoreService,
    @Inject(MESSAGE_PRODUCER) private producer: IMessageProducer<IMessages>,
    private router: Router,
    private zone: NgZone) {

  }

  ngOnInit() {

    const pipe = {
      transform: (v: moment.Moment) => {
        return Utils.formatDateForShow(v);
      }
    };

    this.columns = [
      { prop: 'importoDavide' },
      { prop: 'importoMonia' },
      { prop: 'descrizione' },
      { prop: 'personale', cellTemplate: this.isPersonaleRow },
      { prop: 'data', name: 'Data', pipe }
    ];

    this.loadData();

    this.producer.title.emit('Lista scontrini');
  }

  loadData() {
    this.scontrini = this.store.scontrini;
  }

  select(scontrino: Scontrino) {
    this.datatable.selected = [scontrino];
    this.onSelect({ selected: this.datatable.selected });
  }

  onSelect(o: { selected: Scontrino[] }) {
    this.zone.run(() => {
      const id = o.selected[0].id;
      this.router.navigate(['/scontrini', id]);
    });
  }
}
