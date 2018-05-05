import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError, of as observableOf } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { Scontrino } from '../models/scontrino';
import { ScontriniRetriever } from '../services/interfaces/scontrini-retriever';

@Component({
  templateUrl: './scontrino.component.html',
  styleUrls: ['./scontrino.component.scss']
})
export class ScontrinoComponent implements OnInit {
  group: FormGroup;
  scontrino: Scontrino;

  constructor(private service: ScontriniRetriever, private route: ActivatedRoute, private fb: FormBuilder) {
    this.group = this.fb.group({
      importoDavide: '',
      importoMonia: '',
      personale: ''
    },
      {
        validator: (g: FormGroup) => {
          if (g.get('importoDavide').value !== null || g.get('importoMonia').value !== null)
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
      switchMap(id => {
        if (id)
          return this.service.getScontrino(id);
        else
          return observableOf(null);
      }))
      .subscribe(s => {
        this.scontrino = s || new Scontrino();
        this.group.patchValue(this.scontrino);
      });
  }

  onSubmit() {
    console.log('culo');
  }
}
