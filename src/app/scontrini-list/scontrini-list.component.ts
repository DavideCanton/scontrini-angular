import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { IScontriniRetrieverConfigToken, IScontriniRetriever } from '../services/interfaces/scontrini-retriever';
import { Scontrino } from '../models/scontrino';
import 'rxjs/add/operator/toArray';
import { TableColumn } from '@swimlane/ngx-datatable';
import { ScontriniMockService } from '../services/scontrini-mock/scontrini-mock.service';

@Component({
  selector: 'scontrini-list',
  templateUrl: './scontrini-list.component.html',
  styleUrls: ['./scontrini-list.component.scss']
})
export class ScontriniListComponent implements OnInit {

  scontrini: Scontrino[];
  loading = false;
  n = 100;
  columns: TableColumn[];

  @ViewChild('isPersonaleRow')
  isPersonaleRow: TemplateRef<any>;


  constructor(@Inject(IScontriniRetrieverConfigToken) private service: IScontriniRetriever) { }

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

    (<ScontriniMockService>this.service).n = this.n;

    this.service.retrieveScontrini().toArray().subscribe(res => {
      this.scontrini = res;
      this.loading = false;
    });
  }
}
