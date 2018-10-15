import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import * as _ from 'lodash';

function getSafeParentControlValue<T>(propName: string, ctrl: AbstractControl): T | null {
  if (!ctrl) return null;
  if (!ctrl.parent) return null;

  const { parent } = ctrl;
  const otherCtrl = parent.get(propName);

  return otherCtrl ? otherCtrl.value : null;
}

function getSafeControlValue<T>(propName: string, ctrl: AbstractControl): T | null {
  if (!ctrl) return null;

  const otherCtrl = ctrl.get(propName);

  return otherCtrl ? otherCtrl.value : null;
}

export class CustomValidators {
  static composeValidators(validators: ValidatorFn[]): ValidatorFn {
    const dependents = _.uniq(_.compact(_.map(validators, f => f[CUSTOM_VALIDATOR_SYMBOL])));
    const fn = Validators.compose(validators)!;
    fn[CUSTOM_VALIDATOR_SYMBOL] = dependents;
    return fn;
  }

  private static wrapper(prop: string, fn: ValidatorFn): ValidatorFn {
    fn[CUSTOM_VALIDATOR_SYMBOL] = prop;
    return fn;
  }

}

// WARNING: auto mark as dependent not working for group validators
export const CUSTOM_VALIDATOR_SYMBOL = Symbol('custom_validator');
