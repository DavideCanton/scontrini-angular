/// <reference path="../../../node_modules/reflect-metadata/standalone.d.ts" />

const mappingMetadataKey = Symbol('mappingMetadataKey');

export type MappingFn<T, R> = (val: T) => R;

export interface Constructable<T> {
    new (...args: any[]): T;
}

export interface JsonSerializable {
    serialize(): string;
}

export function JsonClass<T extends Constructable<{}>>(constructor: T) {
    return class extends constructor implements JsonSerializable {
        serialize(): string {
            return JsonMapper.serialize(this);
        }
    };
}

export function JsonComplexProperty(constructor: Constructable<any>) {
    const opts: IMappingOptions<any, any> = { complexType: constructor };
    return Reflect.metadata(mappingMetadataKey, opts);
}

export function JsonProperty(params?: string | MappingFn<any, any> | IMappingOptions<any, any>) {
    if (!params)
        params = {};

    if (typeof params === 'string')
        params = { name: params };
    else if (typeof params === 'function')
        params = { mappingFn: params };

    return Reflect.metadata(mappingMetadataKey, params);
}

export class JsonMapper {

    static serialize(val: any): string {
        const obj = {};

        Object.keys(val).forEach(propName => {
            const opt: IMappingOptions<any, any> = Reflect.getMetadata(mappingMetadataKey, val, propName);

            if (opt === undefined)
                return;

            const name = opt.name || propName;

            let value;

            if (opt.complexType)
                value = JSON.parse(val[propName].serialize());
            else if (opt.serializeFn)
                value = opt.serializeFn(val[propName]);
            else
                value = val[propName];

            obj[name] = value;
        });

        return JSON.stringify(obj);
    }

    static deserialize<T>(ctor: Constructable<T>, jsonObj: any) {
        if (typeof jsonObj === 'string')
            jsonObj = JSON.parse(jsonObj);

        const obj = new ctor();

        Object.keys(obj).forEach(propName => {
            const opt: IMappingOptions<any, any> = Reflect.getMetadata(mappingMetadataKey, obj, propName);

            if (opt === undefined)
                return;

            const name = opt.name || propName;

            let value;

            if (opt.complexType)
                value = this.deserialize(opt.complexType, jsonObj[name]);
            else if (opt.mappingFn)
                value = opt.mappingFn(jsonObj[name]);
            else
                value = jsonObj[name];

            obj[propName] = value;
        });

        return obj;
    }
}


export interface IMappingOptions<T, R> {
    name?: string;
    mappingFn?: MappingFn<T, R>;
    serializeFn?: MappingFn<T, string>;
    complexType?: Constructable<R>;
}
