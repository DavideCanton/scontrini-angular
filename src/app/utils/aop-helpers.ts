import { afterMethod } from 'kaop-ts';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export function logError(capture: boolean = false) {
    return afterMethod(function (meta: any) {
        if (!meta.exception) {
            const obs$ = meta.result as Observable<any>;

            meta.result = obs$.pipe(
                tap(undefined, e => console.error(e))
            );

            if (capture) {
                meta.result = meta.result.pipe(
                    catchError(e => of(e))
                );
            }
        }
    });
}


export function alertError() {
    return afterMethod(function (meta: any) {
        if (!meta.exception) {
            const obs$ = meta.result as Observable<any>;

            meta.result = obs$.pipe(
                tap(undefined, e => alert(e))
            );
        }
    });
}


export function wrapExceptionInObservable() {
    return afterMethod<any, any>(function (meta: any) {
        if (meta.exception) {
            const ex: Error = meta.handle();
            meta.result = throwError(ex);
        }
    });
}
