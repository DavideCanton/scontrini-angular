import { Pipe, PipeTransform } from '@angular/core';
import { isObject } from 'util';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {

  transform(value: any, args?: any): { key: string, value: any }[] {
    if (!value)
      value = {};

    return Object.keys(value).map(k => {
      return {
        key: k,
        value: value[k]
      };
    });
  }

}
