import { Routes } from '@angular/router';
import { ScontriniListComponent } from './scontrini-list/scontrini-list.component';

export const AppRoutes: Routes = [
    { path: 'list', component: ScontriniListComponent },
    { path: '', redirectTo: '/list', pathMatch: 'full' },
    // { path: '**', component: PageNotFoundComponent }
];
