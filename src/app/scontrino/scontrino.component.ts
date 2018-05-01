import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Scontrino } from '../models/scontrino';
import { ScontriniRetriever } from '../services/interfaces/scontrini-retriever';
import { switchMap, filter } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  templateUrl: './scontrino.component.html',
  styleUrls: ['./scontrino.component.scss']
})
export class ScontrinoComponent implements OnInit {
  scontrino: Scontrino;

  constructor(private service: ScontriniRetriever, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.pipe(switchMap(p => {
      const id = +p.get('id');

      if (id)
        return this.service.getScontrino(id);
      else
        throwError('Invalid id');
    }))
      .subscribe(s => {
        this.scontrino = s || new Scontrino();
      });
  }
}
