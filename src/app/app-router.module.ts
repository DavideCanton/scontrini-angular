import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScontriniListComponent } from './scontrini-list/scontrini-list.component';
import { ScontrinoComponent } from './scontrino/scontrino.component';

const appRoutes: Routes = [
    {
        path: 'scontrini', children: [
            { path: ':id', component: ScontrinoComponent },
            { path: '', component: ScontriniListComponent },
        ]
    },
    { path: '', redirectTo: '/scontrini', pathMatch: 'full' },
    // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes,
        {
            // enableTracing: true
        })
    ],
    exports: [RouterModule]
})
export class AppRouterModule { }
