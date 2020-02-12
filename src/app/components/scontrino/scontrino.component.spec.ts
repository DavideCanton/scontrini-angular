import { fakeAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { Scontrino } from 'app/models/scontrino';
import { KeysPipe } from 'app/pipes/keys.pipe';
import { MessageService } from 'app/services/messages/message.service';
import { MESSAGE_PRODUCER } from 'app/services/messages/messages-types';
import { ScontriniHttpService } from 'app/services/scontrini-http/scontrini-http.service';
import { TesseractProviderService } from 'app/services/tesseract-provider/tesseract-provider.service';
import { ActivatedRouteStub } from 'app/test-utils/activated-route-stub';
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
            FontAwesomeModule,
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
        activatedRoute.reset();
    });

    it('should create with a valid scontrino if id is valid', fakeAsync(() =>
    {
        const scontrino = new Scontrino();
        scontrino.id = 1;
        activatedRoute.setData({ scontrino });
        spectator.detectChanges();

        spectator.tick();

        expect(spectator.component.id).toBe(1);
    }));

    it('should create with a new scontrino if id is not present', fakeAsync(() =>
    {
        activatedRoute.setData({ scontrino: null });
        spectator.tick();

        expect(spectator.component.id).toBe(0);
    }));
});
