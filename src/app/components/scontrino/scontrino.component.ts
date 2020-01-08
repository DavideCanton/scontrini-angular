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
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

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

    id$ = new BehaviorSubject<number>(0);

    isCollapsed = true;

    descriptions: Observable<string[]>;

    loadingDesc = false;

    bsModalRef: BsModalRef;

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

    private validateGroup(): ValidationErrors
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
        this.route.paramMap.pipe(
            map(params => +params.get('v') || 0),
            map(param => !!param)
        ).subscribe(value =>
        {
            if(value)
                this.openVideoCapture();
            else
                this.close();
        });

        this.route.paramMap.pipe(
            map(params => +params.get('id') || 0),
            map(id =>
            {
                if(id)
                    return this.service.getScontrino(id);
                else
                    return null;
            }))
            .subscribe(s =>
            {
                this.id$.next(s ? s.id : 0);

                this.producer.title.emit(s && s.id > 0 ? `Modifica scontrino #${s.id}` : 'Creazione nuovo scontrino');

                if(s)
                {
                    this.facade.patchValues({
                        data: s.data.toDate(),
                        descrizione: s.descrizione,
                        importoDavide: s.importoDavide,
                        importoMonia: s.importoMonia,
                        personale: s.personale
                    });
                }
            });

        this.descriptions = Observable.create((observer: Observer<string>) =>
        {
            observer.next(this.facade.getValue('descrizione'));
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
        scontrino.id = this.id$.getValue();

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
