/// <reference path="../../../node_modules/reflect-metadata/standalone.d.ts" />

const mappingMetadataKey = Symbol("mappingMetadataKey");

type MappingFn<T, R> = (val: T) => R;
type Constructable<T> = { new(): T };

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
    static deserialize<T>(ctor: Constructable<T>, jsonObj: any) {
        let obj = new ctor();

        Object.keys(obj).forEach(propName => {
            let opt: IMappingOptions<any, any> = Reflect.getMetadata(mappingMetadataKey, obj, propName);

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
    name?: string,
    mappingFn?: MappingFn<T, R>,
    complexType?: Constructable<R>
}
