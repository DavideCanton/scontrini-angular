import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
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
  asyncValidator?: AsyncValidatorFn;
  select?: ISelectModel[];
}

export class FormGroupFacade<T> {
  private formDefinition: IFormGroupDefinition<T>;
  private innerGroup: FormGroup;
  private selectModels: Partial<Record<keyof T, SelectModelManager>>;

  buildFrom(def: IFormGroupDefinition<T>, extra?: { [key: string]: any; } | null) {
    this.formDefinition = def;

    if (extra && extra.validator)
      extra.validator = this.ensureGroupIsCreated(extra.validator);

    if (extra && extra.asyncValidator)
      extra.asyncValidator = this.ensureGroupIsCreated(extra.asyncValidator);

    const values = _.mapValues(def, (v: IFormDefinition<any>) => {
      return new FormControl(v.initialValue, v.validator, v.asyncValidator);
    });

    this.innerGroup = new FormGroup(values, extra?.validator, extra?.asyncValidator);

    this.selectModels = {};
    const selectModelKeys = this.computeSelectModels();

    selectModelKeys.forEach(k => {
      const modelManager = this.selectModels[k] = new SelectModelManager();
      modelManager.setValues(this.formDefinition[k].select);
      this.group.get(k)!.valueChanges.subscribe(v => modelManager.setSelectedId(v));
      if (!_.isNil(this.formDefinition[<keyof T>k].initialValue))
        modelManager.setSelectedId(<any>this.formDefinition[k].initialValue);
    });

    this.markDependents();
  }

  getValues(): T {
    return this.group.value;
  }

  get group(): FormGroup {
    return this.innerGroup;
  }

  get dirty(): boolean {
    return this.group.dirty;
  }

  get valid(): boolean {
    return this.group.valid;
  }

  get keys(): (keyof T)[] {
    return <(keyof T)[]>_.keys(this.formDefinition);
  }

  getControl<K extends keyof T>(key: K): AbstractControl {
    return this.group.get(<string>key)!;
  }

  getValue<K extends keyof T>(key: K): T[K] {
    return this.getControl(key).value;
  }

  patchValues(values: Partial<T>, options?: { onlySelf?: boolean; emitEvent?: boolean; }) {
    this.group.patchValue(values, options);
    if (options && !options.emitEvent) {
      _.forEach(values, (v, k) => {
        const manager = this.getSelectModel(<keyof T>k);
        if (manager)
          manager.setSelectedId(<any>v);
      });
    }
  }

  setValues(values: T) {
    this.group.setValue(values);
  }

  reset(values?: Partial<T>) {
    this.group.reset(values);
  }

  getSelectModel(key: keyof T): SelectModelManager | null {
    const m = <SelectModelManager | undefined>this.selectModels[key];
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
    this.getControl(key1).valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(0)
    ).subscribe(() => {
      const ctrl = this.getControl(key2);
      ctrl.updateValueAndValidity();
      ctrl.markAsDirty();
    });
  }

  restorePristineState() {
    this.group.markAsUntouched();
    this.group.markAsPristine();
  }

  get errors(): ValidationErrors | null {
    let errors = { ...this.group.errors };

    _.forEach(_.keys(this.formDefinition), k => {
      const ctrl = this.getControl(<keyof T>k);

      if (ctrl)
        errors = {
          ...errors,
          ...ctrl.errors
        };
    });

    return _.keys(errors).length > 0 ? errors : null;
  }

  private ensureGroupIsCreated(func: Function): Function {
    return _.wrap(func, oldFn => {
      return this.group ? oldFn(this.group) : null;
    });
  }

  private buildArray(v: IFormDefinition<any>): any[] {
    return [v.initialValue, ..._.compact([v.validator, v.asyncValidator])];
  }

  private markDependents() {
    _.forEach(this.formDefinition, (definition: IFormDefinition<any>, key) => {
      if (definition.validator) {
        let props = definition.validator[CUSTOM_VALIDATOR_SYMBOL];

        if (!props)
          props = [];
        if (!_.isArray(props))
          props = [props];

        _.forEach(props, p => {
          this.markAsDependent(p, <keyof T>key);
        });
      }
    });
  }

  private computeSelectModels(): string[] {
    const keys = _.keys(this.formDefinition);

    return _.filter(keys, k => {
      const def = this.formDefinition[k];
      return !!def.select;
    });
  }
}
