import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as _ from 'lodash';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ISelectModel, SelectModelManager } from './select-model';
import { CUSTOM_VALIDATOR_SYMBOL } from './validators';

export enum ValidationStatus {
  Valid = 'VALID',
  Invalid = 'INVALID',
  Pending = 'PENDING',
  Disabled = 'DISABLED'
}

export type IFormGroupDefinition<T> = {
  [K in keyof T]: IFormDefinition<T[K]>;
};

export interface IFormDefinition<T> {
  initialValue: T;
  validator?: ValidatorFn;
  select?: ISelectModel[];
}

export class FormGroupFacade<T> {
  _def: IFormGroupDefinition<T>;
  _group: FormGroup;

  _selectModels: Partial<Record<keyof T, SelectModelManager>>;

  constructor(private formBuilder: FormBuilder) { }

  buildFrom<K extends keyof T>(def: IFormGroupDefinition<T>, extra?: { [key: string]: any; } | null) {
    this._def = def;
    this._group = this.formBuilder.group(_.mapValues(def, (v: IFormDefinition<any>) => this.buildArray(v)), extra);
    this._selectModels = {};

    const selectModels = <string[]>[];

    _.each(def, (x: IFormDefinition<any>, k) => {
      if (x.validator) {
        let props = x.validator[CUSTOM_VALIDATOR_SYMBOL];

        if (!props)
          props = [];
        if (!_.isArray(props))
          props = [props];

        _.each(props, p => {
          this.markAsDependent(p, <keyof T>k);
        });
      }

      if (x.select)
        selectModels.push(k);
    });

    if (selectModels) {
      selectModels.forEach(k => {
        const modelManager = this._selectModels[k] = new SelectModelManager();
        modelManager.setValues(this._def[k].select);
        this._group.get(k)!.valueChanges.subscribe(v => modelManager.setSelectedId(v));
        if (!_.isNil(this._def[<keyof T>k].initialValue))
          modelManager.setSelectedId(<any>this._def[k].initialValue);
      });
    }
  }

  getValues(): T {
    return this.group.value;
  }

  get group(): FormGroup {
    return this._group;
  }

  get dirty(): boolean {
    return this._group.dirty;
  }

  get valid(): boolean {
    return this._group.valid;
  }

  get keys(): (keyof T)[] {
    return <(keyof T)[]>_.keys(this._def);
  }

  getControl<K extends keyof T>(key: K): AbstractControl {
    return this._group.get(<string>key)!;
  }

  getValue<K extends keyof T>(key: K): T[K] {
    return this.getControl(key).value;
  }

  patchValues(values: Partial<T>, options?: { onlySelf?: boolean; emitEvent?: boolean; }) {
    this._group.patchValue(values, options);
    if (options && !options.emitEvent) {
      _.forEach(values, (v, k) => {
        const manager = this.getSelectModel(<keyof T>k);
        if (manager)
          manager.setSelectedId(<any>v);
      });
    }
  }

  setValues(values: T) {
    this._group.setValue(values);
  }

  reset(values?: Partial<T>) {
    this._group.reset(values);
  }

  getSelectModel(key: keyof T): SelectModelManager | null {
    const m = <SelectModelManager | undefined>this._selectModels[key];
    return m || null;
  }

  getSelectValues(key: keyof T): ISelectModel[] | null {
    const model = this.getSelectModel(key);
    return model ? model.getValues() : null;
  }

  getSelectValue(key: keyof T): ISelectModel | null {
    const model = this.getSelectModel(key);

    return model ? model.selectedValue : null;
  }

  markAsDependent(key1: keyof T, key2: keyof T) {
    this.getControl(key1).valueChanges.pipe(distinctUntilChanged(), debounceTime(0)).subscribe(r => {
      const ctrl = this.getControl(key2);

      ctrl.updateValueAndValidity();
      ctrl.markAsDirty();
      ctrl.markAsTouched();
    });
  }

  restorePristineState() {
    this._group.markAsUntouched();
    this._group.markAsPristine();
  }

  get errors(): ValidationErrors | null {
    let errors = { ...this._group.errors };

    _.forEach(_.keys(this._def), k => {
      const ctrl = this.getControl(<keyof T>k);
      if (ctrl)
        errors = { ...errors, ...ctrl.errors };
    });

    return _.keys(errors).length > 0 ? errors : null;
  }

  private buildArray(v: IFormDefinition<any>): any[] {
    return [v.initialValue, ..._.compact([v.validator])];
  }
}
