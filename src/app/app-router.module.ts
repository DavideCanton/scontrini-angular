import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScontriniListComponent } from 'app/components/scontrini-list/scontrini-list.component';
import { ScontrinoComponent } from 'app/components/scontrino/scontrino.component';
import { ScontriniResolver } from 'app/services/scontrini.resolver';


const appRoutes: Routes = [
    {
        path: 'scontrini',
        resolve: {
            scontrini: ScontriniResolver
        },
        runGuardsAndResolvers: 'always',
        children: [
            {
                path: ':id',
                component: ScontrinoComponent,
            },
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
                onSameUrlNavigation: 'reload'
                // enableTracing: true
            })
    ],
    exports: [RouterModule]
})
export class AppRouterModule { }
