/// <reference path="../../../node_modules/reflect-metadata/standalone.d.ts" />
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const mappingMetadataKey = Symbol("mappingMetadataKey");

export function JsonComplexProperty(constructor: Function) {
    return Reflect.metadata(mappingMetadataKey, { type: constructor });
}

export function JsonProperty(params?: string | ((val) => any) | IMapOptions) {
    if (!params)
        params = {};

    if (typeof params === 'string')
        params = { name: params };
    else if (typeof params === 'function')
        params = { mappingFn: params };

    return Reflect.metadata(mappingMetadataKey, params);
}

export class JsonMapper {
    static deserialize<T>(ctor: { new(): T }, jsonObj: any) {
        let obj = new ctor();

        Object.keys(obj).forEach(propName => {
            let opt = <IMapOptions>Reflect.getMetadata(mappingMetadataKey, obj, propName);

            if (opt === undefined)
                return;

            let name = opt.name || propName;

            let value;

            if (opt.type)
                value = this.deserialize(opt.type, jsonObj[name]);
            else if (opt.mappingFn)
                value = opt.mappingFn(jsonObj[name]);
            else
                value = jsonObj[name];

            obj[propName] = value;
        });

        return obj;
    }
}

export interface IMappingClassInfo {
    enabled: boolean
}

export interface IMapOptions {
    name?: string,
    mappingFn?: (val) => any,
    type?: { new(): any }
}


declare module "rxjs/Observable" {
    interface Observable<T> {
        mapModel: <U> (ctor: { new(): U }) => Observable<U>;
    }
}

function mapModel<T, U>(this: Observable<T>, ctor: { new(): U }): Observable<U> {
    return this.map(v => JsonMapper.deserialize(ctor, v));
}

Observable.prototype.mapModel = mapModel;