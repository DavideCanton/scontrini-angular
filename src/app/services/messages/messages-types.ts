import { EventEmitter, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface IMessages {
    title: string;
}

export const MESSAGE_PRODUCER = new InjectionToken<IMessageProducer<IMessages>>('producer');
export const MESSAGE_CONSUMER = new InjectionToken<IMessageConsumer<IMessages>>('consumer');

export type IMessageProducer<M> = {
    [K in keyof M]: EventEmitter<M[K]>;
};

export type IMessageConsumer<M> = {
    [K in keyof M]: Observable<M[K]>;
};


