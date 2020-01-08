import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { BsDatepickerModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { BadgeComponent } from './components/badge/badge.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { MessageService } from './services/messages/message.service';
import { MESSAGE_CONSUMER } from './services/messages/messages-types';

describe('AppComponent', () =>
{
    let spectator: Spectator<AppComponent>;
    const createComponent = createComponentFactory({
        component: AppComponent,
        declarations: [
            AppComponent,
            BadgeComponent,
            TopbarComponent
        ],
        imports: [
            RouterTestingModule,
            HttpClientTestingModule,
            BsDatepickerModule.forRoot(),
        ],
        providers: [
            { provide: APP_BASE_HREF, useValue: '/' },
            {
                provide: MESSAGE_CONSUMER,
                useClass: MessageService
            }
        ]
    });

    beforeEach(() =>
    {
        spectator = createComponent();
    });

    it('should create the app', async(() =>
    {
        expect(spectator.component).toBeTruthy();
    }));
});
