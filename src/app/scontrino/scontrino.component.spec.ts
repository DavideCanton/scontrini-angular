import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { ScontrinoComponent } from './scontrino.component';
import { ReactiveFormsModule } from '@angular/forms';
import { KeysPipe } from '../pipes/keys.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { ScontriniRetriever } from '../services/interfaces/scontrini-retriever';
import { ScontriniMockService } from '../services/scontrini-mock/scontrini-mock.service';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../test-utils/activated-route-stub';
import { tick } from '@angular/core/testing';

describe('ScontrinoComponent', () => {
  let component: ScontrinoComponent;
  let fixture: ComponentFixture<ScontrinoComponent>;
  const activatedRoute = new ActivatedRouteStub();
  let expectedId = 0;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ScontrinoComponent,
        KeysPipe
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ScontriniRetriever, useClass: ScontriniMockService },
        { provide: ActivatedRoute, useValue: activatedRoute }

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScontrinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with a valid scontrino if id is valid', fakeAsync(() => {
    expect(component).toBeTruthy();
    activatedRoute.setParamMap({ id: 1 });

    tick();

    expect(component.scontrino.id).toBe(1);
  }));

  it('should create with a new scontrino if id is invalid', fakeAsync(() => {
    expect(component).toBeTruthy();
    activatedRoute.setParamMap({ id: 999999 });

    tick();

    expect(component.scontrino.id).toBe(0);
  }));

  it('should create with a new scontrino if id is not present', fakeAsync(() => {
    expect(component).toBeTruthy();

    tick();

    expect(component.scontrino.id).toBe(0);
  }));
});
