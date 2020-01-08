import { fakeAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Scontrino } from 'app/models/scontrino';
import { KeysPipe } from 'app/pipes/keys.pipe';
import { MessageService } from 'app/services/messages/message.service';
import { MESSAGE_PRODUCER } from 'app/services/messages/messages-types';
import { ScontriniHttpService } from 'app/services/scontrini-http/scontrini-http.service';
import { ScontriniStoreService } from 'app/services/scontrini-store';
import { TesseractProviderService } from 'app/services/tesseract-provider/tesseract-provider.service';
import { ActivatedRouteStub } from 'app/test-utils/activated-route-stub';
import * as moment from 'moment';
import { ModalModule, ProgressbarModule, TooltipModule, TypeaheadModule } from 'ngx-bootstrap';

import { VideoRecognizerComponent } from '../video-recognizer/video-recognizer.component';
import { ScontrinoComponent } from './scontrino.component';

describe('ScontrinoComponent', () =>
{
    const activatedRoute = new ActivatedRouteStub();
    let spectator: Spectator<ScontrinoComponent>;
    const createComponent = createComponentFactory({
        component: ScontrinoComponent,
        detectChanges: false,
        declarations: [
            ScontrinoComponent,
            KeysPipe,
            VideoRecognizerComponent
        ],
        imports: [
            FormsModule,
            ModalModule.forRoot(),
            ReactiveFormsModule,
            TypeaheadModule.forRoot(),
            ProgressbarModule.forRoot(),
            RouterTestingModule,
            AngularFontAwesomeModule,
            TooltipModule.forRoot(),
        ],
        providers: [
            { provide: MESSAGE_PRODUCER, useClass: MessageService },
            { provide: ActivatedRoute, useValue: activatedRoute },
            TesseractProviderService
        ],
        mocks: [ScontriniHttpService]
    });

    beforeEach(() =>
    {
        spectator = createComponent();
        const service = spectator.get(ScontriniStoreService);
        service.scontrini = [new Scontrino()];
        service.scontrini[0].id = 1;
        service.scontrini[0].data = moment();
        activatedRoute.reset();
    });

    it('should create with a valid scontrino if id is valid', fakeAsync(() =>
    {
        activatedRoute.setParamMap({ id: 1 });
        spectator.detectChanges();

        spectator.tick();

        expect(spectator.component.id$.getValue()).toBe(1);
    }));

    it('should create with a new scontrino if id is invalid', fakeAsync(() =>
    {
        activatedRoute.setParamMap({ id: 999999 });
        spectator.detectChanges();

        spectator.tick();

        expect(spectator.component.id$.getValue()).toBe(0);
    }));

    it('should create with a new scontrino if id is not present', fakeAsync(() =>
    {
        spectator.tick();

        expect(spectator.component.id$.getValue()).toBe(0);
    }));
});
