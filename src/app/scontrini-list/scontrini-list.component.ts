import { Component, NgZone, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent, TableColumn } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { Scontrino } from '../models/scontrino';
import { Utils } from '../utils/utils';
import { ScontriniStoreService } from '../services/scontrini-store';

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
      { prop: 'data', name: 'Data', pipe: pipe }
    ];

    this.loadData();
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
