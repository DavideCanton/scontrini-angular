import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {

  transform(value: { [index: string]: any } | null): { key: string, value: any }[] {
    if (!value)
      value = {};

    return Object.keys(value).map(k => ({ key: k, value: value![k] }));
  }
}
