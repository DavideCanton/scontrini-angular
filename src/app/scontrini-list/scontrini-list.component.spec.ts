import { Location } from '@angular/common';
import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { BadgeComponent } from '../badge/badge.component';
import { ScontriniRetriever } from '../services/interfaces/scontrini-retriever';
import { ScontriniMockService } from '../services/scontrini-mock/scontrini-mock.service';
import { BlankComponent } from '../test-utils/blank.component';
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
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        BadgeComponent,
        ScontriniListComponent,
        BlankComponent
      ],
      providers: [
        { provide: ScontriniRetriever, useClass: ScontriniMockService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScontriniListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the rows correctly', () => {
    expect(component).toBeTruthy();

    fixture.detectChanges();

    const body = fixture.debugElement.query(By.css('datatable-body'));
    const value = parseInt(body.attributes['ng-reflect-row-count'], 10);
    expect(value).toBe(100);
  });

  it('redirects when clicked row', fakeAsync(inject([Location], (location: Location) => {
    expect(component).toBeTruthy();

    fixture.detectChanges();

    component.select(component.scontrini[0]);
    tick();

    expect(location.isCurrentPathEqualTo(`/scontrini/${component.scontrini[0].id}`)).toBe(true);
  })));
});
