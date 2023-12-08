import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ShareService {
  private isUpdateConfigLocal = new BehaviorSubject<boolean>(true);

  // Observable stream that components can subscribe to
  updateConfigLocal$ = this.isUpdateConfigLocal.asObservable();

  constructor() {}

  setIsUpdateConfigLocal(isUpdateConfigLocal: boolean) {
    this.isUpdateConfigLocal.next(isUpdateConfigLocal);
  }
}
