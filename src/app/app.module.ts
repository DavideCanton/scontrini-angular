import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppRouterModule } from './app-router.module';
import { AppComponent } from './app.component';
import { BadgeComponent } from './badge/badge.component';
import { ScontriniListComponent } from './scontrini-list/scontrini-list.component';
import { ScontrinoComponent } from './scontrino/scontrino.component';
import { ScontriniRetriever } from './services/interfaces/scontrini-retriever';
import { ScontriniMockService } from './services/scontrini-mock/scontrini-mock.service';
import { TopbarComponent } from './topbar/topbar.component';



@NgModule({
  declarations: [
    AppComponent,
    BadgeComponent,
    ScontriniListComponent,
    ScontrinoComponent,
    TopbarComponent
  ],
  imports: [
    NgxDatatableModule,
    BrowserModule,
    FormsModule,
    AppRouterModule
  ],
  providers: [{ provide: ScontriniRetriever, useClass: ScontriniMockService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
