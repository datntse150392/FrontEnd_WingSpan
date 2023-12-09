import { Injectable } from '@angular/core';
import { BehaviorSubject, OperatorFunction, Subject, takeUntil } from 'rxjs';
import { OperationType, UpdateEventCart } from '../models';

@Injectable({ providedIn: 'root' })
export class ShareService {
  private isUpdateConfigLocal = new BehaviorSubject<UpdateEventCart>({
    isUpdateConfigLocal: true,
    operationType: OperationType.Add, //Default OperationType is add
  });

  // Observable stream that components can subscribe to
  updateConfigLocal$ = this.isUpdateConfigLocal.asObservable();

  constructor() {}

  setIsUpdateConfigLocal(updateEventCart: UpdateEventCart) {
    this.isUpdateConfigLocal.next(updateEventCart);
  }
}
