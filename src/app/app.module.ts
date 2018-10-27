import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppRouterModule } from 'app/app-router.module';
import { AppComponent } from 'app/app.component';
import { BadgeComponent } from 'app/components/badge/badge.component';
import { ScontriniListComponent } from 'app/components/scontrini-list/scontrini-list.component';
import { ScontrinoComponent } from 'app/components/scontrino/scontrino.component';
import { TopbarComponent } from 'app/components/topbar/topbar.component';
import { VideoRecognizerComponent } from 'app/components/video-recognizer/video-recognizer.component';
import { KeysPipe } from 'app/pipes/keys.pipe';
import { UnsafeHtmlPipe } from 'app/pipes/unsafe-html.pipe';
import { SCONTRINI_SERVICE_TOKEN } from 'app/services/interfaces/scontrini-retriever';
import { ScontriniHttpService } from 'app/services/scontrini-http/scontrini-http.service';
import { ScontriniResolver } from 'app/services/scontrini.resolver';
import { TesseractProviderService } from 'app/services/tesseract-provider/tesseract-provider.service';
import {
  BsDatepickerConfig,
  BsDatepickerModule,
  CollapseModule,
  ProgressbarModule,
  TooltipModule,
  TypeaheadModule,
} from 'ngx-bootstrap';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { itLocale } from 'ngx-bootstrap/locale';


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
    TypeaheadModule.forRoot(),
    AngularFontAwesomeModule
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
