import { Observable, OperatorFunction } from 'rxjs';

import { Constructable, JsonMapper } from 'at-json';
import { map } from 'rxjs/operators';

export function mapModel<T, U>(ctor: Constructable<U>): OperatorFunction<T, U> {
    return (source: Observable<T>) => {
        return source.pipe(
            map(v => JsonMapper.deserialize(ctor, v))
        );
    };
}

export function mapModelArray<T, U>(ctor: Constructable<U>): OperatorFunction<T[], U[]> {
    return (source: Observable<T[]>) => {
        return source.pipe(
            map(v => JsonMapper.deserializeArray(ctor, v))
        );
    };
}

