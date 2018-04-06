import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { JsonMapper } from './json-mapper';

declare module "rxjs/Observable" {
    interface Observable<T> {
        mapModel: <U> (ctor: { new(): U }) => Observable<U>;
    }
}

function mapModel<T, U>(this: Observable<T>, ctor: { new(): U }): Observable<U> {
    return this.map(v => JsonMapper.deserialize(ctor, v));
}

Observable.prototype.mapModel = mapModel;