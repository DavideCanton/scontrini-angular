import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {
  @Input()
  value: string;

  _type = 'info';

  @Input()
  get type(): string {
    return this._type;
  }

  set type(value: string | null) {
    if (!value) {
      this._type = 'info';
    } else {
      this._type = value;
    }
  }

  get enumType(): BadgeType {
    switch (this.type) {
      case 'error':
        return BadgeType.Error;
      case 'info':
        return BadgeType.Info;
      case 'warning':
        return BadgeType.Warning;
      default:
        throw new Error(`Invalid value ${this.type}`);
    }
  }

  get cssClass(): string {
    const classes = ['badge'];

    switch (this.enumType) {
      case BadgeType.Error:
        classes.push('error');
        break;
      case BadgeType.Info:
        classes.push('info');
        break;
      case BadgeType.Warning:
        classes.push('warning');
        break;
    }

    return classes.join(' ');
  }
}


export enum BadgeType {
  Info,
  Warning,
  Error
}
