import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Scontrino } from 'app/models/scontrino';
import { KeysPipe } from 'app/pipes/keys.pipe';
import { SCONTRINI_SERVICE_TOKEN } from 'app/services/interfaces/scontrini-retriever';
import { ScontriniMockService } from 'app/services/scontrini-mock/scontrini-mock.service';
import { ScontriniStoreService } from 'app/services/scontrini-store';
import { TesseractProviderService } from 'app/services/tesseract-provider/tesseract-provider.service';
import { ActivatedRouteStub } from 'app/test-utils/activated-route-stub';
import * as moment from 'moment';
import { ProgressbarModule, TooltipModule, TypeaheadModule } from 'ngx-bootstrap';

import { VideoRecognizerComponent } from '../video-recognizer/video-recognizer.component';
import { ScontrinoComponent } from './scontrino.component';

describe('ScontrinoComponent', () => {
  let component: ScontrinoComponent;
  let fixture: ComponentFixture<ScontrinoComponent>;
  const activatedRoute = new ActivatedRouteStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ScontrinoComponent,
        KeysPipe,
        VideoRecognizerComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        TypeaheadModule.forRoot(),
        ProgressbarModule.forRoot(),
        RouterTestingModule,
        AngularFontAwesomeModule,
        TooltipModule.forRoot()
      ],
      providers: [
        { provide: SCONTRINI_SERVICE_TOKEN, useClass: ScontriniMockService },
        { provide: ActivatedRoute, useValue: activatedRoute },
        TesseractProviderService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const service = <ScontriniStoreService>TestBed.get(ScontriniStoreService);
    service.scontrini = [new Scontrino()];
    service.scontrini[0].id = 1;
    service.scontrini[0].data = moment();

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
