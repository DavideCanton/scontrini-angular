import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Scontrino } from 'app/models/scontrino';
import { JsonMapper } from 'at-json';
import { Observable } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';

const PORT = '5000';
const URL_SCONTRINI = `/scontrini`;
const URL_DESC = `/descriptions`;

@Injectable()
export class ScontriniHttpService
{

    constructor(private http: HttpClient)
    {
    }

    retrieveScontrini(): Observable<Scontrino[]>
    {
        return this.http.get<{ results: any[] }>(`${this.getOrigin()}${URL_SCONTRINI}`).pipe(
            map(r => JsonMapper.deserializeArray(Scontrino, r.results)),
        );
    }

    save(s: Scontrino): Observable<boolean>
    {
        const headers = {
            'Content-Type': 'application/json'
        };
        const url = `${this.getOrigin()}${URL_SCONTRINI}`;

        if(s.id === 0)
            return this.http.post(url, s.serialize(), { headers }).pipe(mapTo(true));
        else
            return this.http.put(url, s.serialize(), { headers }).pipe(mapTo(true));
    }

    getDescriptions(text: string): Observable<string[]>
    {
        const url = `${this.getOrigin()}${URL_DESC}/${text}`;
        return this.http.get<string[]>(url);
    }

    private getOrigin(): string
    {
        const hostName = window.location.hostname;
        return `http://${hostName}:${PORT}`;
    }
}
