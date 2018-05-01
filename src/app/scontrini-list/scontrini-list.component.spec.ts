import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScontriniListComponent } from './scontrini-list.component';
import { BadgeComponent } from '../badge/badge.component';
import { ScontriniMockService } from '../services/scontrini-mock/scontrini-mock.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { By } from '@angular/platform-browser';
import { ScontriniRetriever } from '../services/interfaces/scontrini-retriever';

describe('ScontriniListComponent', () => {
  let component: ScontriniListComponent;
  let fixture: ComponentFixture<ScontriniListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxDatatableModule],
      declarations: [BadgeComponent, ScontriniListComponent],
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
});
