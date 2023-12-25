import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { ConfigLocal, OperationType, UpdateEventCart } from '../models';
import { UserAPIService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: 'root' })
export class ShareService implements OnDestroy {
  configLocal: ConfigLocal;

  constructor(
    private userAPIService: UserAPIService,
    private httpClient: HttpClient
  ) {
    this.configLocal = this.parseData();
  }

  private isUpdateConfigLocal = new BehaviorSubject<UpdateEventCart>({
    isUpdateConfigLocal: true,
    operationType: OperationType.Add, //Default OperationType is add
  });
  // Loading subject
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  // Unsubscribe
  private destroy$ = new Subject<void>();

  public isLoading$ = this.isLoadingSubject.asObservable();
  // Observable stream that components can subscribe to
  updateConfigLocal$ = this.isUpdateConfigLocal.asObservable();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  showLoading() {
    this.isLoadingSubject.next(true);
  }

  hideLoading() {
    this.isLoadingSubject.next(false);
  }

  setIsUpdateConfigLocal(updateEventCart: UpdateEventCart) {
    this.isUpdateConfigLocal.next(updateEventCart);
  }

  UpdateConfigLocal() {
    this.userAPIService
      .getUserByUserId(this.configLocal.userInfo._id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.configLocal.userInfo = res.data.user;
          localStorage.setItem('configLocal', JSON.stringify(this.configLocal));
        },
        error: (err: Error) => {
          console.log('err', err.message);
        },
        complete: () => {},
      });
  }

  parseData() {
    const configLocalString = localStorage.getItem('configLocal');
    if (configLocalString) {
      const configLocal = JSON.parse(configLocalString);
      return configLocal;
    }
    return null;
  }

  /**
   * Handle Logic Call API: Get New Feeds
   */
  getNewFeeds(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}newFeed/getNewFeeds`);
  }
}
