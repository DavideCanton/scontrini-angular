import { Component, Inject, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Scontrino } from 'app/models/scontrino';
import { IMessageProducer, IMessages, MESSAGE_PRODUCER } from 'app/services/messages/messages-types';
import { ScontriniHttpService } from 'app/services/scontrini-http/scontrini-http.service';
import { ScontriniStoreService } from 'app/services/scontrini-store';
import { FormGroupFacade } from 'app/utils/form-group-facade';
import * as _ from 'lodash';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Observable, Subscriber } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { VideoRecognizerComponent } from '../video-recognizer/video-recognizer.component';


export interface IScontrinoForm
{
    importoDavide: number;
    importoMonia: number;
    descrizione: string;
    personale: boolean;
    data: Date;
}

@Component({
    templateUrl: './scontrino.component.html',
    styleUrls: ['./scontrino.component.scss']
})
export class ScontrinoComponent implements OnInit
{
    facade: FormGroupFacade<IScontrinoForm>;

    isCollapsed = true;

    descriptions: Observable<string[]>;

    loadingDesc = false;

    bsModalRef: BsModalRef;

    id: number;

    constructor(
        private service: ScontriniStoreService,
        private modalService: BsModalService,
        private retriever: ScontriniHttpService,
        @Inject(MESSAGE_PRODUCER) private producer: IMessageProducer<IMessages>,
        private route: ActivatedRoute,
        private router: Router)
    {

        this.facade = new FormGroupFacade();

        this.facade.buildFrom({
            importoDavide: { initialValue: 0 },
            importoMonia: { initialValue: 0 },
            data: { initialValue: new Date() },
            descrizione: { initialValue: '' },
            personale: { initialValue: false }
        }, { validator: () => this.validateGroup() });
    }

    private validateGroup(): ValidationErrors | null
    {
        const { importoDavide, importoMonia } = this.facade.getValues();
        if(!_.isNil(importoDavide) || !_.isNil(importoMonia))
            return null;

        return {
            compound: 'One must be filled'
        };
    }

    ngOnInit()
    {
        this.route.data.subscribe(data =>
        {
            const { scontrino } = data;

            this.producer.title.emit(scontrino && scontrino.id > 0 ? `Modifica scontrino #${scontrino.id}` : 'Creazione nuovo scontrino');

            this.id = scontrino?.id ?? 0;

            if(scontrino)
            {
                this.facade.patchValues({
                    data: scontrino.data?.toDate(),
                    descrizione: scontrino.descrizione,
                    importoDavide: scontrino.importoDavide,
                    importoMonia: scontrino.importoMonia,
                    personale: scontrino.personale
                });
            }
        });

        this.descriptions = new Observable<string>((s: Subscriber<string>) =>
        {
            s.next(this.facade.getValue('descrizione'));
        }).pipe(
            mergeMap((t: string) => this.retriever.getDescriptions(t))
        );
    }

    onSubmit()
    {
        const {
            importoDavide,
            importoMonia,
            personale,
            data,
            descrizione
        } = this.facade.getValues();

        const scontrino = new Scontrino();

        scontrino.importoDavide = importoDavide;
        scontrino.importoMonia = importoMonia;
        scontrino.personale = personale;
        scontrino.data = moment(data);
        scontrino.descrizione = descrizione;
        scontrino.id = this.id;

        this.retriever.save(scontrino).subscribe(() =>
        {
            this.router.navigateByUrl('/scontrini');
        });

        return false;
    }

    changeTypeaheadLoading(value: boolean)
    {
        this.loadingDesc = value;
    }

    openVideoCapture()
    {
        this.bsModalRef = this.modalService.show(VideoRecognizerComponent, { class: 'video-modal' });
        this.bsModalRef.content.closeBtnName = 'Close';
    }

    close()
    {
        if(this.bsModalRef)
            this.bsModalRef.hide();
    }
}
