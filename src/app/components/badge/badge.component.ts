import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {
  @Input()
  value: string;

  @Input()
  type = BadgeType.Info;

  get cssClass(): string {
    const classes = ['badge'];

    switch (this.type) {
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
  Info = 'info',
  Warning = 'warning',
  Error = 'error'
}
