import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScontrinoComponent } from './scontrino.component';

describe('ScontrinoComponent', () => {
  let component: ScontrinoComponent;
  let fixture: ComponentFixture<ScontrinoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScontrinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScontrinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
