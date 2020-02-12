import { Location } from '@angular/common';
import { fakeAsync, inject } from '@angular/core/testing';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Scontrino } from 'app/models/scontrino';
import { MessageService } from 'app/services/messages/message.service';
import { MESSAGE_PRODUCER } from 'app/services/messages/messages-types';
import { ScontriniHttpService } from 'app/services/scontrini-http/scontrini-http.service';
import { ScontriniStoreService } from 'app/services/scontrini-store';
import { BlankComponent } from 'app/test-utils/blank.component';
import { CommonTestUtilsModule } from 'app/test-utils/common-test-utils.module';
import * as _ from 'lodash';
import * as moment from 'moment';

import { BadgeComponent } from '../badge/badge.component';
import { ScontriniListComponent } from './scontrini-list.component';

const routes: Routes = [
    {
        path: 'scontrini/:id',
        component: BlankComponent
    }
];

describe('ScontriniListComponent', () =>
{
    let spectator: Spectator<ScontriniListComponent>;
    const createComponent = createComponentFactory({
        component: ScontriniListComponent,
        detectChanges: false,
        imports: [
            NgxDatatableModule,
            CommonTestUtilsModule,
            RouterTestingModule.withRoutes(routes),
            FontAwesomeModule
        ],
        declarations: [
            BadgeComponent,
            ScontriniListComponent
        ],
        providers: [
            { provide: MESSAGE_PRODUCER, useClass: MessageService },
            ScontriniStoreService
        ],
        mocks: [ScontriniHttpService]
    });

    beforeEach(() =>
    {
        spectator = createComponent();

        const service: ScontriniStoreService = spectator.get(ScontriniStoreService);

        service.scontrini = [
            new Scontrino(),
            new Scontrino(),
            new Scontrino(),
        ];

        _.forEach(service.scontrini, (s, i) =>
        {
            s.id = i;
            s.data = moment();
        });
    });

    it('should create', () =>
    {
        spectator.detectChanges();
        expect(spectator.component).toBeTruthy();
    });

    it('should display the rows correctly', () =>
    {
        spectator.detectChanges();
        expect(spectator.component).toBeTruthy();

        const { rowCount } = spectator.query(DatatableComponent)!;
        expect(rowCount).toBe(spectator.component.scontrini.length);
    });

    it('redirects when clicked row', fakeAsync(inject([Location], (location: Location) =>
    {
        spectator.detectChanges();

        spectator.component.select(spectator.component.scontrini[0]);
        spectator.tick();

        expect(location.isCurrentPathEqualTo(`/scontrini/${spectator.component.scontrini[0].id}`)).toBe(true);
    })));
});
