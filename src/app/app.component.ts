import { Component } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent
{
    constructor(localeService: BsLocaleService)
    {
        localeService.use('it');
    }
}
