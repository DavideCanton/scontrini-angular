import { Location } from '@angular/common';
import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Scontrino } from 'app/models/scontrino';
import { SCONTRINI_SERVICE_TOKEN } from 'app/services/interfaces/scontrini-retriever';
import { ScontriniMockService } from 'app/services/scontrini-mock/scontrini-mock.service';
import { ScontriniStoreService } from 'app/services/scontrini-store';
import { BlankComponent } from 'app/test-utils/blank.component';
import { CommonTestUtilsModule } from 'app/test-utils/common-test-utils.module';
import * as _ from 'lodash';
import * as moment from 'moment';

import { BadgeComponent } from '../badge/badge.component';
import { ScontriniListComponent } from './scontrini-list.component';


const routes: Routes = [
  {
    path: 'scontrini/:id',
    component: BlankComponent
  }
];
describe('ScontriniListComponent', () => {
  let component: ScontriniListComponent;
  let fixture: ComponentFixture<ScontriniListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxDatatableModule,
        CommonTestUtilsModule,
        RouterTestingModule.withRoutes(routes),
        AngularFontAwesomeModule
      ],
      declarations: [
        BadgeComponent,
        ScontriniListComponent
      ],
      providers: [
        {
          provide: SCONTRINI_SERVICE_TOKEN,
          useClass: ScontriniMockService
        },
        ScontriniStoreService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const service: ScontriniStoreService = TestBed.get(ScontriniStoreService);

    service.scontrini = [
      new Scontrino(),
      new Scontrino(),
      new Scontrino(),
    ];

    _.forEach(service.scontrini, (s, i) => {
      s.id = i;
      s.data = moment();
    });

    fixture = TestBed.createComponent(ScontriniListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display the rows correctly', () => {
    expect(component).toBeTruthy();

    fixture.detectChanges();

    const body = fixture.debugElement.query(By.css('datatable-body'));
    const value = parseInt(body.attributes['ng-reflect-row-count'], 10);
    expect(value).toBe(component.scontrini.length);
  });

  it('redirects when clicked row', fakeAsync(inject([Location], (location: Location) => {
    expect(component).toBeTruthy();

    fixture.detectChanges();

    component.select(component.scontrini[0]);
    tick();

    expect(location.isCurrentPathEqualTo(`/scontrini/${component.scontrini[0].id}`)).toBe(true);
  })));
});
