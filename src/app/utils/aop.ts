import { Metadata, afterMethod } from 'kaop-ts';

export const log = afterMethod(function (meta: Metadata<any>) {
    const class_ = meta.scope.constructor.name;
    const method = meta.key;

    console.log(`Called method ${class_}.${method}`);
    console.log(`Arguments:`);
    console.log(meta.args);
    console.log(`Result:`);
    console.log(meta.result);
});
