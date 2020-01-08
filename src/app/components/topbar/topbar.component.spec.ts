import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MessageService } from 'app/services/messages/message.service';
import { MESSAGE_CONSUMER } from 'app/services/messages/messages-types';

import { TopbarComponent } from './topbar.component';

describe('TopbarComponent', () =>
{
    let spectator: Spectator<TopbarComponent>;
    const createComponent = createComponentFactory({
        component: TopbarComponent,
        declarations: [
            TopbarComponent
        ],
        imports: [
            RouterTestingModule
        ],
        providers: [
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

    it('should create', () =>
    {
        expect(spectator.component).toBeTruthy();
    });
});
