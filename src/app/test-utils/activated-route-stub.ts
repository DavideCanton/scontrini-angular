import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';

/**
 * An ActivateRoute test double with a `paramMap` observable.
 * Use the `setParamMap()` method to add the next `paramMap` value.
 */
export class ActivatedRouteStub
{
    // Use a ReplaySubject to share previous values with subscribers
    // and pump new values into the `paramMap` observable
    private subject: ReplaySubject<ParamMap>;
    private dataSubject: ReplaySubject<any>;

    constructor(initialParams?: Params)
    {
        this.reset(initialParams);
    }

    /** The mock paramMap observable */
    get paramMap(): Observable<ParamMap>
    {
        return this.subject.asObservable();
    }

    get data(): Observable<any>
    {
        return this.dataSubject.asObservable();
    }

    reset(initialParams?: Params)
    {
        if(this.subject)
            this.subject.complete();
        if(this.dataSubject)
            this.dataSubject.complete();
        this.subject = new ReplaySubject(1);
        this.dataSubject = new ReplaySubject(1);
        this.setParamMap(initialParams);
    }

    /** Set the paramMap observables's next value */
    setParamMap(params?: Params)
    {
        this.subject.next(convertToParamMap(params || {}));
    }

    setData(data: any)
    {
        this.dataSubject.next(data);
    }
}
