import { Injectable } from '@angular/core';
import { BehaviorSubject, OperatorFunction, Subject, takeUntil } from 'rxjs';
import { OperationType, UpdateEventCart } from '../models';

@Injectable({ providedIn: 'root' })
export class ShareService {
  private isUpdateConfigLocal = new BehaviorSubject<UpdateEventCart>({
    isUpdateConfigLocal: true,
    operationType: OperationType.Add, //Default OperationType is add
  });

  // Loading subject
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoadingSubject.asObservable();

  // Observable stream that components can subscribe to
  updateConfigLocal$ = this.isUpdateConfigLocal.asObservable();

  constructor() {}

  showLoading() {
    this.isLoadingSubject.next(true);
  }

  hideLoading() {
    this.isLoadingSubject.next(false);
  }

  setIsUpdateConfigLocal(updateEventCart: UpdateEventCart) {
    this.isUpdateConfigLocal.next(updateEventCart);
  }
}
