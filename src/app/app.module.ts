import { AppRouterModule } from './app-router.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppComponent } from './app.component';
import { ScontriniMockService } from './services/scontrini-mock/scontrini-mock.service';
import { IScontriniRetrieverConfigToken } from './services/interfaces/scontrini-retriever';
import { BadgeComponent } from './badge/badge.component';
import { ScontriniListComponent } from './scontrini-list/scontrini-list.component';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from './topbar/topbar.component';


@NgModule({
  declarations: [
    AppComponent,
    BadgeComponent,
    ScontriniListComponent,
    TopbarComponent
  ],
  imports: [
    NgxDatatableModule,
    BrowserModule,
    AppRouterModule
  ],
  providers: [{ provide: IScontriniRetrieverConfigToken, useClass: ScontriniMockService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
