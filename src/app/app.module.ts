import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BsDatepickerConfig, BsDatepickerModule, CollapseModule, ProgressbarModule, TooltipModule } from 'ngx-bootstrap';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { itLocale } from 'ngx-bootstrap/locale';

import { AppRouterModule } from './app-router.module';
import { AppComponent } from './app.component';
import { BadgeComponent } from './badge/badge.component';
import { KeysPipe } from './pipes/keys.pipe';
import { UnsafeHtmlPipe } from './pipes/unsafe-html.pipe';
import { ScontriniListComponent } from './scontrini-list/scontrini-list.component';
import { ScontrinoComponent } from './scontrino/scontrino.component';
import { SCONTRINI_SERVICE_TOKEN } from './services/interfaces/scontrini-retriever';
import { ScontriniHttpService } from './services/scontrini-http/scontrini-http.service';
import { ScontriniResolver } from './services/scontrini.resolver';
import { TesseractProviderService } from './services/tesseract-provider/tesseract-provider.service';
import { TopbarComponent } from './topbar/topbar.component';
import { VideoRecognizerComponent } from './video-recognizer/video-recognizer.component';

defineLocale('it', itLocale);

@NgModule({
  declarations: [
    AppComponent,
    BadgeComponent,
    ScontriniListComponent,
    ScontrinoComponent,
    TopbarComponent,
    VideoRecognizerComponent,
    KeysPipe,
    UnsafeHtmlPipe
  ],
  imports: [
    FormsModule,
    NgxDatatableModule,
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    AppRouterModule,
    CollapseModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ],
  providers: [
    {
      provide: SCONTRINI_SERVICE_TOKEN,
      useClass: ScontriniHttpService
    },
    {
      provide: BsDatepickerConfig,
      useValue: <BsDatepickerConfig>{
        dateInputFormat: 'DD/MM/YYYY',
        showWeekNumbers: false,
        containerClass: 'theme-green'
      }
    },
    TesseractProviderService,
    ScontriniResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
