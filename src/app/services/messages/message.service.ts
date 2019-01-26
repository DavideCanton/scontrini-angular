import { EventEmitter, Injectable } from '@angular/core';

import { IMessageProducer, IMessages, IMessageConsumer } from './messages-types';

@Injectable()
export class MessageService implements IMessageProducer<IMessages>, IMessageConsumer<IMessages> {
    title = new EventEmitter<string>(true);
}
