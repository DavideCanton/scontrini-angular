import { Component, Input, Inject, OnDestroy, OnInit } from '@angular/core';
import { MESSAGE_CONSUMER, IMessageConsumer, IMessages } from 'app/services/messages/messages-types';
import { Subscription } from 'rxjs';


@Component({
  selector: 'topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit, OnDestroy {
  @Input()
  content: string;

  sub: Subscription[] = [];

  constructor(
    @Inject(MESSAGE_CONSUMER) private messageConsumer: IMessageConsumer<IMessages>
  ) { }

  ngOnInit() {
    this.sub.push(this.messageConsumer.title.subscribe(t => this.onTitleChanged(t)));
  }

  ngOnDestroy() {
    this.sub.forEach(s => s.unsubscribe());
  }

  onTitleChanged(title: string): void {
    this.content = title;
  }
}
