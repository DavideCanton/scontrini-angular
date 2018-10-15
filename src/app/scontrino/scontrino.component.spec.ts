import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { KeysPipe } from '../pipes/keys.pipe';
import { SCONTRINI_SERVICE_TOKEN } from '../services/interfaces/scontrini-retriever';
import { ScontriniMockService } from '../services/scontrini-mock/scontrini-mock.service';
import { ActivatedRouteStub } from '../test-utils/activated-route-stub';
import { ScontrinoComponent } from './scontrino.component';

describe('ScontrinoComponent', () => {
  let component: ScontrinoComponent;
  let fixture: ComponentFixture<ScontrinoComponent>;
  const activatedRoute = new ActivatedRouteStub();

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
        { provide: SCONTRINI_SERVICE_TOKEN, useClass: ScontriniMockService },
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

    expect(component.id$.getValue()).toBe(1);
  }));

  it('should create with a new scontrino if id is invalid', fakeAsync(() => {
    expect(component).toBeTruthy();
    activatedRoute.setParamMap({ id: 999999 });

    tick();

    expect(component.id$.getValue()).toBe(0);
  }));

  it('should create with a new scontrino if id is not present', fakeAsync(() => {
    expect(component).toBeTruthy();

    tick();

    expect(component.id$.getValue()).toBe(0);
  }));
});
