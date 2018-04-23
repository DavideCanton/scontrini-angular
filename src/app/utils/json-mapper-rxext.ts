import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Constructable, JsonMapper } from 'at-json';

declare module 'rxjs/Observable' {
    interface Observable<T> {
        mapModel: <U> (ctor: Constructable<U>) => Observable<U>;
    }
}

function mapModel<T, U>(this: Observable<T>, ctor: Constructable<U>): Observable<U> {
    return this.map(v => JsonMapper.deserialize(ctor, v));
}

Observable.prototype.mapModel = mapModel;
