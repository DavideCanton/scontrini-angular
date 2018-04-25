import { Routes, RouterModule, Router } from '@angular/router';
import { ScontriniListComponent } from './scontrini-list/scontrini-list.component';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
    { path: 'list', component: ScontriniListComponent },
    { path: '', redirectTo: '/list', pathMatch: 'full' },
    // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRouterModule { }
