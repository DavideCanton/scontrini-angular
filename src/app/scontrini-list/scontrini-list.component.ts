import { Component, OnInit, Inject, ViewChild, TemplateRef, NgZone } from '@angular/core';
import { ScontriniRetriever } from '../services/interfaces/scontrini-retriever';
import { Scontrino } from '../models/scontrino';
import { toArray } from 'rxjs/operators';
import { TableColumn, DatatableComponent } from '@swimlane/ngx-datatable';
import { Router, ActivatedRoute } from '@angular/router';
import { componentFactoryName } from '@angular/compiler';

@Component({
  templateUrl: './scontrini-list.component.html',
  styleUrls: ['./scontrini-list.component.scss']
})
export class ScontriniListComponent implements OnInit {

  scontrini: Scontrino[];
  loading = false;
  columns: TableColumn[];

  @ViewChild('isPersonaleRow')
  isPersonaleRow: TemplateRef<any>;

  @ViewChild(DatatableComponent)
  datatable: DatatableComponent;

  constructor(private service: ScontriniRetriever, private router: Router, private zone: NgZone) { }

  ngOnInit() {

    this.columns = [
      { prop: 'importoDavide' },
      { prop: 'importoMonia' },
      { prop: 'descrizione' },
      { prop: 'personale', cellTemplate: this.isPersonaleRow },
      { prop: 'dateString', name: 'Data' }
    ];

    this.loadData();
  }

  loadData() {
    this.loading = true;

    this.service.retrieveScontrini().subscribe(res => {
      this.scontrini = res;
      this.loading = false;
    });
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
